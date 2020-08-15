<template>
    <div id="app" class="d-flex fill-height flex-column">
        <div class="container">
            <div class="d-flex justify-center">
                <v-card class="mt-5 pa-3 pb-5" max-width="1000" min-width="800">
                    <div class="d-flex mr-5">
                        <v-card-title class="grey--text text--darken-2">Read/Show ({{users.length}})</v-card-title>
                        <v-spacer/>
                        <v-btn small @click="actionDialog = true; isUpdating = false; intitializeCurrentUser()"
                               class="mt-4 mr-5" color="amber accent-2">
                            Add a user
                            <v-icon small class="ml-1">
                                add
                            </v-icon>
                        </v-btn>
                        <v-text-field style="max-width: 200px"
                                      prefix="Search"
                                      solo
                                      background-color="grey lighten-3"
                                      dense
                                      v-model="search"
                                      rounded
                                      class="mt-3"
                                      append-icon="search" flat/>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-5">
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <th class="tableHeader grey--text text--darken-2 subtitle-1">Name</th>
                                    <th class="tableHeader grey--text text--darken-2 subtitle-1">Family</th>
                                    <th class="tableHeader grey--text text--darken-2 subtitle-1">Birthday</th>
                                    <th class="tableHeader grey--text text--darken-2 subtitle-1">Actions</th>
                                </tr>
                                <tr v-for="(user) in filteredUsers" :key="user.id">
                                    <td class="grey--text text--darken-2 subtitle-1">{{user.name}}</td>
                                    <td class="grey--text text--darken-2 subtitle-1">{{user.family}}</td>
                                    <td class="grey--text text--darken-2 subtitle-1">{{user.birthday}}</td>
                                    <td>
                                        <v-btn small @click="removeUser(user)" value="Delete" class="ml-5" fab text
                                               color="amber accent-2">
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                        <v-btn small @click="actionDialog = true; setEditUser(user.id)" value="Edit"
                                               class="ml-1" color="amber accent-2" fab text>
                                            <v-icon>edit</v-icon>
                                        </v-btn>

                                    </td>
                                </tr>
                                </tbody>
                            </template>
                            <div class="d-flex justify-center">
                                <span v-if="filteredUsers.length === 0">No User</span>
                            </div>
                        </v-simple-table>
                    </div>
                </v-card>
            </div>
            <v-dialog v-model="actionDialog" max-width="600">
                <v-card class="pa-4">
                    <v-card-title class="grey--text text--darken-2">
                        <span>Add/Edit</span>
                        <v-spacer/>
                        <v-btn small @click="this.intitializeCurrentUser" text outlined color="amber accent-2">
                            clear
                            <v-icon small class="ml-1">delete</v-icon>
                        </v-btn>
                        <v-btn small depressed color="amber accent-2" dark class="ml-2" @click="actionDialog = false">
                            <v-icon small>
                                close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                    <div class="d-flex flex-column justify-center">
                        <div class="d-flex justify-center">
                            <v-text-field validate-on-blur label="Name" v-model="currentUser.name"
                                          style="max-width: 300px"
                                          :rules="[rules.required, rules.counter]" prepend-icon="perm_identity"/>
                        </div>
                        <div class="d-flex justify-center">
                            <v-text-field label="Family" v-model="currentUser.family" style="max-width: 300px"
                                          prepend-icon="family_restroom"/>
                        </div>
                        <v-spacer/>
                        <div class="d-flex">
                            <v-spacer/>
                            <v-btn @click="cancelEditing()" color="blue darken-1" text>
                                Cancel
                            </v-btn>
                            <v-btn v-if="!isUpdating" @click="addUser()" depressed color="blue darken-1" dark
                                   class="mr-1" :disabled="!this.currentUser.name">
                                Add
                            </v-btn>
                            <v-btn v-if="isUpdating" @click="editUser()" depressed color="blue darken-1" dark
                                   :disabled="!this.currentUser.name">
                                Update
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
            <div class="d-flex justify-center">
                <v-card class="mt-5" style="padding: 20px" max-width="1000">
                    <v-card-title class="grey--text text--darken-2">
                        Requirements
                    </v-card-title>
                    <div class="d-flex flex-column justify-center">
                        <Requirements/>
                    </div>
                </v-card>
            </div>
        </div>
        <v-btn fab absolute bottom right class="ma-5 mb-10" @click="actionDialog = true" color="amber accent-2">
            <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="deleteUserConfirmation" width="400">
            <v-card min-width="400" height="175">
                <div class="d-flex flex-column fill-height">
                    <v-card-title>Delete User {{currentUser.name}} ?</v-card-title>
                    <v-spacer/>
                    <div class="d-flex pa-5">
                        <v-spacer/>
                        <v-btn @click="handleDeleteUserDecision(false)" color="blue darken-1" text>
                            Cancel
                        </v-btn>
                        <v-btn @click="handleDeleteUserDecision(true)" depressed color="blue darken-1" dark
                               class="mr-1">
                            Continue
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Requirements from "./Requirements";
    import {User} from "../User";
    import {cloneDeep} from 'lodash'

    const filterUsersBySearch = (users, search) => {
        return users.filter(user => user.name && user.name.toLowerCase().includes(search.toLowerCase()) ||
                                    user.family && user.family.toLowerCase().includes(search.toLowerCase()))
    };

    export default {
        name: "Main",
        components: {Requirements},
        computed: {
            filteredUsers() {
                return !this.search || this.search === '' ? this.users : filterUsersBySearch(this.users, this.search)
            }
        },
        data() {
            return {
                users: User.getTemplateUsers(),
                isUpdating: false,
                currentUser: {},
                actionDialog: false,
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => !!value && value.length <= 20 || 'Max 20 characters'
                },
                search: null,
                deleteUserConfirmation: false
            };
        },
        methods: {
            addUser() {
                this.users.push(new User(this.currentUser));
                this.closeDialog()
            },
            setEditUser(userId) {
                this.isUpdating = true;
                this.currentUser = cloneDeep(this.users.find(user => user.id === userId))
            },
            closeDialog() {
                this.intitializeCurrentUser();
                this.isUpdating = false;
                this.actionDialog = false
            },
            editUser() {
                this.users = this.users.map(user => user.id === this.currentUser.id ? {...user, ...this.currentUser} : user);
                this.closeDialog()
            },
            cancelEditing() {
                this.closeDialog()
            },
            handleDeleteUserDecision(decision) {
                if (decision) {
                    this.users = this.users.filter(user => user.id !== this.currentUser.id)
                }
                this.deleteUserConfirmation = false;
                this.intitializeCurrentUser()
            },
            removeUser(user) {
                this.currentUser = cloneDeep(user);
                this.deleteUserConfirmation = true

            },
            intitializeCurrentUser() {
                for (const key of Object.keys(this.currentUser)) {
                    if(key !== 'id'){
                        this.currentUser[key] = null
                    }
                }
            }
        }
    }
</script>

<style>
    .tableHeader {
        font-size: 15px !important;
    }
</style>

<template>
    <div id="app" class="d-flex fill-height flex-column">
        <div class="container">
            <v-card class="mt-5">
                <div class="d-flex mr-5">
                    <v-card-title class="grey--text text--darken-2">Read/Show ({{users.length}})</v-card-title>
                    <v-spacer/>
                    <v-btn small text @click="actionDialog = true; isUpdating = false; intitializeCurrentUser"
                           class="mt-5 mr-5">
                        Add a user
                    </v-btn>
                    <v-text-field style="max-width: 200px" prefix="Search"/>
                </div>
                <div class="d-flex justify-center">
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Family</th>
                            <th>Birthday</th>
                            <th>Actions</th>
                        </tr>
                        <tr v-for="(user) in users" :key="user.id">
                            <td>{{user.name}}</td>
                            <td>{{user.family}}</td>
                            <td>{{user.birthday}}</td>
                            <td>
                                <v-btn small @click="remove(user.id)" value="Delete" class="ml-5">
                                    Delete
                                </v-btn>
                                <v-btn small @click="actionDialog = true; setEditUser(user.id)" value="Edit"
                                       class="ml-1">
                                    Edit
                                </v-btn>

                            </td>
                        </tr>
                        </tbody>
                        <div class="d-flex justify-center">
                            <span v-if="users.length === 0">The empty state</span>
                        </div>
                    </table>
                </div>
            </v-card>
            <v-dialog v-model="actionDialog" max-width="600">
                <v-card class="pa-5">
                    <v-card-title class="grey--text text--darken-2">
                        <span>Add/Edit</span>
                        <v-spacer/>
                        <v-btn small @click="this.intitializeCurrentUser">clear</v-btn>
                    </v-card-title>
                    <div class="d-flex flex-column justify-center">
                        <v-text-field prefix="Name" v-model="currentUser.name"
                                      :rules="[rules.required, rules.counter]"/>
                        <v-text-field prefix="Family" v-model="currentUser.family"/>
                        <v-btn v-if="!isUpdating" @click="add()" type="button" value="Add">
                            Add
                        </v-btn>
                        <v-btn v-if="isUpdating" @click="edit()" type="button" value="update">
                            Update
                        </v-btn>
                        <v-btn v-if="isUpdating" type="button" value="cancel" @click="cancelEditing()">
                            Cancel
                        </v-btn>
                    </div>
                </v-card>
            </v-dialog>
            <v-card class="mt-5" style="padding: 20px">
                <div class="d-flex flex-column justify-center">
                    Brand the form to Explorance
                    · Add a Birthday field
                    · Add #Items (integer) field
                    · Transform the Add/Edit section into a Pop-Over window
                    · Add a validation of the fields
                    · Add an empty state (no items at all)
                </div>
            </v-card>
        </div>
        <v-btn fab absolute bottom right class="ma-5 mb-10" @click="actionDialog = true">
            <v-icon>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "Main",
        data() {
            return {
                users: [
                    {id: 0, name: "Ali", family: "Delshad", birthday: new moment().format('YY-MM-DD')},
                    {id: 1, name: "Hamid", family: "Sadeghi", birthday: new moment().format('YY-MM-DD')},
                    {id: 2, name: "Amir", family: "Olfat", birthday: new moment().format('YY-MM-DD')},
                    {id: 3, name: "Keyvan", family: "Nasr", birthday: new moment().format('YY-MM-DD')}
                ],
                isUpdating: false,
                currentUser: {},
                actionDialog: false,
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 20 || 'Max 20 characters'
                }
            };
        },
        methods: {
            add() {
                this.users.push({
                    id: Math.random(), //Assuming determinism for the scope if this assignment
                    name: this.currentUser.name,
                    family: this.currentUser.family
                });
                this.intitializeCurrentUser()
                this.actionDialog = false
            },
            setEditUser(userId) {
                this.isUpdating = true
                this.currentUser = JSON.parse(JSON.stringify(this.users.find(user => user.id === userId)))
            },
            edit() {
                this.users = this.users.map(user => user.id === this.currentUser.id ?
                    {...user, ...this.currentUser} : user);
                this.isUpdating = false;
                this.intitializeCurrentUser();
                this.actionDialog = false
            },
            cancelEditing() {
                this.intitializeCurrentUser()
                this.isUpdating = false
            },
            remove(userId) {
                this.users = this.users.filter(user => user.id !== userId)
            },
            intitializeCurrentUser() {
                for (const key of Object.keys(this.currentUser)) {
                    this.currentUser[key] = null
                }
            }
        }
    }
</script>

<style>
</style>

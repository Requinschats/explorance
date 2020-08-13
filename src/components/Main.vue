<template>
    <div id="app">
        <div class="container">
            <v-card>
                <div class="d-flex mr-5">
                    <v-card-title class="grey--text text--darken-2">Read/Show</v-card-title>
                    <v-spacer/>
                    <v-text-field style="max-width: 200px" prefix="Search"/>
                </div>
                <div class="d-flex justify-center">
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Family</th>
                            <th>Actions</th>
                        </tr>
                        <tr v-for="(user, i) in users" :key="i">
                            <td>{{user.name}}</td>
                            <td>{{user.family}}</td>
                            <td>
                                <input type="button" @click="remove(i)" value="Delete">
                                <input type="button" @click="setEditUser(i)" value="Edit">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </v-card>
            <v-card>
                <v-card-title class="grey--text text--darken-2">
                    Add/Edit
                </v-card-title>
                <div class="d-flex justify-center">
                    <p>
                        Name :
                        <input type="text" v-model="currentUser.name">
                    </p>
                    <p>
                        Family :
                        <input type="text" v-model="currentUser.family">
                    </p>
                    <input v-if="editingIndex==undefined" @click="add()" type="button" value="Add">
                    <input v-if="editingIndex!==undefined" @click="edit()" type="button" value="update">
                    <input v-if="editingIndex!==undefined" type="button" value="cancel">
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                users: [
                    {name: "Ali", family: "Delshad"},
                    {name: "Hamid", family: "Sadeghi"},
                    {name: "Amir", family: "Olfat"},
                    {name: "Keyvan", family: "Nasr"}
                ],
                editingIndex: undefined,
                currentUser: {
                    name: "",
                    family: ""
                }
            };
        },
        methods: {
            add() {
                this.users.push({
                    name: this.currentUser.name,
                    family: this.currentUser.family
                });
                this.currentUser.name = "";
                this.currentUser.family = "";
            },
            setEditUser(index) {
                this.editingIndex = index;
                this.currentUser.name = this.users[index].name;
                this.currentUser.family = this.users[index].family;
            },
            edit() {
                this.users[this.editingIndex].name = this.currentUser.name;
                this.users[this.editingIndex].family = this.currentUser.family;
                this.editingIndex = undefined;
                this.currentUser.name = "";
                this.currentUser.family = "";
            },
            cancel() {
            },
            remove(index) {
                this.users.splice(index, 1);
            }
        }
    };
</script>

<style>
</style>

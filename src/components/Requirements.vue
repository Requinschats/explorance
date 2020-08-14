<template>
    <v-row justify="center">
        <v-tooltip v-for="(requirement, index) in REQUIREMENTS" :key="index" bottom>
            <template v-slot:activator="{on}">
                <v-chip outlined color="blue darken-1"
                        class="mr-3 mt-2" v-on="on">
                    {{requirement}}
                </v-chip>
            </template>
            <span>{{requirement}}</span>
        </v-tooltip>
    </v-row>
</template>

<script>
    const REQUIREMENTS = ['Brand the form to Explorance', 'Add a Birthday field', 'Add #Items (integer) field',
        'Transform the Add/Edit section into a Pop-Over window', 'Add a validation of the fields',
        'Add an empty state (no items at all)'];
    export default {
        name: "Requirements",
        data: () => {
            return {
                REQUIREMENTS: REQUIREMENTS
            }
        }
    }
</script>

<style scoped>

</style>

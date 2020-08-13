<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Explorance Logo"
          class="shrink mr-2"
          contain
          src="./assets/explorance.png"
          transition="scale-transition"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        href="https://explorance.com/fr/"
        target="_blank"
        text
      >
        <span class="mr-2">For more information</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app light>

    <!-- Nav Bar Here -->
    <NavBar />

    <!-- Drawer here -->
    <NavDrawer />

    <v-content>
      <!-- Alert banner here -->
      <Alerts />

      <!-- Page content -->
      <nuxt/>

      <!-- Floating add button -->
      <v-btn
        color="pink"
        dark
        large
        fixed
        bottom
        right
        fab
        @click="toggleModalOpen"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-content>

    <!-- AddModal component here -->
    <AddModal />

    <!-- Footer here -->

    <!-- Bottom Nav here -->
  </v-app>
</template>

<script>
import AddModal from '@/components/AddModal';
import Alerts from '@/components/Alerts';
import NavBar from '@/components/NavBar';
import NavDrawer from '@/components/NavDrawer';

export default {
  components: {
    AddModal,
    Alerts,
    NavBar,
    NavDrawer
  },
  methods: {
    toggleModalOpen () {
      this.addModalOpen = !this.addModalOpen;
    }
  },
  computed: {
    addModalOpen: {
        get () {
            return this.$store.state.addModalOpen;
        },
        set (bool) {
            this.$store.commit('set_addModalOpen', bool);
        }
    }
  }
}
</script>

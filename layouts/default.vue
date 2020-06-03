<template>
  <v-app light>

    <!-- Nav Bar Here -->
    <NavBar/>

    <!-- Drawer here -->
    <NavDrawer v-if="$vuetify.breakpoint.mdAndUp"/>

    <!-- Nav Overlay here -->
    <NavOverlay v-else/>

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
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <SpeedDial v-else />
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
import NavOverlay from '@/components/NavOverlay';
import SpeedDial from '@/components/SpeedDial';

export default {
  components: {
    AddModal,
    Alerts,
    NavBar,
    NavDrawer,
    NavOverlay,
    SpeedDial
  },
  methods: {
    toggleModalOpen () {
      this.modalEditMode = false;
      this.addModalOpen = !this.addModalOpen;
    }
  },
  computed: {
    addModalOpen: {
        get () {
            return this.$store.state.addModal.addModalOpen;
        },
        set (bool) {
            this.$store.commit('addModal/set_addModalOpen', bool);
        },
    },
    modalEditMode: {
        get () {
            return this.$store.state.addModal.modalEditMode;
        },
        set (bool) {
            this.$store.commit('addModal/set_modalEditMode', bool);
        }
    }
  }
}
</script>

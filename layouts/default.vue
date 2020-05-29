<template>
  <v-app>

    <!-- Nav Bar Here -->
    <NavBar />

    <!-- Drawer here -->
    <NavDrawer />

    <v-content>
      <!-- Page content -->
      <nuxt/>
    </v-content>

    <!-- Footer here -->

    <!-- Bottom Nav here -->
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';
import NavDrawer from '@/components/NavDrawer';

export default {
  components: {
    NavBar,
    NavDrawer
  }
}
</script>

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Departments',
          to: '/departaments'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Employees',
          to: '/employees'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Skills',
          to: '/skills'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Department',
          to: '/departament/create'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Employee',
          to: '/employee/create'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Create Skill',
          to: '/skill/create'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Employees'
    }
  }
}
</script>

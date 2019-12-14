<template>
  <!-- <v-app-bar
    v-scroll="onScroll"
    :color="!isScrolling ? 'transparent' : 'rgba(13, 3, 29, .95)'"
    :flat="!isScrolling"
    app
    dark
    hide-on-scroll
  >
    <v-img
      class="shrink"
      contain
      max-width="50%"
      src="/static/alpha-software-logo.png"
    /> -->
  <v-app-bar
    v-scroll="onScroll"
    :color="!isScrolling ? 'transparent' : undefined"
    :text="!isScrolling"
    app
    :dark="!isScrolling"
  >
    <v-img
      class="shrink"
      contain
      max-width="50%"
      :src="!isScrolling ? '/static/easyupp-logo-dark.png' : '/static/easyupp-logo-light.png'"
      @click="goHome"
    />
    <v-spacer />
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :active-class="'accent black--text'"
        :to="item.to"
        :exact="item.text === 'Easyupp'"
        text
      >
        <span v-text="item.text" />
      </v-btn>
    </v-toolbar-items>
    <v-btn
      v-else
      icon
      @click="toggleDrawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapMutations } from 'vuex'

  export default {
    data: () => ({
      isScrolling: false
    }),

    computed: {
      items () {
        return this.$t('View.items')
      }
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      goHome () {
        this.$router.push('/')
      },
      onScroll () {
        this.isScrolling = (window.pageYOffset ||
          document.documentElement.scrollTop || 0) > 100
      }
    }
  }
</script>

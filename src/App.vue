<template>
  <v-app>
    <core-app-bar />

    <core-drawer />

    <core-view />

    <core-footer
      :categories="categories"
      :company="$t('Footer.company')"
      facebook="https://facebook.com/MyEasyUpp/"
    >
      <span>
        &copy; 2019
        {{ $t('Footer.company') }}
        &mdash;
        {{ $t('Footer.rights') }}
      </span>
    </core-footer>

    <core-fab />
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreFab: () => import('@/components/core/Fab'),
      CoreView: () => import('@/components/core/View')
    },

    computed: {
      categories () {
        return this.$t('Footer.categories')
      }
    }
  }
</script>

<style lang="sass">
  .v-footer
    background: #303c42
    color: #fff
    display: block
    padding: 0 12px !important
    height: auto

    h5
      color: #fff

    .container
      padding: 0
      margin: 0

    ul
      list-style-type: none
      margin: 0
      padding: 0

      li
        margin-bottom: 10px

      a
        color: #fff
        text-decoration: none
        transition: .2s ease-in

        &:hover
          opacity: .5
  section
    padding: 64px 16px

    @media screen and (max-width: 640px)
      padding: 16px
</style>

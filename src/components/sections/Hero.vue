<template>
  <v-fade-transition mode="out-in">
    <v-img
      v-if="namespace"
      :key="$route.path"
      :height="isHome ? '50vh' : '30vh'"
      :src="`/static/${namespace.toLowerCase()}-jumbotron.jpg`"
      class="white--text"
      gradient="to top, rgba(13, 3, 29, .85), rgba(25, 25, 38, .85)"
    >
      <v-fade-transition mode="out-in">
        <v-container
          v-if="isBooted"
          :key="$route.path"
          fill-height
        >
          <v-layout align-center>
            <v-fade-transition mode="out-in">
              <v-flex
                :key="$route.path"
                :text-center="isHome"
              >
                <h1
                  class="display-5 mt-1"
                  v-html="title"
                />
                <div
                  v-if="subTitle"
                  class="subheading"
                  v-html="subTitle"
                />
                <v-form
                  action="/search"
                >
                  <v-text-field
                    v-if="isHome"
                    v-model="search"
                    name="search"
                    append-icon="mdi-magnify"
                    placeholder="Search by Year, Make, Model"
                    outlined
                    solo
                    hide-details
                    class="mt-12"
                  />
                </v-form>
                <!-- <v-btn
                  v-if="isHome"
                  color="primary px-4 mt-4"
                  dark
                  to="contact"
                >
                  {{ $t('Home.callToActionBtn') }}
                </v-btn> -->
              </v-flex>
            </v-fade-transition>
          </v-layout>
        </v-container>
      </v-fade-transition>
    </v-img>
  </v-fade-transition>
</template>

<script>
  export default {
    data: () => ({
      isBooted: false,
      search: ''
    }),

    computed: {
      isHome () {
        return this.$route.path === '/'
      },
      namespace () {
        return this.$route.name
      },
      title () {
        return this.$t(`${this.namespace}.jumbotronTitle`)
      },
      subTitle () {
        return this.$t(`${this.namespace}.jumbotronSubTitle`)
      }
    },

    mounted () {
      setTimeout(() => {
        this.isBooted = true
      }, 200)
    }
  }
</script>

<template>
  <v-footer>
    <v-container
      fluid
      class="alpha-footer"
    >
      <v-layout
        row
        wrap
        class="blue-grey darken-2 fill-height"
      >
        <v-flex
          xs12
          sm3
          class="pa-5 blue-grey darken-3"
        >
          <h5
            class="title pb-3"
            v-text="company"
          />
          <ul>
            <li
              v-for="(item, i) in computedSocial"
              :key="i"
            >
              <a
                :href="item.href"
                class="layout align-center"
              >
                <v-icon
                  dark
                  class="mr-3"
                  v-text="item.icon"
                />
                <span
                  class="subheading"
                  v-text="item.text"
                />
              </a>
            </li>
          </ul>
        </v-flex>
        <v-flex
          v-for="(item, i) in categories"
          :key="i"
          xs12
          sm3
          class="pa-5"
        >
          <h5
            class="title pb-3"
            v-text="item.text"
          />
          <ul>
            <li
              v-for="(n, j) in item.items"
              :key="j"
            >
              <a
                :href="n.href"
                v-text="n.text"
              />
            </li>
          </ul>
        </v-flex>
        <v-flex xs12>
          <v-card
            tile
            flat
            dark
            class="blue-grey darken-4 text-center"
          >
            <v-card-text>
              <slot />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    props: {
      categories: {
        type: Array,
        default: () => ([])
      },
      company: {
        type: String,
        default: ''
      },
      facebook: {
        type: String,
        default: ''
      },
      github: {
        type: String,
        default: ''
      },
      social: {
        type: Array,
        default: () => []
      },
      twitter: {
        type: String,
        default: ''
      }
    },
    computed: {
      computedSocial () {
        if (this.social.length) return this.social

        const social = []

        if (this.github) {
          social.push({
            text: this.$t('Footer.github'),
            icon: 'mdi-github-circle',
            href: this.github
          })
        }

        if (this.twitter) {
          social.push({
            text: this.$t('Footer.twitter'),
            icon: 'mdi-twitter-circle',
            href: this.twitter
          })
        }

        if (this.facebook) {
          social.push({
            text: this.$t('Footer.facebook'),
            icon: 'mdi-facebook-box',
            href: this.facebook
          })
        }

        return social
      }
    }
  }
</script>

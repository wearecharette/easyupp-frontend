<template>
  <section
    id="home"
    class="pa-0"
  >
    <hero />
    <v-container fill-height>
      <v-layout
        justify-center
        align-center
        wrap
      >
        <v-flex
          tag="h2"
          display-1
          class="text-center"
          xs12
          mb-3
        >
          EasyUpp by the numbers
        </v-flex>
        <v-flex
          xs12
          sm6
          md6
          pa-2
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div class="headline">
                1. Find the right vehicle.
              </div>
            </v-card-title>
            <v-card-text class="white--text">
              <p>Since we list all the inventory of our dealer partners here on EasyUpp.com, you only have to search one place for the right vehicle.  We have also made the inventory public so that you can send the link to your client to confirm their interest.</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm6
          md6
          pa-2
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div class="headline">
                2. Set an Appointment.
              </div>
            </v-card-title>
            <v-card-text class="white--text">
              <p>Now that you've found the right vehicle, confirm it's availability and set an appointment with the store that has it.  This will all be done through EasyUpp messaging in your account.</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm6
          md6
          pa-2
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div class="headline">
                3. Sell the car!
              </div>
            </v-card-title>
            <v-card-text class="white--text">
              <p>When you meet your client at the store of our EasyUpp dealer partner, you will show them the vehicle, confirm the numbers, and your clients will finish their paperwork. You already know how to do this!</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm6
          md6
          pa-2
        >
          <v-card color="accent">
            <v-card-title primary-title>
              <div class="headline">
                4. Get paid!
              </div>
            </v-card-title>
            <v-card-text class="black--text">
              <p>Shortly after the transaction is finalized, you'll see $350 appear in your EasyUpp account.  All for helping a customer buy a vehicle they love!  Don't forget to ask for referrals!</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          mb12
          text-right
        >
          <v-btn
            color="primary"
            dark
            to="contact"
          >
            Become a Salesman
          </v-btn>
          <div class="pa-2">
            <p><a href="/services">Become a Dealer</a>?</p>
          </div>
        </v-flex>
        <v-flex
          tag="h2"
          display-1
          text-center
          v-text="$t('Home.platformHeader')"
        />

        <v-flex
          class="subheading"
          tag="h3"
          text-center
          mb-5
          v-text="$t('Home.platformSubHeader')"
        />

        <v-flex
          xs12
          mb-5
        >
          <core-feature :features="cardFeatures" />
        </v-flex>
      </v-layout>
    </v-container>

    <v-img
      :height="$vuetify.breakpoint.mdAndUp ? 1000 : 'auto'"
      src="/static/autos.jpeg"
      gradient="to top, rgba(0, 0, 0, .75), rgba(0, 0, 0, .75)"
      class="py-5 white--text"
    >
      <v-container
        fill-height
        grid-list-xl
      >
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-flex
            v-for="(testimonial, i) in testimonials"
            :key="i"
            xs12
            sm5
          >
            <core-testimonial
              :author="testimonial.author"
              :title="testimonial.title"
              :quote="testimonial.quote"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </section>
</template>

<script>
  import axios from 'axios'
  import qs from 'querystring'
  import Vue2Filters from 'vue2-filters'

  export default {
    metaInfo () {
      return {
        title: this.$i18n.t('Home.jumbotronTitle')
      }
    },

    components: {
      Hero: () => import('@/components/sections/Hero'),
      CoreFeature: () => import('@/components/core/CardFeature'),
      CoreTestimonial: () => import('@/components/core/Testimonial')
    },

    mixins: [Vue2Filters.mixin],

    data: () => ({
      dialog: false,
      open: false,
      search: '',
      editedIndex: -1,
      errorDialog: false,
      error: {},
      cars: [],
      types: [],
      years: [],
      makes: [],
      models: [],
      colors: [],
      car: {},
      typ: '',
      strt: 1,
      clr: '',
      yr: '',
      mk: '',
      mdl: '',
      valid: false,
      totalCars: 0,
      loading: true,
      options: {}
    }),

    computed: {
      cardFeatures () {
        return this.$t('Home.cardFeatures')
      },
      testimonials () {
        return this.$t('Home.testimonials')
      }
    },

    methods: {
      submitSearch (k, v) {
        this.yr = ''
        this.typ = ''
        this.mk = ''
        this.mdl = ''
        if (!this._.isEmpty(this.search)) {
          console.log(this.search)
          for (const field of this.search.toString().toLowerCase().split(' ')) {
            if (this.yr === '') {
              this.yr = this.parseField(field.toString().toLowerCase(), this.years)
            }
            if (this.mk === '') {
              this.mk = this.parseField(field.toString().toLowerCase(), this.makes)
            }
            if (this.mdl === '') {
              this.mdl = this.parseField(field.toString().toLowerCase(), this.models)
            }
          }
          // this.ymm = y + '|' + m + '|' + mm
        }

        // set filter value
        if (k !== '' && v !== '') {
          this[k] = v
        }
        this.strt = 1
        this.searchInventory()
      },
      searchInventory () {
        this.getDataFromApi()
          .then(data => {
            this.cars = data.listings
            this.makes = data.makes
            this.models = data.models
            this.years = data.years
            this.totalCars = data.total
            this.buildArrays()
            this.valid = true
          })
      },
      getDataFromApi () {
        this.loading = true
        this.valid = false
        return new Promise((resolve, reject) => {
          const requestBody = {
            dealers: '1000279,1005356,1073805,1005357,1097063,1016553',
            page: this.strt,
            inventory_type: this.typ,
            color: this.clr,
            year: this.yr,
            make: this.mk,
            model: this.mdl
          }

          axios.post('http://104.131.62.182:3030/search', qs.stringify(requestBody), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
            let listings = response.data.listings
            let makes = response.data.makes
            let models = response.data.models
            let years = response.data.years
            const total = listings.length

            resolve({
              listings,
              makes,
              models,
              years,
              total
            })
          }).catch(error => {
            this.cars = error
          })
        })
      },
      buildArrays (k, v) {
        this.types = ['used', 'new']
        this.years = this.mapSelect(this._.uniqBy(this.years, 'item'))
        this.makes = this.mapSelect(this._.uniqBy(this.makes, 'item'))
        this.models = this.mapSelect(this._.uniqBy(this.models, 'item'))
        // this.colors = []
        this.types = this.types.sort()
        this.years = this.years.sort().reverse()
        this.makes = this.makes.sort()
        this.models = this.models.sort()
        // this.colors = this.colors.sort()
        this.loading = false
        this.valid = true
      },
      mapSelect (arr) {
        return arr.map(obj => {
          return obj.item
        })
      }
      // filterSelected (item) {
      //   let flag = true
      //   if (!this._.isEmpty(this.mk)) {
      //     if (this.mk.toString().toLowerCase().indexOf(item.build['make'].toString().toLowerCase()) === -1) {
      //       flag = false
      //     }
      //   }
      //   return flag
      // },
    }
  }
</script>

<style lang="sass">
  .right
    float: right
</style>

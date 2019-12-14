<template>
  <section
    id="search"
    class="pa-0"
  >
    <hero />
    <v-container fill-height>
      <v-layout
        justify-center
        align-center
        wrap
      >
        <v-card
          class="mx-auto"
          outlined
          style="margin-top: -84px;"
        >
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Search Inventory"
              append-icon="mdi-magnify"
              placeholder="Year, Make, Model"
              outlined
              hide-details
              @keyup.enter="submitSearch"
            />
          </v-card-title>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline">
                <v-card-actions
                  class="pb-0 px-0"
                >
                  <h3>FILTER RESULTS BY</h3>
                  <v-spacer />
                  <v-btn
                    small
                    class="mr-2"
                    @click="submitSearch('clearfilters')"
                  >
                    clear all filters
                  </v-btn>
                </v-card-actions>
              </div>
              <v-form v-model="valid">
                <v-row
                  dense
                  class="mt-n3"
                >
                  <!-- <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="inventory_type"
                      :disabled="!valid"
                      :items="types"
                      label="Type"
                      multiple
                      return-object
                      @change="buildArrays('inventory_type',`${type}`)"
                    />
                  </v-col> -->
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="yr"
                      :disabled="!valid"
                      :items="years"
                      label="Year"
                      clearable
                      multiple
                      @click:clear="clearField('yr',`${yr}`)"
                      @change="submitSearch('yr',`${yr}`)"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="typ"
                      :disabled="!valid"
                      :items="types"
                      label="Type"
                      clearable
                      @click:clear="clearField('typ',`${typ}`)"
                      @change="submitSearch('typ',`${typ}`)"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="mk"
                      :disabled="!valid"
                      :items="makes"
                      label="Make"
                      multiple
                      return-object
                      clearable
                      @click:clear="clearField('mk',`${mk}`)"
                      @change="submitSearch('mk',`${mk}`)"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="mdl"
                      :disabled="!valid"
                      :items="models"
                      label="Model"
                      clearable
                      multiple
                      @click:clear="clearField('mdl',`${mdl}`)"
                      @change="submitSearch('mdl',`${mdl}`)"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center">
                    <v-btn
                      color="primary"
                      dark
                      @click="submitSearch"
                    >
                      Search Inventory
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-data-table
            :headers="headers"
            :items="cars"
            :loading="loading"
            class="elevation-1"
            :hide-default-footer="true"
            :disable-pagination="true"
          >
            <template v-slot:item.media="{ item }">
              <v-img
                :src="item.media.photo_links[0]"
                width="60"
                height="60"
              />
            </template>
            <template v-slot:item.ref_price="{ item }">
              {{ parseInt(item.ref_price) + 500 | currency('$', ',') }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                small
                class="mr-2"
                @click="editItem(item)"
              >
                view details
              </v-btn>
            </template>
          </v-data-table>
          <v-row>
            <v-col
              cols="12"
              md="12"
              class="text-center"
            >
              <v-btn
                v-if="totalCars === 300"
                color="primary"
                dark
                @click="loadMore"
              >
                Load More
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline primary lighten-2 white--text"
              dark
              primary-title
            >
              {{ car.heading }}
              <span class="flex grow-1" />
              {{ parseInt(car.price) + 500 | currency('$', ',') }}
            </v-card-title>
            <v-carousel v-if="car.media">
              <v-carousel-item
                v-for="(item,i) in car.media.photo_links"
                :key="i"
                :src="item"
              />
            </v-carousel>
            <v-card-text>
              <h3>Miles</h3>
              <p>
                {{ car.miles }}
              </p>
              <h3>Build</h3>
              <span
                v-for="(value, name) in car.build"
                :key="name"
              >
                <b>{{ name.toUpperCase() }}</b>: {{ value }}
              </span>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="errorDialog"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline primary lighten-2 white--text"
              dark
              primary-title
            >
              {{ error.title }}
            </v-card-title>

            <v-card-text>
              <p>{{ error.message }}</p>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="errorDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import qs from 'querystring'
  import Vue2Filters from 'vue2-filters'

  export default {
    metaInfo () {
      return {
        title: this.$i18n.t('Home.jumbotronTitle')
      }
    },

    components: {
      Hero: () => import('@/components/sections/Hero')
    },

    mixins: [Vue2Filters.mixin],

    data: () => ({
      dialog: false,
      search: '',
      initialCall: true,
      editedIndex: -1,
      errorDialog: false,
      error: {},
      cars: [],
      types: ['new', 'used'],
      years: [],
      makes: [],
      models: [],
      colors: [],
      car: {},
      typ: '',
      strt: 0,
      clr: '',
      yr: '',
      mk: '',
      mdl: '',
      valid: false,
      totalCars: 0,
      loading: true,
      options: {},
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'media'
        },
        {
          text: 'Vehicle',
          sortable: false,
          align: 'left',
          value: 'heading'
        },
        { text: 'Year', value: 'build.year' },
        { text: 'Miles', value: 'ref_miles' },
        {
          text: 'Price',
          value: 'ref_price',
          align: 'right'
        },
        {
          text: '',
          sortable: false,
          value: 'action',
          align: 'right'
        }
      ]
    }),

    computed: {},

    watch: {
      options: {
        handler () {
          this.searchInventory()
        },
        deep: true
      }
    },

    mounted () {
      this.search = this.$route.query.search
      this.submitSearch()
    },

    methods: {
      submitSearch (k, v) {
        if (k === 'clearfilters') {
          this.yr = ''
          this.typ = ''
          this.mk = ''
          this.mdl = ''
        }
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
            if (this.typ === '') {
              this.typ = this.parseField(field.toString().toLowerCase(), this.types)
            }
          }
        }

        // set filter value
        if (k !== undefined && v !== undefined && v !== 'undefined') {
          this[k] = v
        }
        //  if (this.yr === '' && this.typ === '' && this.mk === '' && this.mdl === '' && !this.initialCall) {
        //    console.log('browse listing or clear filters or contact easyupp')
        //  } else {
        this.searchInventory()
        //  }
      },
      searchInventory () {
        this.getDataFromApi()
          .then(data => {
            this.makes = data.makes
            this.models = data.models
            this.years = data.years
            this.totalCars = data.total
            this.buildArrays()
            this.valid = true
            if (this.initialCall) {
              this.initialCall = false
              this.submitSearch()
            } else {
              this.cars = data.listings
            }
          })
      },
      getDataFromApi () {
        this.loading = true
        this.valid = false
        return new Promise((resolve, reject) => {
          const requestBody = {
            dealers: '1000279,1005356,1073805,1005357,1097063,1016553',
            page: this.strt + 1,
            inventory_type: this.typ,
            color: this.clr,
            year: this.yr,
            make: this.mk,
            model: this.mdl
          }

          this.$axios.post('http://104.131.62.182:3030/search', qs.stringify(requestBody), {
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
        this.years = this.mapSelect(this._.uniqBy(this.years, 'item'))
        this.makes = this.mapSelect(this._.uniqBy(this.makes, 'item'))
        this.models = this.mapSelect(this._.uniqBy(this.models, 'item'))
        // this.colors = []
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
      },
      // filterSelected (item) {
      //   let flag = true
      //   if (!this._.isEmpty(this.mk)) {
      //     if (this.mk.toString().toLowerCase().indexOf(item.build['make'].toString().toLowerCase()) === -1) {
      //       flag = false
      //     }
      //   }
      //   return flag
      // },
      filterExists (item) {
        if (this.types.indexOf(item.inventory_type) === -1) {
          this.types.push(item.inventory_type)
        }
        if (this.colors.indexOf(this.parseColor(item.exterior_color)) === -1 && this.parseColor(item['exterior_color']) !== null) {
          this.colors.push(this.parseColor(item.exterior_color))
        }
        if (this.makes.indexOf(item.build.make) === -1) {
          this.makes.push(item.build.make)
        }
        if (this.models.indexOf(item.build.model) === -1) {
          if (!this._.isEmpty(this.mk)) {
            if (this.mk.toString().toLowerCase().indexOf(item.build['make'].toString().toLowerCase()) > -1) {
              this.models.push(item.build.model)
            }
          } else {
            this.models.push(item.build.model)
          }
        }
        if (this.years.indexOf(item.build.year) === -1) {
          this.years.push(item.build.year)
        }
      },
      parseColor (c) {
        const colorChoices = ['black', 'blue', 'brown', 'gold', 'gray', 'green', 'orange', 'purple', 'red', 'silver', 'tan', 'white', 'yellow', 'metal', 'satin', 'metallic', 'pearl']
        this.parseField(c, colorChoices)
      },
      parseField (f, choices) {
        if (this._.isEmpty(f) || this._.isEmpty(choices)) {
          return ''
        }
        f = f.toString().toLowerCase()
        for (var i = 0; i !== choices.length; i++) {
          var substring = choices[i].toString().toLowerCase()
          if (f.indexOf(substring) !== -1) {
            return substring
          }
        }
        return ''
      },
      clearField (k, v) {
        this.search = this.$route.query.search.replace(v, '').replace('  ', '').trim()
        console.log(this.search)
        this.submitSearch(k)
      },
      loadMore () {
        this.strt += this.totalCars
        console.log(this.strt)
        this.submitSearch('')
      },
      editItem (item) {
        this.loading = true
        this.$axios.get('http://104.131.62.182:3030/detail', {
          params: {
            detail_id: item.id
          }
        }).then(response => {
          this.car = response.data
          this.loading = false
          this.dialog = true
        }).catch(error => {
          this.loading = false
          this.errorDialog = true
          this.error = {
            title: error,
            message: 'Contact EasyUpp to resolve'
          }
        })
      }
    }
  }
</script>

<style lang="sass">
  .right
    float: right
</style>

<template>
  <section
    id="contact"
    class="pa-0"
  >
    <hero />
    <v-container fill-height>
      <v-layout
        justify-space-between
        wrap
      >
        <v-flex
          xs12
          md7
          mb-4
        >
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
                Thanks for signing up!
              </v-card-title>

              <v-card-text>
                We will follow up with details soon.
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <h2
            class="headline mb-2"
            v-text="$t('Contact.heading1')"
          />
          <p
            class="mb-4"
            v-text="$t('Contact.headingText1')"
          />
          <v-card>
            <v-card-text>
              <v-form v-model="valid">
                <v-select
                  v-model="type"
                  item-text="label"
                  item-value="value"
                  :items="types"
                  name="type"
                />
                <v-text-field
                  v-model="name"
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                />
                <!-- <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                /> -->
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  name="email"
                  :rules="emailRules"
                  required
                  prepend-icon="mdi-email"
                />
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  name="phone"
                  prepend-icon="mdi-phone"
                  mask="phone"
                />
                <v-textarea
                  v-model="message"
                  label="Message"
                  name="message"
                  prepend-icon="mdi-message-text"
                />
                <v-btn
                  large
                  class="px-5"
                  color="primary"
                  :disabled="!valid"
                  @click="submit"
                >
                  {{ $t('Contact.submit') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm4
          md3
        >
          <v-card>
            <div class="pa-3">
              <img
                src="/static/easyupp-logo-light.png"
              >
            </div>
            <v-card-text>
              <div
                class="mb-3"
                v-text="$t('Contact.phone')"
              />
              <!-- <div v-text="$t('Contact.address')" />
              <div v-text="$t('Contact.cityState')" />
              <div v-text="$t('Contact.zip')" /> -->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    metaInfo () {
      return {
        title: this.$i18n.t('Contact.jumbotronTitle')
      }
    },

    components: {
      Hero: () => import('@/components/sections/Hero')
    },

    data: () => ({
      dialog: false,
      valid: false,
      name: '',
      typeValue: '',
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      phone: '',
      message: '',
      type: 'Salesman',
      types: [
        {
          label: "I'm a Salesman",
          value: 'Salesman'
        },
        {
          label: "I'm a Dealer",
          value: 'Dealer'
        }
      ]
    }),

    methods: {
      submit () {
        // nativeForm.submit()
        axios.post('http://104.131.62.182:3030/sendemail', {
          type: this.type,
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message
        }).then(valid => {
          this.errors = valid ? [] : ['async error']
          this.dialog = true
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        })
      },
      setSelected () {
        this.typeValue = this.type.value
      }
    }
  }
</script>

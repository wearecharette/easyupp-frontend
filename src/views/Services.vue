<template>
  <section
    id="services"
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
          text-center
          xs12
          mb-3
          v-text="$t('Services.heading1')"
        />
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
                1. Set the appointment!
              </div>
            </v-card-title>
            <v-card-text
              class="white--text"
            >
              <p>You’ll receive a message from a salesman with a customer interested in your vehicle.  Confirm any info they need, make sure it’s available, and encourage them to set an appointment with their customer.</p>
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
                2. Sell the car!
              </div>
            </v-card-title>
            <v-card-text
              class="black--text"
            >
              <p>When they show up, treat this like a deal on an experienced salesman’s first day.  Their customers chose them because they are comfortable with them so help them sell the car and encourage the salesmen to come see you again!</p>
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
            to="/contact"
            dark
          >
            Become a Dealer
          </v-btn>
          <div class="pa-2">
            <p><a href="/contact">Become a Salesman</a>?</p>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-layout justify-center>
            <v-flex
              xs12
              sm10
              md8
            >
              <core-testimonial
                :author="testimonial.author"
                :title="testimonial.title"
                :quote="testimonial.quote"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  export default {
    metaInfo () {
      return {
        title: this.$i18n.t('Services.jumbotronTitle')
      }
    },

    components: {
      Hero: () => import('@/components/sections/Hero'),
      CoreTestimonial: () => import('@/components/core/Testimonial')
    },

    computed: {
      testimonial () {
        return {
          quote: this.$t('Services.testimonial.quote'),
          author: this.$t('Services.testimonial.author'),
          title: this.$t('Services.testimonial.title')
        }
      }
    }
  }
</script>

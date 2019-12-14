<template>
  <v-auth>
    <v-dialog
      v-model="register"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline primary lighten-2 white--text"
          dark
          primary-title
          v-text="$t('Dashboard.registerHeadline')"
        />
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              label="E-mail"
              name="email"
              :rules="emailRules"
              required
              prepend-icon="mdi-email"
            />
            <v-text-field
              v-model="password"
              :prepend-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:prepend="show1 = !show1"
            />
            <v-text-field
              v-model="confirmPassword"
              :prepend-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:prepend="show2 = !show2"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="register = false; signin = true; reset = false; valid = false;"
          >
            Sign-in
          </v-btn>
          <v-spacer />
          <div class="pa-2">
            <p>
              <a
                href="#!"
                @click="reset = true; signin = false; register = false; valid = false;"
              >
                forgot password
              </a>?
            </p>
          </div>
          <v-btn
            large
            class="px-5"
            color="primary"
            :disabled="!valid"
            @click="submit"
          >
            {{ $t('Dashboard.register') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="signin"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline primary lighten-2 white--text"
          dark
          primary-title
          v-text="$t('Dashboard.modalheadline')"
        />
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              label="E-mail"
              name="email"
              :rules="emailRules"
              required
              prepend-icon="mdi-email"
            />
            <v-text-field
              v-model="password"
              :prepend-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:prepend="show1 = !show1"
            />
            <v-checkbox
              v-model="remember"
              label="remember me"
              name="remember"
            />
          </v-form>
          <v-divider />
          <v-btn
            color="primary"
            text
            @click="authenticate('google')"
          >
            Google
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="signin = false"
          >
            Facebook
          </v-btn>
          <div class="pa-2">
            <p>
              <a
                href="#!"
                @click="register = true; signin = false; reset = false; valid = false;"
              >
                New here? Create an account.
              </a>
            </p>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="signin = false"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <div class="pa-2">
            <p>
              <a
                href="#!"
                @click="reset = true; signin = false; register = false; valid = false;"
              >
                forgot password
              </a>?
            </p>
          </div>
          <v-btn
            large
            class="px-5"
            color="primary"
            :disabled="!valid"
            @click="submit"
          >
            {{ $t('Dashboard.submit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="reset"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline primary lighten-2 white--text"
          dark
          primary-title
          v-text="$t('Dashboard.resetHeadline')"
        />
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              label="E-mail"
              name="email"
              :rules="emailRules"
              required
              prepend-icon="mdi-email"
            />
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="reset = false; signin = true; register = false; valid = false;"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            large
            class="px-5"
            color="primary"
            :disabled="!valid"
            @click="submit"
          >
            {{ $t('Dashboard.reset') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-auth>
</template>

<script>
  export default {
    props: {
      signin: Boolean
    },

    data: () => ({
      show1: false,
      show2: false,
      register: false,
      remember: false,
      reset: false,
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      confirmPassword: '',
      confirmPasswordRules: [
        (v) => !!v || 'Password must be confirmed'
      ]
    }),

    mounted: function () {
      console.log('The props are also available in JS:', this.signin)
    },

    methods: {
      submit () {
        // nativeForm.submit()
      },

      authenticate: function (provider) {
        console.log('test ' + this.$auth)
        this.$auth.authenticate(provider).then(function () {
          console.log('super dupper')
          this.signin = false
          // Execute application logic after successful social authentication
        })
      }
    }
  }
</script>

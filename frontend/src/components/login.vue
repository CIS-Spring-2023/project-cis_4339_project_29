<template>
  <div class="flex justify-center mt-8">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            :class="{ 'border-red-500': !emailIsValid }"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <p v-if="!emailIsValid" class="text-red-500 text-xs italic mt-2">
            Please enter a valid email address.
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            :class="{ 'border-red-500': !passwordIsValid }"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            required
          />
          <p v-if="!passwordIsValid" class="text-red-500 text-xs italic mt-2">
            Password must be at least 8 characters long.
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click.prevent="submitForm"
            :disabled="!formIsValid"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div v-if="showErrorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth"
export default {
  data() {
    return {
      email: '',
      password: '',
      showErrorMessage: false,
      errorMessage: '',
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    emailIsValid() {
      // This regular expression matches email addresses with basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.email)
    },
    passwordIsValid() {
      // Check if password is at least 8 characters long
      return this.password.length >= 8
    },
    formIsValid() {
      return this.emailIsValid && this.passwordIsValid
    }
  },
  methods: {
    submitForm() {
      // Check email and password
      if (this.email === 'user1234@gmail.com' && this.password === 'User1234') {
        // Redirect to welcome page
        this.$router.push('/') 
        return useAuthStore().isAuth = true
      } else {
    // Display error message when password is incorrect
    alert('Incorrect email or password.')
  }
    }
  }
}
</script>

<style scoped>

</style>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import axios from 'axios'
import { DateTime } from 'luxon'
import serviceData from '../assets/ServiceTestData.js';
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  components: { VueMultiselect },
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // rename services arrays for added clarity
      service: {
        name: '',
        provName: '',
        description: '',
        active: undefined,
      }
    }
  },
  created() {

    axios.get(`${apiURL}/service/${this.$route.params.id}`).then((res) => {
      this.service = res.data
      console.log(this.service)
      this.client = res.data
     })

    //Test Data
    this.service = serviceData.testData[this.$route.params.id - 1]

  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async updateService() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .put(`${apiURL}/service/${this.id}`, this.service)
          .then(() => {
            alert('Update has been saved.')
            this.$router.back()
          })
      }
    }
  },
  validations() {
    return {
      service: {
        name: { required },
        provName: { required },
        active: { required }
      }
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="updateService">
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Service Details</h2>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name" />
              <span class="text-black" v-if="v$.service.name.$error">
                <p class="text-red-700" v-for="error of v$.service.name.$errors" :key="error.$uid">
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Provider Name</span>
              <span style="color: #ff0000">*</span>
              <input
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.provName" type="text" />
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col col-span-2">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="service.description"></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div class="flex flex-col col-span-2">
            <label class="block">
              <span class="text-gray-700">Service Available</span>
              <span style="color: #ff0000">*</span>
            </label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="service.active" class="sr-only peer">
              <div
                class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
              <span v-if="service.active" class="ml-3 text-sm font-medium text-green-600 dark:text-green-600">Active</span>
              <span v-else class="ml-3 text-sm font-medium text-red-600 dark:text-red-600">Inactive</span>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
        </div>
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Update Service
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

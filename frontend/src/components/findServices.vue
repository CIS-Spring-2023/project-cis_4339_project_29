<script>
import axios from 'axios'
import serviceData from '../assets/ServiceTestData.js';
import { useAuthStore } from "@/store/auth"
const apiURL = import.meta.env.VITE_ROOT_API


export default {
  data() {
    return {
      queryData: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      provName: '',
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  created() {
    this.getServices()
  },
  methods: {
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Service Name') {
        endpoint = `service/search/?serviceName=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Provider Name') {
        endpoint = `service/search/?providerName=${this.provName}&searchBy=provName`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.queryData = res.data
      })
    },
    // abstract get services call
    getServices() {
      //*For when BackEnd Implemented
       axios.get(`${apiURL}/service`).then((res) => {
       this.queryData = res.data
       })
      window.scrollTo(0, 0)

    },

    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.serviceName = ''
      this.providerName = ''

      // get all entries
      this.getServices()
    },
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
    }
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Find Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Services By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Provider Name">Provider Name</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter Service name"
            />
          </label>
        </div>
        <!-- Displays Client Number search field -->
        <div class="flex flex-col" v-if="searchBy === 'Provider Name'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="provName"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter Provider Name"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Services
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 v-if=authStore.isAuth class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Provider Name</th>
              <th class="p-4 text-left">Active</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="authStore.isAuth ? editService(service._id) : null"
              v-for="service in queryData"
              :key="service._id"
            >
              <td class="p-2 text-left">
                {{ service.name }}
              </td>
              <td class="p-2 text-left">
                {{ service.provName }}
              </td>
              <td class="p-2 text-left">{{ service.active }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

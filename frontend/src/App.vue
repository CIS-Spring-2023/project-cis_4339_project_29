<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useAuthStore } from "@/store/auth"


export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform'
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
    })
  },
}
</script>

<template>
  <main class="flex flex-row">

    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li v-if="authStore.isAuth">

              <span style="position: relative; top: 6px" class="material-icons"></span>
              Welcome {{ authStore.user.AdminName }}
            </li>
            <li v-if="authStore.isReader">

              <span style="position: relative; top: 6px" class="material-icons"></span>
              Welcome {{ authStore.user.ReaderName }}
            </li>
            <li v-if="!authStore.isAuth && !authStore.isReader">
              <router-link to="/login">
                <span style="position: relative; top: 6px" class="material-icons">login</span>
                login
              </router-link>
            </li>
            
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li v-show="authStore.isAuth">
              <router-link to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li v-show="authStore.isAuth">
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li v-show="authStore.isAuth" >
              <router-link to="/createservices">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Services
              </router-link>
            </li>
            <li v-if="authStore.isAuth || authStore.isReader">
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li v-if="authStore.isAuth || authStore.isReader">
              <router-link to="/findevents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <li v-if="authStore.isAuth || authStore.isReader">
              <router-link to="/findservices">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Services
              </router-link>
            </li>
            <li v-if="authStore.isAuth">
              <router-link to="/">
              <span style="position: relative; top: 6px" class="material-icons">logout</span>
              <button @click="authStore.isAuth = false">Logout</button>
              </router-link>
            </li>
            <li v-if="authStore.isReader">
              <router-link to="/">
              <span style="position: relative; top: 6px" class="material-icons">logout</span>
              <button @click="authStore.isReader = false">Logout</button>
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)">
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>

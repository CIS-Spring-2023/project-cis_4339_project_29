<template>
  <div>
    <!-- canvas element for chart -->
    <canvas id="doughnut-chart"></canvas>
  </div>
</template>


<script>
import { Chart, registerables } from 'chart.js'
import doughnutchartData from '../assets/chartData.js'

export default {
  data() {
    return {
      queryData: [],
      // Parameter for search to occur
      zipCode: '',
    }
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  created() {
    this.getClients()
  },
  methods: {}
  
  
Chart.register(...registerables);
export default {
  name: 'doughnutChart',
  data() {
    return {
      doughnutchartData: doughnutchartData
    }
  },
  //establish Chart object after mounting the component
  mounted() {
    const ctx = document.getElementById('doughnut-chart');
    new Chart(ctx, this.doughnutchartData);
  }
}
</script>
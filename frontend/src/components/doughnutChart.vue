<template>
  <div>
    <!-- canvas element for chart -->
    <canvas id="doughnut-chart"></canvas>
  </div>
</template>


<script>
import { Chart, registerables } from 'chart.js'
import doughnutchartData from '../assets/chartData.js'

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
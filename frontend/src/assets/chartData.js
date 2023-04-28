const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const clientModel = require('./models/client');

/*export const doughnutchartData = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Coverage by Zip',
          data: [],
          backgroundColor: [
            'rgb(255,99,132)',
            'rgb(54,162,235)',
            'rgb(255,205,86)'
        ],
          hoveroffset: 4
        }],
    }};*/

    router.get('/clients', (req, res) => {
      clientModel.find({}, (err, clients) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred while fetching clients');
        } else {
          const labels = clients.map(client => client.zipCode);
          const data = clients.map(client => client.zipCode);
          const backgroundColor = [
            'rgb(255,99,132)',
            'rgb(54,162,235)',
            'rgb(255,205,86)'
          ];
          res.json({
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [{
                label: 'Coverage by Zip',
                data: data,
                backgroundColor: backgroundColor,
                hoverOffset: 4
              }]
            }
          });
        }
      });
    });
    
    module.exports = router;
    
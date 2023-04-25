const uuid = require('uuid')
const mongoose = require('mongoose')
const eventDataSchema = mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
       
        name: {
          type: String,
          required: true
        },
        services: [
          {
            type: String
          }
        ],
        date: {
          type: Date,
          required: true
        },
        address: {
          line1: {
            type: String
          },
          line2: {
            type: String
          },
          city: {
            type: String
          },
          county: {
            type: String
          },
          zip: {
            type: String
          }
        },
        description: {
          type: String
        },
        attendees: [
          {
            type: String,
            ref: 'client'
          }
        ]
      },
      {
        collection: 'event'
      }
)

const Event = mongoose.model('Events', eventDataSchema)
module.exports = Event;
const uuid = require('uuid')
const mongoose = require('mongoose')
const clientDataSchema = mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        firstName: {
          type: String,
          required: true
        },
        middleName: {
          type: String
        },
        lastName: {
          type: String,
          required: true
        },
        email: {
          type: String
        },
        phoneNumber: {
          primary: {
            type: String,
            required: true
          },
          alternate: {
            type: String
          }
        },
        address: {
          line1: {
            type: String
          },
          line2: {
            type: String
          },
          city: {
            type: String,
            required: true
          },
          county: {
            type: String
          },
          zip: {
            type: String
          }
        },
        orgs: {
          type: [{ type: String, ref: 'org' }],
          required: true,
          validate: [(org) => org.length > 0, 'needs at least one org']
        }
      },
      {
        collection: 'client',
        timestamps: true
      }
)

const Client = mongoose.model('Client', clientDataSchema)
module.exports = Client;


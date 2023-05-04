const mongoose = require('mongoose')
const uuid = require('uuid')
const serviceSchema = mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        name: {
          type: String,
          required: true
        },
        provName: {
          type: String,
          required: true
        },
        description: {
            type: String
        },
        active:{
          type: Boolean,
          required:false
        }
    },
    {
        collection: 'services',
        timestamps: true
      }
)

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service;
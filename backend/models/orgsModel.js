const mongoose = require('mongoose')
const uuid = require('uuid')
const orgSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuid.v1
        },
        name: {
          type: String,
          required: true
        }
      },
      {
        collection: 'org'
      }
)

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
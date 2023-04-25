const mongoose = require('mongoose')
const uuid = require('uuid')
const userSchema = mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        username: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        }
    },
    {
        collection: 'user',
        timestamps: true
      }
)

const User = mongoose.model('User', userSchema)
module.exports = User;
import { Schema, model } from 'mongoose'

const projectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    deliveryDate: {
      type: Date,
      default: Date.now()
    },
    client: {
      type: String,
      trim: true,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ],
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model('Project', projectSchema)

import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    state: {
      type: Boolean,
      default: false
    },
    deliveryDate: {
      type: Date,
      required: true,
      default: Date.now()
    },
    priority: {
      type: String,
      required: true,
      enum: ['Baja', 'Media', 'Alta']
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  {
    timestamps: true
  }
)

export default model('Task', taskSchema)

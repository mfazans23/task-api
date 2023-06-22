import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'in progress', 'pending'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
})

const Task = mongoose.model('Task', taskSchema)

export default Task

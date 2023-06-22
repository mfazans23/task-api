import asyncHandler from 'express-async-handler'
import Task from '../model/taskModel.js'

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()

  res.json(tasks)
})

export const filterTask = asyncHandler(async (req, res) => {
  const { filter } = req.query

  //   GET /api/tasks/filter?filter=[  {"field": "status", "operator": "isNot", "value": "completed"},
  //   {"field": "tags", "operator": "contains", "value": "urgent"}]

  if (!filter) {
    return res.status(400).json({ error: 'Missing filter parameter' })
  }

  const filters = JSON.parse(filter)

  const filterQuery = filters.reduce((query, filter) => {
    const { field, operator, value, logicalOperator } = filter

    let condition
    switch (operator) {
      case 'is':
        if (field === 'tags') {
          condition = { [field]: { $all: value } }
        } else {
          condition = { [field]: value }
        }
        break
      case 'isNot':
        if (field === 'tags') {
          condition = { [field]: { $not: { $all: value } } }
        } else {
          condition = { [field]: { $ne: value } }
        }
        break
      default:
        condition = null
    }

    if (condition) {
      if (logicalOperator === 'OR') {
        query['$or'] = query['$or'] || []
        query['$or'].push(condition)
      } else {
        query['$and'] = query['$and'] || []
        query['$and'].push(condition)
      }
    }
    return query
  }, {})

  const filteredTask = await Task.find(filterQuery)

  res.json(filteredTask)
})

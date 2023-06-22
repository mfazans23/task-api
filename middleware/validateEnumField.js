// Middleware function to validate enum-typed fields
const validateEnumFields = (req, res, next) => {
  const allowedStatusValues = ['pending', 'completed', 'inProgress']
  const allowedPriorityValues = ['low', 'medium', 'high']

  if (req.body.status && !allowedStatusValues.includes(req.body.status)) {
    return res.status(400).json({ error: 'Invalid status value' })
  }

  if (req.body.priority && !allowedPriorityValues.includes(req.body.priority)) {
    return res.status(400).json({ error: 'Invalid priority value' })
  }

  next()
}

export default validateEnumFields

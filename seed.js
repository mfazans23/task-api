const { faker } = require('@faker-js/faker')
const fs = require('fs')
const Task = require('./model/taskModel')
const User = require('./model/userModel')
const connectDB = require('./db/connectDB')

connectDB()

const generateRandomUsers = async (count) => {
  try {
    const users = []

    for (let i = 0; i < count; i++) {
      const user = new User({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        // Add other user fields as needed
      })

      await user.save(0)
      users.push(user)
    }

    console.log(`${count} random users created successfully.`)

    return users
  } catch (error) {
    console.error('Error generating random users:', error)
  }
}

const generateRandomTasks = async (count) => {
  try {
    const users = await generateRandomUsers(count)

    if (users && users.length > 0) {
      const randomUser = faker.helpers.arrayElement([...users])
      for (let i = 0; i < count; i++) {
        const task = new Task({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement([
            'completed',
            'in progress',
            'pending',
          ]),
          priority: faker.helpers.arrayElement(['high', 'medium', 'low']),
          dueDate: faker.date.future(),
          createdBy: randomUser._id,
          tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        })

        await task.save()
      }
      console.log(`${count} random tasks created successfully.`)
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error('Error generating random tasks:', error)
  }
}

// Call the function to generate 10 random tasks
generateRandomTasks(10)

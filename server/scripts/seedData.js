const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectDB = require('../config/database');

const User = require('../models/User');
const Task = require('../models/Task');

// Sample users
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  }
];

// Sample tasks
const sampleTasks = [
  {
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task manager project',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    tags: ['documentation', 'project']
  },
  {
    title: 'Review code changes',
    description: 'Review pull requests and provide feedback',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    tags: ['review', 'development']
  },
  {
    title: 'Team meeting preparation',
    description: 'Prepare agenda and materials for weekly team meeting',
    priority: 'medium',
    status: 'completed',
    // No due date for completed tasks to avoid validation error
    tags: ['meeting', 'planning']
  },
  {
    title: 'Update dependencies',
    description: 'Update all npm packages to latest stable versions',
    priority: 'low',
    status: 'pending',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    tags: ['maintenance', 'development']
  },
  {
    title: 'Write unit tests',
    description: 'Add unit tests for new API endpoints',
    priority: 'high',
    status: 'pending',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    tags: ['testing', 'development']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using existing connection function
    await connectDB();
    console.log('Connected to MongoDB via connectDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create users - let the User model handle password hashing
    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // This will trigger the pre-save middleware for password hashing
      
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create tasks for users
    let taskCount = 0;
    for (const user of createdUsers) {
      // Create 3-4 tasks per user
      const userTasks = sampleTasks.slice(taskCount, taskCount + 3);
      
      for (const taskData of userTasks) {
        await Task.create({
          ...taskData,
          user: user._id
        });
      }
      
      taskCount += 3;
      console.log(`Created ${userTasks.length} tasks for user: ${user.email}`);
    }

    console.log('\\n✅ Database seeded successfully!');
    console.log(`📊 Created ${createdUsers.length} users and ${sampleTasks.length} tasks`);
    console.log('\\n🔐 Test user credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('\\n📝 Database connection closed');
    process.exit(0);
  }
};

// Run the seed script
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
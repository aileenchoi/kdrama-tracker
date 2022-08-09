const mongoose = require('mongoose')

// Create schema (template)
const toDoTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true 
    },
    completed: {
        type: String
    },
    numberOfEpsWatched: {
        type: Number,
        require: false
    },
    totalEps: {
        type: Number,
        require: false
    },
    review: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        default: Date.now  
    }
})

// Export and build model from schema (database name, name, collection name)
module.exports = mongoose.model('ToDoTask', toDoTaskSchema, 'tasks')
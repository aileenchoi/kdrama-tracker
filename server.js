// Declare variables
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const ToDoTask = require('./models/todotasks')
const PORT = 8300

//add model variable 

// Set middleware 
app.set("view engine", "ejs")
app.use(express.static('public')) //express will look in public folder for stylesheets
app.use(express.urlencoded({extended: true})) //help validate info we are passing back and forth, extended allows it to pass arrays and JSONs

mongoose.connect(process.env.DB_CONNECTION,  //tells where to look for the connection string 
    {useNewUrlParser: true},
    () => {console.log('connected to db!')}
)

// GET
app.get('/', async (req, res) => {
    try {
        ToDoTask.find({}, (err, tasks)=>{
            res.render('index.ejs', {ToDoTask: tasks}) //render ejs file
        })
    } catch (err) {
        if(err) return res.status(500).send(err)
    }
}
)

// POST
app.post('/', async (req, res) => {
    const todoTask = new ToDoTask (
        {
            title: req.body.title, //from todotasks.js schema
            completed: req.body.completed,
            numberOfEpsWatched: req.body.episodes,
            totalEps: req.body.totalEpisodes,
            review: req.body.review
        }
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect("/")
    } catch(err) {
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})

// EDIT or UPDATE method
app
    .route('/edit/:id')
    .get((req,res) => {
        const id = req.params.id
        ToDoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                ToDoTask:tasks, idTask: id})
        })
    })
    .post((req, res) => {
        const id = req.params.id 
        ToDoTask.findByIdAndUpdate(
            id, 
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if(err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

// Delete
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        ToDoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

// start server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
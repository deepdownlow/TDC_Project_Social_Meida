const express = require('express')
const bodyPasrer = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

//Register Routes
const user = require('./routes/api/user/register')

//connect db
const db = require('./config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true })
 .then(() => console.log(`DB is connected`))
 .catch(err => console.log(`something went wrong`))

//Middlewares
app.use(bodyPasrer.json())
app.use(bodyPasrer.urlencoded({ extended: false }))
app.use(cors())

//Routes MiddleWare
app.use('/api/user', user)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is running on port ${port}`))
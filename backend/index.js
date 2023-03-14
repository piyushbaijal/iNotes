const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./db');
const cors = require('cors');
const path = require('path')




dotenv.config();
connectDb();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

// Available Routs
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.use('*', (res, req) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(port, () => {
    // console.log(`iNotes  backend listening on port ${port}`)
})



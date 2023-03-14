const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./db');
var cors = require('cors');



dotenv.config();
connectDb();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routs
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotes  backend listening on port ${port}`)
})
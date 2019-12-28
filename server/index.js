const express = require('express');
const cors = require('cors');
const app = express();
const {checkIfAuthed} = require('./app/middleware/auth');
const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(checkIfAuthed);

app.use('/api', apiRouter);


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
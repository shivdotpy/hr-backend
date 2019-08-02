const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routers
const employeeRoutes = require('./src/routes/employee.routes');
const salarySlipRoutes = require('./src/routes/salarySlip.routes');
const adminRoutes = require('./src/routes/admin.routes');

const PORT = 6000;

// Initialise the app
const app = express();

// CORS
app.use(cors());

// Body parser starts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Body Parser ends


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/salary-slip', salarySlipRoutes);
// Routes Ends


// DB connection
const DBUrl = 'mongodb+srv://shivdotpy:Hello123@cluster0-6zuqf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(DBUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', () => console.log('MongoDB connection error:'));
// DB connection ends


app.get('/', (req, res) => res.send('working'));

// Start server
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
});
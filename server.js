const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3500;

//custom logger
app.use(logger);

//handle options credentials check before CORS.
// handle fetch cookies credentials requirement
app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

//middleware to handle urelencoded form data
app.use(express.urlencoded({ extended: false}));

//middleware to handle json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));
//AllActivity

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/logout', require('./routes/api/logout'));

app.use(verifyJWT);
app.use('/components', require('./routes/api/components'));
app.use('/usageByWebsite', require('./routes/api/usageByWebsite'));
app.use('/topWebUsers', require('./routes/api/topWebUsers'));
app.use('/hitsOverTime', require('./routes/api/hitsOverTime'));
app.use('/topAccounts', require('./routes/api/topAccounts'));
app.use('/totalPageViews', require('./routes/api/totalPageViews'));
app.use('/orderNumbers', require('./routes/api/orderNumbers'));
app.use('/websites', require('./routes/api/websites'));
app.use('/accountNames', require('./routes/api/accountNames'));
app.use('/users', require('./routes/api/users'));
app.use('/allActivity', require('./routes/api/allActivity'));
app.use('/employees', require('./routes/api/employees'));
app.use('/wuusers', require('./routes/api/wuusers'));
app.use('/wuuser', require('./routes/api/wuuser'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.son({ error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

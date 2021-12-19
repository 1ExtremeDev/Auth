const express = require('express');const app = express();const morgan = require('morgan');const helmet = require('helmet');app.use(express.json());app.use(helmet());
if (app.get('env')=== 'development') {app.use(morgan('tiny'));console.log("\x1b[32m"+"Morgan has been enabled"+"\x1b[0m");}
const login = require('./routes/login');const renew = require('./routes/renew');const upgrade = require('./routes/upgrade');const register = require('./routes/register');const remove = require('./routes/delete');const reset = require('./routes/reset');app.use('/api/login',login);app.use('/api/register',register);app.use('/api/upgrade',upgrade);app.use('/api/renew',renew);app.use('/api/adios',remove);app.use('/api/reset',reset);
app.listen(3000, () => {console.log('\x1b[36m'+'Listening on port 3000....'+'\x1b[0m');});
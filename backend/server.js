
const express= require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const API_PORT = 4000;
const dbroute = 'mongodb://127.0.0.1:27017/uiintegration';
mongoose.connect(dbroute,{useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;

const messagerouter = require('./routes/user');
const dialogflowrouter = require('./routes/dialog');

db.once('open',() => console.log('database integrated successfully'));
db.on('error',() => console.error.bind(console, 'cannot integrate with db'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use('/messages',messagerouter);
app.use('/fulfillment',dialogflowrouter);
// app.use('/track',function(req,res){
//   res.send({outcome:'success'});
// })
// app.use('/',dashbotrouter);

app.listen(API_PORT,() =>console.log(`server listening on ${API_PORT}`));


const express = require('express');
const bodyParser = require('body-parser');
const dashbot = require('dashbot')('s33KZanzDbVaUpcZGo1ipwzydrfqmFSy1lAj9tlz').google;
const https = require('https');
const url = require('url');
const intent1 = require('../intents/default_welcome');
const stock_price = require('../intents/fetchstockprice')
const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
} = require('actions-on-google');
const app = express();
app.use(bodyParser.json());
const router = express.Router().use(bodyParser.json());


const dialog  = dialogflow({
  debug: false
});

dialog.intent('Default Welcome Intent',intent1.say_this);
dialog.intent('stock prices',stock_price.fetch_price);


router.post("/",dialog);
module.exports = router;


//////////////////////////////////////// promise way/////////////////////////////////




//   newmsg.save().then(() => dialog)
//   .catch(err => {
//     console.log(req.body.queryResult.queryText)
//     console.log('eeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+err)
//     res.json('error hereeeeeee');
// });
  //console.log(res);
  // console.log("send somet");
  // console.log(request.body); **/


////////////////////////////////////////////////////////try method 3
/**router.post('/',((req,res)=>{
  const newmsg = new Dialogslog();
  newmsg.query = req.body.queryResult.queryText;
  newmsg.save((err)=>{
    if(err)
    {
      console.log(err+'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      res.json({success: false});
    }
    else{
      console.log('allllllllllllll successssss');

      //res.json({success:true})
    }
  });

})) */
/**router.post('/',((req,res)=>{
  const newmsg = new Dialogslog();
  newmsg.query = req.body.queryResult.queryText;
  newmsg.save((err)=>{
    if(err)
    {
      console.log(err+'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      res.json({success: false});
    }
    else{
      console.log('allllllllllllll successssss');

      //res.json({success:true});

    }
  });

})**/

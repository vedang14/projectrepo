
const express = require('express');
const bodyParser = require('body-parser');
const dashbot = require('dashbot')('s33KZanzDbVaUpcZGo1ipwzydrfqmFSy1lAj9tlz').google;
const Dialogslog = require('../models/dialog');
const https = require('https');
const url = require('url');
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

function savetoDb(query,queryResult,intentDetectionConfidence){
  const newmsg = new Dialogslog();
  newmsg.query = query
  newmsg.queryResponse = queryResult
  newmsg.intentconf = intentDetectionConfidence
  newmsg.save((err)=>{
    if(err)
    {
      console.log(err+'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      res.json({success: false});
    }
    else{
      console.log('allllllllllllll successssss');
    }
  });
}

async function fetchstockdatapi(company_name){
  var arr = [];
  var tickerMap = {
  "apple" : "AAPL",
  "microsoft" : "MSFT",
  "ibm" : "IBM",
  "google" : "GOOG",
  "facebook" : "FB",
  "snapchat" : "SNAP"
  };
  var stockticker = tickerMap[company_name.toLowerCase()];
   let requestResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockticker}&outputsize=compact&apikey=VME7LOCQWYTM7N9F`)
  .then(res => res.json())
  .then(result => {
    console.log("beforeeeeeeeee");
        console.log(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["1. open"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["2. high"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["3. low"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["4. close"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["5. volume"])
      //  console.log(arr);
        return arr;
  })
  .catch(err => console.error(err));
  return requestResponse


}

dialog.intent('showmeshoes',(conv) =>{
  conv.ask('average price of nike air max jordan is between 3600-6500 Rupees ')
  savetoDb(conv.body.queryResult.queryText,conv.responses[0],10);
})

dialog.intent('Default Welcome Intent',(conv) =>{
  console.log("hereeeeeeeeeee");
  conv.ask('Hi ! your Stock bot here, how may I assist you');
//  console.log(conv.body.queryResult.queryText);
//  console.log(conv.responses[0])
//  console.log(conv);
console.log(JSON.stringify(conv.body.intentDetectionConfidence));
savetoDb(conv.body.queryResult.queryText,conv.responses[0],conv.body.queryResult.intentDetectionConfidence);
  savetoDb(conv.body.queryResult.queryText,conv.responses[0],conv.body.queryResult.intentDetectionConfidence);
});

 dialog.intent('custom hi',(conv) =>{
  console.log("hereeeeeeeeeee");
  conv.ask('this is from fulfillment');
  console.log(conv);
  console.log(conv.body.queryResult.intentDetectionConfidence);
  savetoDb(conv.body.queryResult.queryText,conv.responses[0],conv.body.queryResult.intentDetectionConfidence);
});

dialog.intent('stock prices', async (conv)=>{
    console.log(conv.body.queryResult.parameters.comapny_name)
    var temp = [];
    temp=  await fetchstockdatapi(conv.body.queryResult.parameters.comapny_name);
     console.log('after function')
     console.log(temp);
    //
    conv.ask(`Stock prices for ${conv.body.queryResult.parameters.comapny_name} today are open ${temp[0]}, high ${temp[1]}, low ${temp[2]}, close ${temp[3]}, volume${temp[4]}`);

    savetoDb(conv.body.queryResult.queryText,conv.responses[0],conv.body.queryResult.intentDetectionConfidence);

});


router.post("/",dialog);




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


module.exports = router;

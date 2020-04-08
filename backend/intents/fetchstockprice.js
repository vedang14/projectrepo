const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
} = require('actions-on-google');

const dialog  = dialogflow({
  debug: false
});
const controller_save = require('../controllers/save_to_db')
const controller_fetchstock = require('../controllers/fetch_stock_data')
exports.fetch_price =  async(conv)=>{
    console.log(conv.body.queryResult.parameters.comapny_name)
    var temp = [];
    temp=  await controller_fetchstock.fetch_stock(conv.body.queryResult.parameters.comapny_name);
     console.log('after function')
     console.log(temp);
    conv.ask(`Stock prices for ${conv.body.queryResult.parameters.comapny_name} today are open ${temp[0]}, high ${temp[1]}, low ${temp[2]}, close ${temp[3]}, volume${temp[4]}`);

    controller_save.savedata(conv.body.queryResult.queryText,conv.responses[0],conv.body.queryResult.intentDetectionConfidence);
}

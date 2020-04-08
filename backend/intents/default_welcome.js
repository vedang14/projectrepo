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

exports.say_this= (conv)=>{
    console.log("hereeeeeeeeeee");
    conv.ask('Hi ! your Stock bot here, how may I assist you');
}

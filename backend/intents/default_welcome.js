const {
  dialogflow,
    BasicCard,
    Image,
    Button,
    BrowseCarousel,
    BrowseCarouselItem,
    Suggestions,
    List,
    LinkOutSuggestion,
    MediaObject,
    Carousel,
} = require('actions-on-google');

const dialog  = dialogflow({
  debug: false
});

exports.say_this= (conv)=>{
    console.log("hereeeeeeeeeee");
    conv.ask('Hi! your Stock bot here, I could assist you in the following way, please select an option ');
  // Create a list
   conv.ask(new List({
     title: 'Stock Bot Services',
     items: {
       // Add the first item to the list
       'Stock Price Analyser': {
         synonyms: [
           'Stock Bot ',
           'Stock Price Checker',
           'Stock Analyser',
         ],
         title: 'Stock Price Analyser',
         description: 'Check the latest Stock Prices with ease',
         image: new Image({
           url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
           alt: 'Stock Bot Analyser',
         }),
       },
       // Add the second item to the list
       'Stock Market Fact Check': {
         synonyms: [
           'Market Fact Check',
           'Market Analyser',
       ],
         title: 'Stock Market Fact Check',
         description: 'Check the latest news updates on Stock Market ',
         image: new Image({
           url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
           alt: 'Market Fact Check',
         }),
       },
       // Add the third item to the list
       'Stock Bot Sentiment Analysis': {
         synonyms: [
           'Sentiment Analyser',
           'Sentiment Check',
         ],
         title: 'Stock Bot Sentiment Analysis',
         description: 'Carry out user-spcific Bot Sentiment Analysis',
         image: new Image({
           url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
           alt: 'Sentiment Analysis',
         }),
       },
     },
   }));

}

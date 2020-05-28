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

  const AssistanceMap = {
    'Stock Price Analyser': {
      title: 'Stock Price Analyser',
      text: 'Check out the Intra-day trading prices on the go',
      image: {
        url: 'https://cdn4.iconfinder.com/data/icons/business-consultant-flat/64/technical-analysis-stock-chart-trend-analytics-512.png',
        accessibilityText: 'Indigo Taco Color',
      },
      display: 'WHITE',
    },
    'Stock Market Fact Check': {
      title: 'Stock Market Fact Check',
      text: 'Check the latest news updates on Stock Market',
      image: {
        url: 'https://cdn1.iconfinder.com/data/icons/iconustration-business-color/96/news-economic-newspaper-chart-stat-512.png',
        accessibilityText: 'Pink Unicorn Color',
      },
      display: 'WHITE',
    },
    'Stock Bot Sentiment Analysis': {
      title: 'Stock Bot Sentiment Analysis',
      text: 'Carry out user-spcific Bot Sentiment Analysis',
      image: {
        url: 'https://cdn4.iconfinder.com/data/icons/artificial-intelligence-65/512/sentiment-analysis-quantify-ai-512.png',
        accessibilityText: 'Blue Grey Coffee Color',
      },
      display: 'WHITE',
    },
  };  
  exports.test_this = (conv,{assistopt}) =>{
    assistopt = conv.arguments.get('OPTION') || assistopt;
    // Present user with the corresponding basic card and end the conversation.
    console.log('this option is selecred *********',assistopt);
    if(assistopt==='Stock Price Analyser')
    conv.ask(`Check out the lastest Intraday Prices, please enter the firm name you'll like to see or select from the following options`,
             new BasicCard(AssistanceMap[assistopt]),
             new Suggestions('Google','Apple','Amazon','Snapchat','Microsoft','No'));
    if(assistopt==='Stock Market Fact Check')
    conv.ask(`Check out the lastest Stock Trading News and Updates`, new BasicCard(AssistanceMap[assistopt]));
    if(assistopt==='Stock Bot Sentiment Analysis'){
    conv.ask(`Carry out user specific Bot Sentiment Analysis`, new BasicCard(AssistanceMap[assistopt]));
    conv.ask(`Please provide a comprehensive feedback on the Bot's performance`);
    }
    if (!conv.screen) {
      conv.ask(AssitanceMap[assistopt].text);
    }
    //conv.ask('Please enter the firm name or select from the following options');
  }

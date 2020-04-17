const {
    dialogflow,
    BasicCard,
    Image,
    Button,
    BrowseCarousel,
    BrowseCarouselItem,
    Suggestions,
    LinkOutSuggestion,
    MediaObject
  } = require('actions-on-google');

  const dialog  = dialogflow({
    debug: false
  });

  const sentiment_controller = require('../controllers/sentiment_process');

  exports.analysis = async(conv) =>{
    console.log('------feedback for the nlp -------',conv.body.queryResult.queryText);
    const ans = await sentiment_controller.process(conv.body.queryResult.queryText);
    conv.ask('Thanks,here is your Result ')
    console.log(ans);
    if(ans<0){
        conv.ask(`Bot is currenty performing at low score of ${ans} `);
        conv.ask(new BasicCard({
            text: `According to the Analysis on Bot's feedback it's performing at a low score of ${ans} , and required further training improvement and model traning for user specific intents. `,
             // Note the two spaces before '\n' required for
                                         // a line break to be rendered in the card.
            subtitle: 'Requires fine tuning for improved performance, please visit the dashboard',
            title: 'Bot Performance is below par',
            buttons: new Button({
              title: 'Go to Dashboard',
              url: 'https://assistant.google.com/',
            }),
            image: new Image({
              url: 'https://cdn3.iconfinder.com/data/icons/emotion-30/32/angry-512.png',
              alt: 'Under Performing',
            }),
            display: 'CROPPED',
          }));
    }
    if(ans==0){
      conv.ask(`Bot is currenty performing at par score of ${ans} `);
        conv.ask(new BasicCard({
            text: `According to the Analysis on Bot's feedback it's performing at a par score of ${ans} , and could be improved with agent training`,
             // Note the two spaces before '\n' required for
                                         // a line break to be rendered in the card.
            subtitle: 'Performance is satisfactory, to optimize please go to dashboard results',
            title: 'Bot Performance is Satisfactory',
            buttons: new Button({
              title: 'Go to Dashboard',
              url: 'https://assistant.google.com/',
            }),
            image: new Image({
              url: 'https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-119_smiley_neutral-512.png',
              alt: 'Par Performing',
            }),
            display: 'CROPPED',
          }));
    }
    if(ans>0){
      conv.ask(`Bot is currenty performing at good score of ${ans} `);
        conv.ask(new BasicCard({
            text: `According to the Analysis on Bot's feedback it's performing at a high score of ${ans} , for user specific queries`,
             // Note the two spaces before '\n' required for
                                         // a line break to be rendered in the card.
            subtitle: 'Performance is Good, to optimize please go to dashboard results',
            title: 'Bot Performance is Good',
            buttons: new Button({
              title: 'Go to Dashboard',
              url: 'https://assistant.google.com/',
            }),
            image: new Image({
              url: 'https://cdn1.iconfinder.com/data/icons/smashicons-emoticons-cartoony-vol-4/46/216_-_Happy_emoticon_emoji_face-512.png',
              alt: 'Performing Good',
            }),
            display: 'CROPPED',
          }));
    }
  }

  //positive : https://cdn1.iconfinder.com/data/icons/smashicons-emoticons-cartoony-vol-4/46/216_-_Happy_emoticon_emoji_face-512.png
  //neutral : https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-119_smiley_neutral-512.png
  //negative : https://cdn3.iconfinder.com/data/icons/emotion-30/32/angry-512.png 
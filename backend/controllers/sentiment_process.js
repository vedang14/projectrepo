const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

exports.process = async function sentiment_process(user_feed){
    const review = user_feed 
    //this is to form standard lexicon eg: you're = you are etc.
    const lexedReview = aposToLexForm(review); 
    //maintaining uniform lower case for uniformity   
    const casedReview = lexedReview.toLowerCase();
    //removing non-alphabet and special case char
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

    //tokenizing the sentence
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);    
    
    //spell checking for tokenize words
    tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
      });
    
    //removing stopping words
    const filteredReview = SW.removeStopwords(tokenizedReview);

    //stemming - word normalization
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(filteredReview);

    return analysis;
} 
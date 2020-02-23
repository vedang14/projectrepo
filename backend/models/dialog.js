const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Dialogschema = new Schema({
    query:{
      type: String,
      required : true
    },
    queryResponse:{
      type: String,
      required : true
    },
    intentconf :{
        type : Number,
        required : true
    },
},{ timestamps : true
});

const Transcripts = mongoose.model('transcripts', Dialogschema);
module.exports = Transcripts;

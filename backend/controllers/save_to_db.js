const Dialogslog = require('../models/dialog');

exports.savedata = function savetoDb(query,queryResult,intentDetectionConfidence){
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

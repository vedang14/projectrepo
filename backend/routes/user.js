const express = require('express');
const router = express.Router();

const Transcripts = require('../models/dialog');

router.get('/getmessage',function(req,res){
  let user = Transcripts.find({}, function(err,msg){
    if(err){
      console.log(err);
    res.json({success:false});
  }
  else{
    res.json(msg);
  }
});
});

router.post('/send',function(req,res){
  const newmsg = new User();
  newmsg.message = req.body.message;

  newmsg.save(function(err){
    if(err){
      console.log(err);
      res.json({success:false});
    }
    else {
      res.json({success:true});
    }
  });
});




module.exports = router;

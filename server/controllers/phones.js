// Load required packages
var phones = require('../models/phones');
var phoneImages = require('../models/phones-images');

// Create endpoint /api/phones for GET all
exports.getPhones= function(req, res) {
  // Use the Phones model to find all phones
    
  phones.find({}, function(err, phones) {
    
    if (err) res.send(err);
	
    res.json(phones);
	      
  });
};

// Create endpoint /api/phones/:id for GET
exports.getPhone = function(req, res) {
  // Use the Phones model to find a specific phone
  phones.findById(req.params.id, function(err, phone) {
    if (err) res.send(err);

		phoneImages.find({id_phone:phone.id}, function(err, images) {
			if (err) res.send(err);
			
			phone.images=images;
			res.json(phone);
			  
		  })
  });
};

// Create endpoint /api/phones for POST
exports.postPhone = function(req, res) {
    // Set the Phone properties that came from the POST data
    var phone = {};
  
    if(req.body.name!=null) phone.name = req.body.name;
    if(req.body.snippet!=null) phone.snippet = req.body.snippet;
    if(req.body.description!=null) phone.description = req.body.description;
    if(req.body.imageUrl!=null) phone.image_url = req.body.imageUrl;
    if(req.body.batteryStandbyTime!=null) phone.batteryStandbyTime = req.body.batteryStandbyTime;
    if(req.body.batteryTalkTime!=null) phone.battery_talk_time = req.body.batteryTalkTime;
    if(req.body.batteryTime!=null) phone.batteryTime = req.body.batteryTime;
    if(req.body.cameraFlash!=null) phone.cameraFlash = req.body.cameraFlash;  
    if(req.body.cameraVideo!=null) phone.cameraVideo = req.body.cameraVideo;
    if(req.body.cameraResolution!=null) phone.cameraResolution = req.body.cameraResolution;
    if(req.body.stock!=null) phone.stock = req.body.stock;
    
  // Save the campain and check for errors
  phones.save(req.body,function(err,data) {
    if (err)
      res.send(err);

    res.json({ success:true, data: data });
  });
};

// Create endpoint /api/phones for PUT
exports.putPhone = function(req, res) {
    // Set the Phone properties that came from the PUT data
    var phone = {};
    
    if(req.body.name!=null) phone.name = req.body.name;
    if(req.body.snippet!=null) phone.snippet = req.body.snippet;
    if(req.body.description!=null) phone.description = req.body.description;
    if(req.body.imageUrl!=null) phone.image_url = req.body.imageUrl;
    if(req.body.batteryStandbyTime!=null) phone.batteryStandbyTime = req.body.batteryStandbyTime;
    if(req.body.batteryTalkTime!=null) phone.battery_talk_time = req.body.batteryTalkTime;
    if(req.body.batteryTime!=null) phone.batteryTime = req.body.batteryTime;
    if(req.body.cameraFlash!=null) phone.cameraFlash = req.body.cameraFlash;  
    if(req.body.cameraVideo!=null) phone.cameraVideo = req.body.cameraVideo;
    if(req.body.cameraResolution!=null) phone.cameraResolution = req.body.cameraResolution;
    if(req.body.stock!=null) phone.stock = req.body.stock;
    
  Phones.update(phone, function(err, data) {
    if (err)
      res.send(err);

    res.json({ success:true, data: phone });
  });
};

// Create endpoint /api/phones/:id for DELETE
exports.deletePhone = function(req, res) {
  phones.remove({ id: req.params.id}, function(err) {
    if (err)
      res.send(err);

    res.json({ success:true,data:{id_phone:req.params.id} });
  });
};
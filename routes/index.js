const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const Jimp = require('jimp');


let imageName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const fn = file.originalname;
    imageName = fn;
    cb(null, fn)
  }
});


const upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/addimage', upload.single('inputimage'), function (req, res, next) {
  res.render('edit',{img: req.file.filename})
})

router.get('/image/grayscale',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .grayscale()
      .write(`./public/images/gray-${imageName}`)
    res.json({name: `gray-${imageName}`})
    imageName = `gray-${imageName}`;
  });
});

router.get('/image/rotate',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .rotate(90)
      .write(`./public/images/rotate-${imageName}`)
    res.json({name: `rotate-${imageName}`})
    imageName = `rotate-${imageName}`;
  });
});

router.get('/image/invert',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .invert()
      .write(`./public/images/invert-${imageName}`)
    res.json({name: `invert-${imageName}`})
    imageName = `invert-${imageName}`;
  });
});

router.get('/image/flip',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .flip(true,false)
      .write(`./public/images/flip-${imageName}`)
    res.json({name: `flip-${imageName}`})
    imageName = `flip-${imageName}`;
  });
});

router.get('/image/fade',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .fade(.9)
      .write(`./public/images/fade-${imageName}`)
    res.json({name: `fade-${imageName}`});
    imageName = `fade-${imageName}`;
  });
});

router.get('/image/contrast',function(req,res){
  Jimp.read(`./public/images/${imageName}`,function(err, currimage){
    if (err) throw err;
    currimage
      .contrast(1)
      .write(`./public/images/contrast-${imageName}`)
    res.json({name: `contrast-${imageName}`});
    imageName = `contrast-${imageName}`;
  });
});


module.exports = router;

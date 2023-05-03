// routes/api/exceptions.js

const express = require('express')
const router = express.Router()
const { Exception, validate } = require('../models/exception')
const { format } = require('date-fns')
//codes for upload 
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const csvtojson = require('csvtojson')

// Code for multer 4/17
const DIR = './upload';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv" || file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/msword") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only csv format allowed!'));
    }
  }
});
// end for multer

// code for new 4/17 for upload
router.post('/', upload.single('name'), (req, res, next) => {
  //new -- define file path
  importFile('./upload' + req.file.filename);
  function importFile(filePath) {
    //  Read Excel File to Json Data
    var arrayToInsert = [];
    csvtojson().fromFile(filePath).then(source => {
      // Fetching the all data from each row
      for (var i = 0; i < source.length; i++) {
        console.log(source[i]["name"])
        var singleRow = {
          _id: new mongoose.Types.ObjectId(), //-- need to be added to my database
          providerID: source[i]["providerID"],
          provider: source[i]["provider"],
          startDate: source[i]["startDate"],
          endDate: source[i]["endDate"],
          amStartTime: source[i]["amStartTime"],
          amEndTime: source[i]["amEndTime"],
          pmStartTime: source[i]["pmStartTime"],
          pmEndTime: source[i]["pmEndTime"],
          exceptionMon: source[i]["exceptionMon"],
          exceptionTues: source[i]["exceptionTues"],
          exceptionWed: source[i]["exceptionWed"],
          exceptionThurs: source[i]["exceptionThurs"],
          exceptionFri: source[i]["exceptionFri"],
          addedDate: source[i]["addedDate"],
          // lastUpdated: source[i]["lastUpdated"],
          lastUpdated: format(new Date(), 'yyyy-MM-dd'),

        };
        console.log(singleRow)
        arrayToInsert.push(singleRow);
      }
      //inserting into the table roles
      Exception.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log("File imported successfully.");
          res.redirect('/')
        }
      });
    });
  }
  //end of new

})

// @route GET api/exceptions/test
// @description tests exceptions route
// @access Public
router.get('/test', (req, res) => res.send('exception route testing!'))

// @route GET api/exceptions
// @description Get all exceptions
// @access Public
router.get('/', (req, res) => {
  Exception.find()
    .then((exceptions) => res.json(exceptions))
    .catch((err) =>
      res.status(404).json({ noexceptionsfound: 'No Exceptions found' }),
    )
})

// @route GET api/exceptions/:id
// @description Get single exception by id
// @access Public
router.get('/:id', (req, res) => {
  Exception.findById(req.params.id)
    .then((exception) => res.json(exception))
    .catch((err) => res.status(404).json({ norecordfound: 'No Exception found' }))
})

// @route GET api/exceptions
// @description add/save exception
// @access Public
router.post('/create', (req, res) => {
  Exception.create(req.body)
    .then((exception) => res.json({ msg: 'Exception added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this exception' }),
    )
})

// @route GET api/exceptions/:id
// @description Update exception
// @access Public
router.put('/:id', (req, res) => {
  Exception.findByIdAndUpdate(req.params.id, req.body)
    .then((exception) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/exceptions/:id
// @description Delete exception by id
// @access Public
router.delete('/:id', (req, res) => {
  Exception.findByIdAndRemove(req.params.id, req.body)
    .then((exception) => res.json({ mgs: 'Exception entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a exception' }))
})

module.exports = router

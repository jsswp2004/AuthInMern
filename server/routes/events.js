const express = require('express')
const router = express.Router()
const { format } = require('date-fns')
const { Event, validate } = require('../models/event')
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
    if (file.mimetype == "text/csv" || file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/msword") {
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
  if (req.file) {
    importFile('./upload/' + req.file.filename);
    function importFile(filePath) {
      //  Read Excel File to Json Data
      var arrayToInsert = [];
      csvtojson().fromFile(filePath).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
          console.log(source[i]["name"])
          var singleRow = {
            _id: new mongoose.Types.ObjectId(), //-- need to be added to my database
            name: source[i]["name"],
            // addedDate: source[i]["addedDate"],
            addedDate: format(new Date(), 'yyyy-MM-dd'),
            // lastUpdated: source[i]["lastUpdated"],
            lastUpdated: format(new Date(), 'yyyy-MM-dd'),
          };
          // console.log(singleRow)
          arrayToInsert.push(singleRow);
        }
        //inserting into the table roles
        Event.insertMany(arrayToInsert, (err, result) => {
          if (err) console.log(err);
          if (result) {
            console.log("File imported successfully.");
            // res.redirect('/')
          }
        });
      });
    }
  }
  else {
    // router.post('/', (req, res) => {
    Event.create(req.body)
      .then((event) => res.json({ msg: 'Event added successfully' }))
      .catch((err) =>
        res.status(400).json({ error: 'Unable to add this event' }),
      )
    // })
  }

})

//end for new 
// @route GET api/events/test
// @description tests events route
// @access Public
router.get('/test', (req, res) => res.send('event route testing!'))

// @route GET api/events
// @description Get all events
// @access Public
router.get('/', (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    // .limit('10')
    .catch((err) =>
      res.status(404).json({ noeventsfound: 'No Events found' }),
    )
  // .shellBatchSize = 200
})

// @route GET api/events/:id
// @description Get single event by id
// @access Public
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(404).json({ norecordfound: 'No Event found' }))
})

// @route GET api/events/:id
// @description Update event
// @access Public
router.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then((event) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/events/:id
// @description Delete event by id
// @access Public
router.delete('/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id, req.body)
    .then((event) => res.json({ mgs: 'Event entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a event' }))
})

module.exports = router

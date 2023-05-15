const express = require('express')
const router = express.Router()
const { Schedule, validate } = require('../models/schedule')
const { format } = require('date-fns')
//codes for upload 
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const csvtojson = require('csvtojson')

// Code for multer 4/17
const DIR = './upload/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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
          // console.log(source[i]["name"])
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
            scheduledMon: source[i]["scheduledMon"],
            scheduledTues: source[i]["scheduledTues"],
            scheduledWed: source[i]["scheduledWed"],
            scheduledThurs: source[i]["scheduledThurs"], // == 'NULL' ? "" : source[i]["scheduledThurs"],
            scheduledFri: source[i]["scheduledFri"],
            addedDate: format(new Date(), 'yyyy-MM-dd'),  //source[i]["addedDate"],
            // lastUpdated: source[i]["lastUpdated"],
            lastUpdated: format(new Date(), 'yyyy-MM-dd'),

          };
          // console.log(singleRow.scheduledThurs)
          var rawValue = {
            _id: singleRow._id,
            providerID: singleRow.providerID,
            provider: singleRow.provider,
            startDate: singleRow.startDate,
            endDate: singleRow.endDate,
            amStartTime: singleRow.amStartTime,
            amEndTime: singleRow.amEndTime,
            pmStartTime: singleRow.pmStartTime,
            pmEndTime: singleRow.pmEndTime,
            scheduledMon: singleRow.scheduledMon,
            scheduledTues: singleRow.scheduledTues,
            scheduledWed: singleRow.scheduledWed,
            scheduledThurs: singleRow.scheduledThurs, //!= '' ? singleRow.scheduledThurs : "",
            scheduledFri: singleRow.scheduledFri,
            addedDate: singleRow.addedDate,
            // lastUpdated: singleRow.lastUpdated,
            lastUpdated: singleRow.lastUpdated,
          }
          arrayToInsert.push(singleRow);
          // arrayToInsert.push(rawValue);
          // console.log(rawValue)
          console.log(singleRow)


        }
        //inserting into the table roles
        Schedule.insertMany(arrayToInsert, (err, result) => {
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
    Schedule.create(req.body)
      .then((schedule) => res.json({ msg: 'Schedule added successfully' }))
      .catch((err) =>
        res.status(400).json({ error: 'Unable to add this schedule' }),
      )
  }

})
// @route GET api/schedules/test
// @description tests schedules route
// @access Public
router.get('/test', (req, res) => res.send('schedule route testing!'))

// @route GET api/schedules
// @description Get all schedules
// @access Public
router.get('/', (req, res) => {
  Schedule.find()
    .then((schedules) => res.json(schedules))
    .catch((err) =>
      res.status(404).json({ noschedulesfound: 'No Schedules found' }),
    )
})

// @route GET api/schedules/:id
// @description Get single schedule by id
// @access Public
router.get('/:id', (req, res) => {
  Schedule.findById(req.params.id)
    .then((schedule) => res.json(schedule))
    .catch((err) => res.status(404).json({ norecordfound: 'No Schedule found' }))
})

// @route GET api/schedules
// @description add/save schedule
// @access Public
// router.post('/', (req, res) => {
//   Schedule.create(req.body)
//     .then((schedule) => res.json({ msg: 'Schedule added successfully' }))
//     .catch((err) =>
//       res.status(400).json({ error: 'Unable to add this schedule' }),
//     )
// })

// @route GET api/schedules/:id
// @description Update schedule
// @access Public
router.put('/:id', (req, res) => {
  Schedule.findByIdAndUpdate(req.params.id, req.body)
    .then((schedule) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/schedules/:id
// @description Delete schedule by id
// @access Public
router.delete('/:id', (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, req.body)
    .then((schedule) => res.json({ mgs: 'Schedule entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a schedule' }))
})

module.exports = router

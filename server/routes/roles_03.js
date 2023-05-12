// routes/api/roles.js

const express = require('express')
const router = express.Router()
// new 4/17 for upload
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const csvtojson = require('csvtojson')
// end of new
const { Role, validate } = require('../models/role');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');
// const csvFilePath = `${__dirname}/ + req.file.filename`;
// Code for multer 4/17
const DIR = './upload/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "text/csv" || file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/msword") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only csv format allowed!'));
    }
  }
});
// end for multer
console.log('Test', upload)

// code for new 4/17
router.post('/', upload.single('name'), (req, res, next) => {

  //new -- define file path
  // try {
  // if (req.file === undefined) {
  //   // return res.status(400).send({ message: "Please upload a CSV file!" });
  //   Role.create(req.body)
  //     .then((role) => res.json({ msg: 'Role added successfully' }))
  //     .catch((err) =>
  //       res.status(400).json({ error: 'Unable to add this role' }),
  //     )
  // }


  importFile('./upload/' + req.file.filename); //'1c3e3cd6-63f9-4d4b-95b3-ec8a4eb8391e-role_list_report.csv');

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
          addedDate: source[i]["addedDate"],
          lastUpdated: source[i]["lastUpdated"],
        };
        console.log(singleRow)
        arrayToInsert.push(singleRow);
      }
      //inserting into the table roles
      // if (arrayToInsert.length == 0) {
      //   console.log("No data found in file.");
      //   return;
      // }
      // if (source.length === 0) {
      //   Role.create(req.body)
      //     .then((role) => res.json({ msg: 'Role added successfully' }))
      //     .catch((err) =>
      //       res.status(400).json({ error: 'Unable to add this role' }),
      //     )
      // } else {
      //   Role.insertMany(arrayToInsert, (err, result) => {
      //     if (err) console.log(err);
      //     if (result) {
      //       console.log("File imported successfully.");
      //       res.redirect('/')
      //     }
      //   });
      // }

      // console.log(source.length)
      Role.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log("File imported successfully.");
          res.redirect('/')
        }
      });
    });
  }
  // importFile('./upload/' + req.file.filename); //'1c3e3cd6-63f9-4d4b-95b3-ec8a4eb8391e-role_list_report.csv');
  // importFile(req.file.filename);
  // res.status(200).send({
  //   message: "Uploaded the file successfully: " + req.file.originalname,
  // });



  // }
  // }
  // catch (err) {
  //   console.log(err);
  //   return res.status(400).send({ message: err.message });
  // }
  // // importFile('./upload/' + req.file.filename); //'1c3e3cd6-63f9-4d4b-95b3-ec8a4eb8391e-role_list_report.csv');

  // function importFile(filePath) {
  //   //  Read Excel File to Json Data
  //   var arrayToInsert = [];
  //   csvtojson().fromFile(filePath).then(source => {
  //     // Fetching the all data from each row
  //     for (var i = 0; i < source.length; i++) {
  //       console.log(source[i]["name"])
  //       var singleRow = {
  //         _id: new mongoose.Types.ObjectId(), //-- need to be added to my database
  //         name: source[i]["name"],
  //         addedDate: source[i]["addedDate"],
  //         lastUpdated: source[i]["lastUpdated"],
  //       };
  //       console.log(singleRow)
  //       arrayToInsert.push(singleRow);
  //     }
  //     //inserting into the table roles
  //     // if (arrayToInsert.length == 0) {
  //     //   console.log("No data found in file.");
  //     //   return;
  //     // }
  //     // if (source.length === 0) {
  //     //   Role.create(req.body)
  //     //     .then((role) => res.json({ msg: 'Role added successfully' }))
  //     //     .catch((err) =>
  //     //       res.status(400).json({ error: 'Unable to add this role' }),
  //     //     )
  //     // } else {
  //     //   Role.insertMany(arrayToInsert, (err, result) => {
  //     //     if (err) console.log(err);
  //     //     if (result) {
  //     //       console.log("File imported successfully.");
  //     //       res.redirect('/')
  //     //     }
  //     //   });
  //     // }

  //     // console.log(source.length)
  //     Role.insertMany(arrayToInsert, (err, result) => {
  //       if (err) console.log(err);
  //       if (result) {
  //         console.log("File imported successfully.");
  //         res.redirect('/')
  //       }
  //     });



  //   });
  // }
  //end of new

})

//end for new 

// @route GET api/roles
// @description add/save role
// @access Public
router.post('/', (req, res) => {
  Role.create(req.body)
    .then((role) => res.json({ msg: 'Role added successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to add this role' }),
    )
})

// @route GET api/roles/test
// @description tests roles route
// @access Public
// router.get('/test', (req, res) => res.send('role route testing!'))

// @route GET api/roles
// @description Get all roles
// @access Public
router.get('/', (req, res) => {
  Role.find()
    .then((roles) => res.json(roles))
    .catch((err) =>
      res.status(404).json({ norolesfound: 'No Roles found' }),
    )
})

// @route GET api/roles/:id
// @description Get single role by id
// @access Public
router.get('/:id', (req, res) => {
  Role.findById(req.params.id)
    .then((role) => res.json(role))
    .catch((err) => res.status(404).json({ norecordfound: 'No Role found' }))
})


// @route GET api/roles/:id
// @description Update role
// @access Public
router.put('/:id', (req, res) => {
  Role.findByIdAndUpdate(req.params.id, req.body)
    .then((role) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' }),
    )
})

// @route GET api/roles/:id
// @description Delete role by id
// @access Public
router.delete('/:id', (req, res) => {
  Role.findByIdAndRemove(req.params.id, req.body)
    .then((role) => res.json({ mgs: 'Role entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a role' }))
})


module.exports = router
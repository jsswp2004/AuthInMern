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
      return cb(new Error('Please use allowed formats (csv, xls, xlsx)!'));
    }
  }
});
// end for multer

// code for new 4/17
router.post('/upload', upload.single('name'), (req, res, next) => {
  //new -- define file path
  // importFile('./upload/' + req.file.filename); //'1c3e3cd6-63f9-4d4b-95b3-ec8a4eb8391e-role_list_report.csv');
  importFile("/upload/" + req.file.originalname);
  // importFile(csvFilePath);
  // importFile(DIR);

  // importFile(req.file.filename);//${__dirname}
  // importFile(`${__dirname} + req.file.filename`);


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
      Role.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log("File imported successfully.");
          res.redirect('/')
        }
      });
    });
  }
  // end of new
  // Role.create(req.body)
  //   .then((role) => res.json({ msg: 'Role added successfully' }))
  //   .catch((err) =>
  //     res.status(400).json({ error: 'Unable to add this role' }),
  //   )

})

//end for new 
//ROUTE DEFINE
// router.post('/', async function (req, res) {
//   try {
//     // IN REQ.FILES.”YOUR_FILE_NAME” WILL BE PRESENT
//     const file = req.files;
//     const bodyData = req.body;
//     // console.log(file);
//     // console.log(bodyData);
//     res.status(200).send({
//       message: 'FILE RECEIVED!',
//     });
//   } catch (error) {
//     res.send('ERROR');
//   }
// });
// const json2csv = require('json2csv').parse;
// const template = require('./uploadRole.js');

// exports.get = function (req, res) {
//   var fields = [
//     'name.firstName',
//     'name.lastName',
//     'biography',
//     'twitter',
//     'facebook',
//     'linkedin'
//   ];
//   var csv = json2csv({ data: '', fields: fields });
//   res.set("Content-Disposition", "attachment;filename=authors.csv");
//   res.set("Content-Type", "application/octet-stream");
//   res.send(csv);
// };

// router.get('/template', template.get);
// router.post('/', upload.post);

// @route GET api/roles/test
// @description tests roles route
// @access Public
router.get('/test', (req, res) => res.send('role route testing!'))

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

// router.get('/', function (req, res) {
//   res.sendFile(__dirname + 'uploadRoleModal.js');
// });

// router.get('/', function (req, res) {
//   res.sendFile(__dirname + '/uploadRole');
// });

module.exports = router

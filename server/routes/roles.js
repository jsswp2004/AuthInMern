// routes/api/roles.js

const express = require('express')
const router = express.Router()
// new 4/17
const multer = require('multer');
const mongoose = require('mongoose');
// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

// end of new
const { Role, validate } = require('../models/role');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');

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

// code for new 4/17
router.post('/', upload.single('name'), (req, res, next) => {

  // router.post('/uploadRole', upload.single('name'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const role = new Role({
    _id: new mongoose.Types.ObjectId(), //-- need to be added to my database
    name: req.body.name,
    addedDate: req.body.addedDate,
    lastUpdated: req.body.lastUpdated,
    // profileRole: url + '/uploads/' + req.file.filename
  });
  console.log(role)
  role.save().then(result => {
    res.status(201).json({
      message: "Role registered successfully!",
      userCreated: {
        _id: result._id,
        // profileImg: result.profileImg
        name: result.name,
        addedDate: result.addedDate,
        lastUpdated: result.lastUpdated,
      }
      // roleCreated: {
      //   result
      // }
    })
    console.log('Role registered successfully!')
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })

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

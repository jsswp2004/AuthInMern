// routes/api/roles.js

const express = require('express')
const router = express.Router()
const { Role, validate } = require('../models/role');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');


//ROUTE DEFINE
router.post('/', async function (req, res) {
  try {
    // IN REQ.FILES.”YOUR_FILE_NAME” WILL BE PRESENT
    const file = req.files;
    const bodyData = req.body;
    // console.log(file);
    // console.log(bodyData);
    res.status(200).send({
      message: 'FILE RECEIVED!',
    });
  } catch (error) {
    res.send('ERROR');
  }
});
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

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/uploadRole');
});

module.exports = router

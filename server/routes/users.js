const router = require('express').Router()
const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error)
      return res.status(400).send({ message: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if (user)
      return res
        .status(409)
        .send({ message: 'User with given email already Exist!' })

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    await new User({ ...req.body, password: hashPassword }).save()
    res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
  }
})

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: 'No Users found' }))
})

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: 'User entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a user' }))
})

module.exports = router

const router = require('express').Router()
const { Account, validate } = require('../models/account')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const account = await Account.findOne({ email: req.body.email })
        if (account)
            return res
                .status(409)
                .send({ message: 'Account with given email already Exist!' })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new Account({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: 'Account created successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
    Account.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(404).json({ nousersfound: 'No Users found' }))
})

// @route GET api/users/:id
// @description Get single account by id
// @access Public
router.get('/:id', (req, res) => {
    Account.findById(req.params.id)
        .then(account => res.json(account))
        .catch(err => res.status(404).json({ nouserfound: 'No Account found' }));
});

// @route GET api/users/:id
// @description Delete account by id
// @access Public
router.delete('/:id', (req, res) => {
    Account.findByIdAndRemove(req.params.id, req.body)
        .then((account) => res.json({ mgs: 'Account entry deleted successfully' }))
        .catch((err) => res.status(404).json({ error: 'No such a account' }))
})

// @route GET api/users/:id
// @description Update account
// @access Public
router.put('/:id', (req, res) => {
    Account.findByIdAndUpdate(req.params.id, req.body)
        .then(account => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

module.exports = router

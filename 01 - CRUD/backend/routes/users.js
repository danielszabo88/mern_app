//Association backend endpoints and HTTP requests with mongoose methods

const router = require('express').Router()
let User = require('../model/userModel')
  
router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.json('Error: '+err))
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.json('Error: '+err))
})

router.post('/', (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    newUser.save()
    .then(users => res.json("User Added"))
    .catch(err => res.json('Error: '+err))
})

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted'))
    .catch(err => res.json('Error: '+err))
})

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(() => res.json('User Updated'))
    .catch(err => res.json('Error: '+err))
})

module.exports = router
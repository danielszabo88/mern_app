const router = require('express').Router()
let Fruit = require('../model/fruitModel')

router.get('/', (req, res) => {
    Fruit.find()
    .then(fruits => res.json(fruits))
    .catch(err => res.status(400).json('Error: '+err))
})

router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id)
    .then(fruits => res.json(fruits))
    .catch(err => res.json('Error: +err'))
})

router.post('/', (req, res) => {
    const newFruit = new Fruit({
        name: req.body.name,
        amount: req.body.amount,
        info: req.body.info
    })

    newFruit.save()
    .then(fruits => res.json("New Fruit Added"))
    .catch(err => res.status(400).json('Error: '+err))
})

router.delete('/:id', (req, res) => {
    Fruit.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fruit deleted'))
    .catch(err => res.status(400).json('Error: '+err))
})

router.put('/:id', (req, res) => {
    Fruit.findByIdAndUpdate(req.params.id,
        {$set: req.body})
    .then(() => res.json('Fruit updated'))
    .catch(err => res.status(400).json('Error: '+err))
})

module.exports = router
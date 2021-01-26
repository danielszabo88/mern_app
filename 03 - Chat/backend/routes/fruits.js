const router = require("express").Router();
const Fruit = require("../model/fruitModel");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Fruit.find()
    .then((fruits) => res.json(fruits))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  Fruit.findById(req.params.id)
    .then((fruits) => res.json(fruits))
    .catch((err) => res.json("Error: +err"));
});

router.post("/", auth, (req, res) => {
  const newFruit = new Fruit({
    name: req.body.name,
    amount: req.body.amount,
    info: req.body.info,
    addedBy: req.body.addedBy,
  });

  newFruit
    .save()
    .then((fruits) => res.json("New Fruit Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", auth, (req, res) => {
  Fruit.findByIdAndDelete(req.params.id)
    .then(() => res.json("Fruit deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id", auth, (req, res) => {
  Fruit.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => res.json("Fruit updated"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const express = require("express");
const { now } = require("mongoose");
const todoModal = require("../modals/todoModal");
const router = express.Router();




router.get("/getall", async (req, res) => {
  const todos = await todoModal.find({ user: req.user });
  res.status(200).json({
    status: "sucess",
    todos
  })
});

router.post("/addtodo", async (req, res) => {
  const activity = req.body.activity
  if (activity.trim().length === 0) {
    return (
      res.status(500).json({
        status: "failed"
      })
    )
  }
  const newact = todoModal.create({ activity, user: req.user });
  res.status(200).json({
    status: "sucess",
    newact
  })

})

router.put("/start", async (req, res) => {
  let data =  await todoModal.updateOne({ _id: req.body.id }, { timetaken : req.body.timetaken});
  res.status(200).json({
    status: "sucess",
    data : data,
  })
});

module.exports = router;
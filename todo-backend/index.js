// All recuirments
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Anand:Anand@cluster0.wvgskol.mongodb.net/Todo-App?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  });
const PORT = 8080 || process.env.PORT
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
var jwt = require('jsonwebtoken');
const secret = "TODOAPP";
const userModal = require("./modals/userModal");



// calling App
const app = express();
app.use(express.json());
app.use(cors());

// middelwares and api
app.use("/todo", async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, secret, async function (err, decoded) {
      if (err) {
        res.status(500).json({
          status: "failed",
          message: "Not Authenticated"
        })
      }
      const user = await userModal.findOne({ _id: decoded.data });
      req.user = user._id;
      next();
    });
  } else {
    return res.status(500).json({
      status: "failed",
      message: "Invalid token"
    })
  }
});

app.use("/", userRoutes);
app.use("/todo", todoRoutes);


// listing on port
app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
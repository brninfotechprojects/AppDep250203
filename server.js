const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/profilePics", express.static("profilePics"));
app.use(express.static(path.join(__dirname, "./client/build")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "profilePics");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let userArr = await user.find().and([{ email: req.body.email }]);
  if (userArr.length > 0) {
    if (userArr[0].password === req.body.password) {
      let dataToSend = {
        firstName: userArr[0].firstName,
        lastName: userArr[0].lastName,
        age: userArr[0].age,
        email: userArr[0].email,
        mobileNo: userArr[0].mobileNo,
        profilePic: userArr[0].profilePic,
      };
      res.json({
        status: "Success",
        msg: "credintials are correct",
        data: dataToSend,
      });
    } else {
      res.json({ status: "Failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "user doesn't exist" });
  }
});

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    let newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      profilePic: req.file.path,
    });

    console.log("Successfully inserting the data into database");
    await user.insertMany([newUser]);
    res.json({ status: "success", msg: "Account is created Successfully" });
  } catch (err) {
    console.log("Unable to inserting the data into database");
    res.json({ status: "failure", msg: "Unable to  create account" });
  }
});

// app.get("*", (req, res) => {
//   //res.sendFile("./client/build/index.html");
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(3333, () => {
  console.log("Listening to port 4567");
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNo: Number,
  profilePic: String,
});

let user = new mongoose.model("users", userSchema, "2503user");

// let insertDataintoDB = async ()=>{
// }

let connectedToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Navitha:Navitha2324@cluster0.mxvyppw.mongodb.net/BatchMern2503?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Successfully connected to MDB");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};
connectedToMDB();

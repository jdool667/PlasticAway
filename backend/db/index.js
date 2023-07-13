const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://jackdarley:${process.env.MONGO_PASS}@cluster1.flx6zu9.mongodb.net/PlasticAway`
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection failed: ", err.message || err));

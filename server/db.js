const mongoose = require("mongoose");
// process.env.MONGO_ENV
const mongodb_URL =
  "mongodb+srv://muhammadumair:EyuRXVZJoqPZve1g@empcluster.euvcxeu.mongodb.net/theEMP?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

const connectToMongoDB = () => {
  mongoose.connect(mongodb_URL).then(
    () => {
      console.log("Connected to MongoDB successfully");
    },
    (err) => {
      console.log("Failed to connect to MongoDB");
    }
  );
};

module.exports = connectToMongoDB;

// EMP CLUSTER URL
// mongodb+srv://muhammadumair:<password>@empcluster.euvcxeu.mongodb.net/?retryWrites=true&w=majority

// UMAIR PERSONAL URL TO MONGODB

//  "mongodb+srv://dbUser:ARTwX2IjlfTeoyCW@cluster0.h2io9.mongodb.net/theBooks?retryWrites=true&w=majority";

// "mongodb+srv://muhammadumair:EyuRXVZJoqPZve1g@empcluster.euvcxeu.mongodb.net/theEMP?retryWrites=true&w=majority";

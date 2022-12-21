// const mongoose = require("mongoose");

// module.exports = () => {
// 	const connectionParams = {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	};
// 	try {
// 		mongoose.connect(process.env.DB, connectionParams);
// 		console.log("Connected to database successfully");
// 	} catch (error) {
// 		console.log(error);
// 		console.log("Could not connect database!");
// 	}
// };

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
	connectToServer: function (callback) {
		client.connect().then(() => {
			_db = client.db("employees");
			console.log("Successfully connected to MongoDB.");
			return callback(err);
		});
    // client.connect(function (err, db) {
      // Verify we got a good "db" object
    //   if (db)
    //   {
    //     _db = db.db("employees");
    //     console.log("Successfully connected to MongoDB."); 
    //   }
    //   return callback(err);
    //      });
  },
 
  getDb: function () {
    return _db;
  },
};

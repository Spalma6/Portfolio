import config from "./config/config.js";
import app from "./server/express.js";
import seedAdministrator from "./server/seed.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
if (!config.mongoUri) {
  throw new Error("MONGODB_URI must be configured.");
}
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(async () => {
    await seedAdministrator(config);
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Unable to start the server.", error);
    process.exitCode = 1;
  });
mongoose.connection.on("error", () => {
  throw new Error("Unable to connect to the configured MongoDB database.");
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

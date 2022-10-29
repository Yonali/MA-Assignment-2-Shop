const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = require("./app");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// DATABASE=mongodb+srv://pasindu:pasindu123@pasindu.5io5y57.mongodb.net/?retryWrites=true&w=majority
const URL =
  "mongodb+srv://Admin:hash99lahi20@hotelsobana.z6log.mongodb.net/project_managment?retryWrites=true&w=majority";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const express = require("express");


const dotenv = require("dotenv").config();


const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"))
app.use("/api/service", require("./routes/serviceRoutes"))


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
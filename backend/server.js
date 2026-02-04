const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth"));
//app.use("/api/register", require("./routes/auth"));
app.post('/api/register', (req, res) => {
  res.json({ message: "Success!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));

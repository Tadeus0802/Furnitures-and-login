const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000;
const login = require("./routes/login");

app.use(express.json());
app.use(cors());

app.use("/", login);

app.listen(port,()=>{
    console.log(`Your server is working on http://localhost:${port}`);
})
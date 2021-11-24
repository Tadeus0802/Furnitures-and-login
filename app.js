const express = require("express");
const app = express();
const port = 3000;
const login = require("./routes/login");

app.use(express.json());

app.use("/",(req,res)=>{
    res.send("Working!");
})

app.use("/", login);

app.listen(port,()=>{
    console.log(`Your server is working on https://localhost:${port}`);
})
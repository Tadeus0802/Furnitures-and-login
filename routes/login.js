const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const database = require("../connection/connect.json");
const crypto = require('crypto');

router.post("/register", async (req,res)=>{
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let secretPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const conect = await mysql.createConnection(database);
        await conect.execute("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, secretPassword]);
        conect.end();

        return res.send("Sign In Succesful");
    } catch (error) {
        res.send("Error on Sign In! That username exists");
    }
});

router.post("/login", async (req,res)=>{
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let secretPassword = crypto.createHash('sha256').update(password).digest('hex');

    let user;
    try {
        const conect = await mysql.createConnection(database);
        const [rows, fields] = await conect.execute("SELECT id FROM usuarios WHERE email = ? AND username = ? AND password = ?", [email, username, secretPassword]);

        conect.end();
        user = rows;
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    if(!user){
        return res.send("Sign up error! Check username/password");
    }

    const payload = {
        userId: user.id,
        email: email,
        test: 'FUNCIONA'
    };

    const options = {
        algorithm: 'HS256',
        expiresIn: 15,
    };

    jwt.sign(payload, secret, options, (error, encoded) => {
        if (error) {
            return res.status(500).send('Internal Server Error.');
        }
        let data = { 
            title: "Sign In Successfull!", 
            token: encoded 
        };
        return res.send(data);
    });
})

module.exports = router
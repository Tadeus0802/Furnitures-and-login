const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const database = require("../connection/connect.json");
const mysql = require("mysql2");
const crypto = require('crypto');
const secret = "mytoken";


router.post("/register", async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let secretPassword = crypto.createHash('sha256').update(password).digest('hex');
    try {
        const conect = await mysql.createConnection(database);
        await conect.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, secretPassword]);
        conect.end();
        let data={
            title:"Sign In Succesful"
        }
        return res.send(data);
    } catch (error) {
        let data={
            title:"Error on Sign In! That email exists"
        }
        res.status(500).send(data);
    }
});

router.post("/login", async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let secretPassword = crypto.createHash('sha256').update(password).digest('hex');

    let user = null;
    try {
        const conect = await mysql.createConnection(database);
        const rows = await conect.execute("SELECT id FROM users WHERE email = ? AND password = ?", [email, secretPassword]);
        user = rows;
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    if(!user){
        return res.status(500).send("Sign up error! Check email/password");
    }

    const payload = {
        userId: user.id,
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








router.get('/verify', function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('No envio token');
    }

    jwt.verify(token, secret, (error, decoded) => {
        console.log(error)
        if (error) {
            return res.status(401).send('Token invalido');
        }

        console.log(decoded);

        return res.send('OK');
    });
});

module.exports = router
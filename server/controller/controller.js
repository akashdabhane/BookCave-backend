const userdb = require('../model/user');
// const bcrypt = require('bcrypt');

// register user
exports.register = async (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    const phone = req.body.phone; 
    const password = req.body.password; 
    if(phone.length !== 10){
        res.status(400).send({message: "Enter valid phone number"})
        return; 
    }else if(password.length <= 6 || password.length >= 16) {
        res.status(400).send({ message: "enter valid password"})
        return; 
    }

    // let hash = ''; 
    // bcrypt.hash(req.body.password, 10, (err, hash) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         // Store the hash in your database or use it as needed
    //         console.log('Hashed Password:', hash);
    //     }
    // });

    // new user
    const user = new userdb({
        phone: req.body.phone,
        password: req.body.password,
    })

    // save user in the database
    await user.save()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            console.error("Error during user registration:", error);
            res.status(500).send({
                message: error
            });
        });
}


// login
exports.login = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    const phone = req.body.phone;
    const password = req.body.password;

    if(phone.length !== 10){
        res.status(400).send({message: "Enter valid phone number"})
        return; 
    }else if(password.length <= 6 || password.length >= 16) {
        res.status(400).send({ message: "enter valid password"})
        return; 
    }

    userdb.findOne({ phone: phone })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "Not found user with phone " + phone })
            } else {
                if(user.password === password) {
                    res.status(200).send(user);
                } else {
                    res.status(401).send({message:"Password is incorrect"});
                }
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Error occured while retrieving user information" })
        })
}


// 


const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { users } = require('../users.json');

require('dotenv').config()

function login(req, res) {

    const {email, password} = req.body;

    const user = findUserByEmail(email);

    if(!user || user.length === 0) {
        res.status(400).json({
            message: "No user like this"
        })
    } else {
        const hashedPasword = user[0].password;
        const result = bcrypt.compareSync(password, hashedPasword); // password match 
        let token = "";
        if(result) {
            const payload = {
                email: user[0].email,
                name: user[0].name,
                preferences: user[0].preferences
            }

            token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "1000000000"
                }
            );

            res.status(200).json({
                message: result,
                token
            })
        }else{
            res.status(401).json({
                message: result,
            })
        }
    }
}

async function signup(req, res) {

    const {name, password, email, preferences} = req.body;

    if(!name || !password || !email || !preferences) {
        res.status(400).json({
            message: "missing required fields"
        })
        return;
    }
    const userObject = UserModel({
        name,
        password: await encryptPassword(password) ,
        email,
        preferences
    })


    try {
        users.push(userObject);
        res.status(200).json({
            message: "user created successfully",
        })
    } catch(error) {
        res.status(500).json({
            message: "something went wrong",
            error
        })
    }

}

function getPreferences(req, res){

    const email = req.email;

    try {
        const user = findUserByEmail(email);
        if(!user || user.length === 0){
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            preferences: user[0].preferences
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            err
        });
    }
}

function updatePreferences(req, res){
    const email = req.email;
    const { preferences } = req.body;

    try {
        const user = findUserAndUpdatePreference(email, preferences);
        if(!user || user.length === 0){
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Preferences updated successfully",
            preferences: user[0].preferences
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            err
        });
    }
}

// helper function to find user by email
function findUserByEmail(email) {
    return users.filter(user => user.email === email) ?? [];
}

// helper function to find and update preferences
function findUserAndUpdatePreference(email, preferences) {
     users.find(user => user.email === email).preferences = preferences;
     return users.filter(user => user.email === email) ?? [];
}

// helper function to encrypt password
async function encryptPassword(plainTextPassword) {
    const saltRounds = await bcrypt.genSalt(10);
    const encryptedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
    return encryptedPassword
}

module.exports = {
    signup,
    login,
    getPreferences,
    updatePreferences
}
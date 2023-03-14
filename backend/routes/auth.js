const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middlewere/fetchuser')

const JWT_SECRET = 'helloboy';

// Route:1 create a user using POST "/api/auth/createuser". no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check uesr email exist or not if exist then show email.exist
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "email exists" })
        }
        // creating hash for password for security
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, salt)
            // create new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authTocken = jwt.sign(data, JWT_SECRET);
        const name = user.name;
        success = true;
        res.json({ success, authTocken, name })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Try after sone times" })
    }
});

// Route:2 create a user using POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    // in try catch check user email,password matches or not using User.js module
    try {
        let success = false;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "login with correct credential" })
        }
        // compare password,email exists or not
        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ success, error: "login with correct credential" })
        }
        // const data = {
        //     user: user.id
        // }
        const data = {
                user: {
                    id: user.id
                }
            }
            // check stord data/authentication matches with cuurrent data or not
        const authTocken = jwt.sign(data, JWT_SECRET);
        const name = user.name;
        success = true;
        res.json({ success, authTocken: authTocken, name: name })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error try later" })
    }
});

// Route:3 Get loggedin detail using POST "/api/auth/getuser". no login required
router.post('/getuser', fetchuser, async(req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
            // const user = await User.findOne(userId).select("-password")
        res.send(user)
        console.log(user);
        // res.json(user)
    } catch (error) {
        console.error(error.message, "error");
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
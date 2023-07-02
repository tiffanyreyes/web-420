/*
============================================
; Title:  reyes-session-routes.js
; Author: Tiffany Reyes
; Date:   2 July 2023
; Description: NodeSecurity
;===========================================
*/

const express = require('express');
const router = express.Router();
const User = require('../models/reyes-user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


/**
 * Signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Session
 *     name: signup
 *     description: API for adding a new user document to MongoDB Atlas
 *     summary: Creates a new user document
 *     requestBody:
 *       description: Signup information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *             example:
 *               userName: testUser
 *               password: Password123
 *               emailAddress: test@me.com
 *     responses:
 *       '200':
 *         description: Register user
 *       '401':
 *          description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', async(req, res) => {
    try {
        let user = await User.findOne({ userName: req.body.userName});

        if (!user) {
            const newRegisteredUser = {
                userName: req.body.userName,
                password: bcrypt.hashSync(req.body.password, saltRounds),
                emailAddress: req.body.emailAddress
            };
    
            User.create(newRegisteredUser)
                .then((user) => {
                    console.log(user);
                    res.json(user);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    });
                });
        }
        else {
            res.status(401).send({
                'message': `Username is already in use.`
            });
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

/**
 * Login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Session
 *     name: login
 *     description: API for adding a new user document to MongoDB Atlas
 *     summary: Creates a new user document
 *     requestBody:
 *       description: Login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               userName: testUser
 *               password: Password123
 *     responses:
 *       '200':
 *         description: Register user
 *       '401':
 *          description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        let user = await User.findOne({ userName: req.body.userName});

        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (passwordIsValid) {
                res.status(200).send({
                    'message': `User logged in.`
                });
            }
            else {
                res.status(401).send({
                    'message': `Invalid username and/or password.`
                });
            }
        }
        else {
            res.status(401).send({
                'message': `Invalid username and/or password.`
            });
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});

module.exports = router;
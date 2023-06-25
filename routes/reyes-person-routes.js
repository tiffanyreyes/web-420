/*
============================================
; Title:  reyes-person-routes.js
; Author: Tiffany Reyes
; Date:   20 June 2023
; Description: Person API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Person = require('../models/reyes-person');


/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of person documents.
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: array of person documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/persons', async(req, res) => {
    try {
        Person.find({})
            .then((persons) => {
                console.log(persons);
                res.json(persons);
            })
            .catch((err) => {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});


/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding a new person document to MongoDB Atlas
 *     summary: Creates a new person document
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Person added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/persons', async(req, res) => {
    try {
        const person = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        }

        await Person.create(person)
            .then((person) => {
                console.log(person);
                res.json(person);
            })
            .catch((err) => {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        });
    }
});



module.exports = router;
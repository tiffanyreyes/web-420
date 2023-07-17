/*
============================================
; Title:  reyes-composer-routes.js
; Author: Tiffany Reyes
; Date:   17 June 2023
; Description: Composer API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/reyes-composer');


/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({})
            .then((composers) => {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id})
            .then((composer) => {
                console.log(composer);
                res.json(composer);
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
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             example:
 *               firstName: Johann
 *               lastName: Bach
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/composers', async(req, res) => {
    try {
        const composer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(composer)
            .then((composer) => {
                console.log(composer);
                res.json(composer);
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
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API for updating a composer document by id to MongoDB Atlas
 *     summary: Updates a composer document
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: identifier for composer
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             example:
 *               firstName: Johann
 *               lastName: Bach
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/composers/:id', async(req, res) => {
    try {
        const composerRequest = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        const composer = await Composer.findOne({ _id: req.params.id });
        if (composer) {

            composer.set({ firstName: composerRequest.firstName, lastName: composerRequest.lastName });
            const savedComposer = await composer.save();
            res.status(200).json(savedComposer);
        }
        else {
            res.status(401).send({
                'message': `Invalid composerId.`
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
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposerById
 *     description: API for deleting a composer document by id to MongoDB Atlas
 *     summary: Deletes a composer document
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: identifier for composer
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
*/

router.delete('/composers/:id', async(req, res) => {
    try {
        const composer = await Composer.findByIdAndDelete( req.params.id );
        if (composer) {
            res.status(200).json(composer);
        }
        else {
            res.status(401).send({
                'message': `Invalid composerId.`
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
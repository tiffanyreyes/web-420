/*
============================================
; Title:  reyes-player-routes.js
; Author: Tiffany Reyes
; Date:   18 July 2023
; Description: Player API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Team = require('../models/reyes-team');


/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API for returning an array of team documents.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/teams', async(req, res) => {
    try {
        Team.find({})
            .then((teams) => {
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for assigning a player to team document in MongoDB Atlas
 *     summary: Assigns a player document
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: identifier for team
 *     requestBody:
 *       description: Player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *             example:
 *               firstName: John
 *               lastName: Smith
 *               salary: 100000
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams/:id/players', async(req, res) => {
    try {
        const playerRequest = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        };

        Team.findById(req.params.id)
            .then(team => {
                if (!team) {
                    res.status(401).send({
                        'message': `Invalid teamId.`
                    });
                }
                
                team.players.push(playerRequest);
                team.save()
                    .then(updatedTeam => {
                        console.log(updatedTeam);
                        res.json(updatedTeam);
                    });
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning a player document
 *     summary: Returns a player document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identifier for team
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findById(req.params.id)
            .then((team) => {
                if(!team) {
                    res.status(401).send({
                        'message': `Invalid teamId.`
                    });
                }

                console.log(team.players);
                res.json(team.players);
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a team document by id to MongoDB Atlas
 *     summary: Deletes a team document
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: identifier for Team
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
*/

router.delete('/teams/:id', async(req, res) => {
    try {
        Team.findByIdAndDelete( req.params.id )
            .then(team => {
                if (!team) {
                    res.status(401).send({
                        'message': `Invalid teamId.`
                    });
                }

                res.json(team);
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
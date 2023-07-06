/*
============================================
; Title:  reyes-node-shopper-routes.js
; Author: Tiffany Reyes
; Date:   6 July 2023
; Description: Customer API routes
;===========================================
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/reyes-customer');


/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding a new customer document to MongoDB Atlas
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *             example:
 *               firstName: Mina
 *               lastName: Myori
 *               userName: minm001
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }

        await Customer.create(newCustomer)
            .then((customer) => {
                res.status(200).send({
                    'message': `Customer added to MongoDB.`
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
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for adding a new invoice document to MongoDB Atlas
 *     summary: Creates a new invoice document
 *     parameters: 
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username this invoice belongs to
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *             example:
 *               subtotal: 19.99
 *               tax: 0.07
 *               dateCreated: 7/3/2023
 *               dateShipped: 7/5/2023
 *               lineItems: [{name: "Candy Lightstick", price: 19.99, quantity: 1}]
 *     responses:
 *       '200':
 *         description: Invoice added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async(req, res) => {
    try {
        const newInvoice = {
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems
        }

        const customer = await Customer.findOne({ userName: req.params.username });

        if (customer.invoices == null) {
            customer.invoices = [newInvoice];
        }
        else {
            customer.invoices.push(newInvoice);
        }

        await customer.save()
            .then((customer) => {
                res.status(200).send({
                    'message': `Invoice added to MongoDB.`
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
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning an array of invoice documents
 *     summary: Retrieve list of invoice documents for a username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer's username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        await Customer.findOne({userName: req.params.username})
            .then((customer) => {
                console.log(customer);
                res.json(customer.invoices);
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
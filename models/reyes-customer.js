/*
============================================
; Title:  reyes-customer.js
; Author: Tiffany Reyes
; Date:   6 July 2023
; Description: NodeShopper
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose line item schema

const lineItemSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   price: {
    type: Number,
    required: true
   },
   quantity: {
    type: Number,
    required: true
   }
});

// A mongoose invoice schema

const invoiceSchema = new Schema({
    subtotal: {
     type: Number,
     required: true
    },
    tax: {
     type: Number,
     required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    dateShipped: {
        type: String,
        required: true
    },
    lineItems: {
        type: Array,
        required: true,
        schema: lineItemSchema
    }
 });

 // A mongoose invoice schema

const customerSchema = new Schema({
    firstName: {
     type: String,
     required: true
    },
    lastName: {
     type: String,
     required: true
    },
    userName: {
        type: String,
        required: true
    },
    invoices: {
        type: Array,
        required: true,
        schema: invoiceSchema
    }
 });

module.exports = mongoose.model('Customer', customerSchema);
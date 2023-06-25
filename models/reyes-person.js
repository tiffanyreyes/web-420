/*
============================================
; Title:  reyes-person.js
; Author: Tiffany Reyes
; Date:   20 June 2023
; Description: Composer Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose role schema

const roleSchema = new Schema({
   text: {
    type: String,
    required: true
   }
});

// A mongoose dependent schema

const dependentSchema = new Schema({
    firstName: {
     type: String,
     required: true
    },
    lastName: {
     type: String,
     required: true
    }
 });

// A mongoose person schema

const personSchema = new Schema({
    firstName: {
     type: String,
     required: true
    },
    lastName: {
     type: String,
     required: true
    },
    roles: {
        type: Array,
        required: true,
        schema: roleSchema
    },
    dependents: {
        type: Array,
        required: true,
        schema: dependentSchema
    },
    birthDate: {
        type: String,
        required: true
    }
 });

module.exports = mongoose.model('Person', personSchema);
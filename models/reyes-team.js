/*
============================================
; Title:  reyes-team.js
; Author: Tiffany Reyes
; Date:   18 July 2023
; Description: Team Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose player schema

const playerSchema = new Schema({
    firstName: {
     type: String,
     required: true
    },
    lastName: {
     type: String,
     required: true
    },
    salary: {
        type: Number,
        required: true
    }
 });

// A mongoose team schema

const teamSchema = new Schema({
    name: {
     type: String,
     required: true
    },
    mascot: {
     type: String,
     required: true
    },
    players: {
     type: Array,
     Schema: playerSchema,
     required: true
    }
 });


module.exports = mongoose.model('Team', teamSchema);
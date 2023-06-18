/*
============================================
; Title:  reyes-composer.js
; Author: Tiffany Reyes
; Date:   17 June 2023
; Description: Composer Schema
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose composer schema

const composerSchema = new Schema({
   firstName: {
    type: String,
    required: true
   },
   lastName: {
    type: String,
    required: true
   }
});

module.exports = mongoose.model('Composer', composerSchema);
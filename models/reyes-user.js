/*
============================================
; Title:  reyes-user.js
; Author: Tiffany Reyes
; Date:   2 July 2023
; Description: NodeSecurity
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A mongoose role schema

const userSchema = new Schema({
   userName: {
    type: String,
    required: true
   },
   password: {
    type: String,
    required: true
   },
   emailAddress: {
    type: String,
    required: true
   }
});

module.exports = mongoose.model('User', userSchema);
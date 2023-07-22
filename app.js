/*
============================================
; Title:  app.js
; Author: Tiffany Reyes
; Date:   20 June 2023
; Description: Entry point and express js configuration
;===========================================
*/

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const ComposerAPI = require('./routes/reyes-composer-routes');
const PersonAPI = require('./routes/reyes-person-routes');
const SessionAPI = require('./routes/reyes-session-routes');
const ShopperAPI = require('./routes/reyes-node-shopper-routes');
const TeamAPI = require('./routes/reyes-team-routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CONN = 'mongodb+srv://web420_user:mu5ic@bellevueuniversity.paicaia.mongodb.net/web420DB'
const PORT = process.env.PORT || 3000;
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0'
        },
    },
    apis: ['./routes/*.js']
}

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', ComposerAPI);
app.use('/api', PersonAPI);
app.use('/api', SessionAPI);
app.use('/api', ShopperAPI);
app.use('/api', TeamAPI);

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log('Application started and listening on port 3000.')
});

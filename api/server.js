// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require('express');
const server = express();
server.use(express.json())
const pRouter = require('./projects/projects-router')
const aRouter = require('./actions/actions-router')

server.use('/api/projects', pRouter)
server.use('/api/actions', aRouter)

module.exports = server;

// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('./../projects/projects-model')

module.exports = {
    validateAction,
    validateActionId,
    validateProjectId
}

function validateActionId (req, res, next) {
    const { id } = req.params

    Actions.get(id)
    .then(action => { if(!action) {
        res.status(404).json({message:"action not found"})
    } else {
        req.action = action
        next()
    }
    })
    .catch(err => res.status(500).json({message:"problem finding project"}))
}

function validateProjectId (req, res, next) {
    const { project_id } = req.body

    Projects.get(project_id)
    .then(project => { 
        if(!project) {
            res.status(404).json({message:"project not found"})
        } else {
            req.project_id = project.id
            next()
        }
    })
    .catch(err => res.status(500).json({message:"problem finding project"}))
}

function validateAction (req, res, next) {
    const { notes, description } = req.body
    if (!notes || notes.trim() === '' || !description || description.trim() === '') {
        res.status(400).json({message: "missing required name and/or description field(s)"})
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        next()
    }
}
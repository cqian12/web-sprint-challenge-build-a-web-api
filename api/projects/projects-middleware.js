// add middlewares here related to projects
const Projects = require('./projects-model')

module.exports = {
    validateProject,
    validateProjectId
}

function validateProjectId (req, res, next) {
    const { id } = req.params

    Projects.get(id)
    .then(project => { 
        if(!project) {
            res.status(404).json({message:"project not found"})
        } else {
            req.project = project
            next()
        }
    })
    .catch(err => res.status(500).json({message:"problem finding project"}))
    // try {
    //     const project = Projects.get(id)
    //     if (!project) {
    //         res.status(404).json({message:"project not found"})
    //     } else {
    //         req.project = project
    //         next()
    //     }
    // }
    // catch(err) {
    //     res.status(500).json({message:"problem finding project"})   
    // }
}

function validateProject (req, res, next) {
    const { name, description } = req.body
    if (!name || name.trim() === '' || !description || description.trim() === '') {
        res.status(400).json({message: "missing required name and/or description field(s)"})
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}
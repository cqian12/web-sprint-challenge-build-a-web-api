// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => res.json(projects))
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({name:req.name, description:req.description, completed:req.body.completed})
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(updatedProject => res.json(updatedProject))
    .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.end()
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(posts => res.json(posts))
    .catch(next)
})

router.use((err, req, res, next) => {
    //console.log(err.message)
    res.status(err.status || 500).json({message: err.message})
  })

module.exports = router
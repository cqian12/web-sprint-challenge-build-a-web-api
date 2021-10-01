// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const { validateAction, validateActionId, validateProjectId } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => res.json(actions))
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateProjectId, validateAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert({project_id: req.project_id, notes: req.notes, description: req.description})
        res.status(201).json(newAction)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(() => {
        return Actions.get(req.params.id)
    })
    .then(updatedAction => res.json(updatedAction))
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.end()
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    //console.log(err.message)
    res.status(err.status || 500).json({message: err.message})
  })

module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../models/DbManager')

// a sanity check to make sure the server works
router.get('/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})

// Poll - a POST route that saves a poll into the DB
router.post('/Poll', async function (request, response) {
    // console.log('in post request')
    const poll = request.body
    if(poll.options.length<2){
        response.send('A poll should contain at least two options, the poll is not saved to database.')
        return
    }
    const exists = await db.getPoll({question: poll.question})
    if(exists){
        response.send({errorMessage: 'This question is already in the database, will not save new one.'})
        return
    }
    const result = await db.savePoll(poll)
    response.send(result)

    // console.log(result)
    // send the saved poll to all other clients
    request.io.emit('create-new-poll', result)
    
})

// /Polls - a GET route that returns all the polls sorted descending based on the created date
router.get('/Polls', async function (request, response) {
    const results = await db.getAllPolls({})
    response.send(results)
})

// /Polls/Top - a GET route that returns the top 3 polls with most votes desc based on votes number
router.get('/Polls/Top', async function (request, response) {
    const results = await db.getTopPolls({})
    response.send(results)
})

// Poll - a PUT route that updates a poll into DB
router.put('/Poll', async function (request, response) {
        const poll = request.body
        const result = await db.updatePoll(poll)
        response.send(result)
        // notify other clients when the poll has been updated
        request.io.emit('update-new-poll', poll)
})

module.exports = router;
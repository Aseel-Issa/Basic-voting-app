const mongoose = require('mongoose')
// mongoose is a singleton, so connecting to db once is enough
mongoose.connect('mongodb://127.0.0.1/voting-dojo-app', { useNewUrlParser: true })

const Poll = require('./Poll')


const savePoll = async function(pollObj){
        return Poll.savePoll(pollObj)
    }

const getPoll = async function(pollObj){
        return Poll.getOnePoll(pollObj)
    }

const updatePoll = async function(pollObj) {
        return Poll.updatePoll(pollObj)
    }

const getAllPolls = async function(){
        return Poll.getAllPolls()
    }

const getTopPolls = async function(pollObj) {
    return Poll.getTopPolls()
}
// DbManager is the only module that is responsible of interacting with database
module.exports = {savePoll,
    updatePoll,
    getAllPolls,
    getTopPolls,
    getPoll}
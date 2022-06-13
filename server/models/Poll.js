const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema({
    option: String,
    votes: Number
}, { _id : false })
// poll representation in database
const pollSchema = new Schema({
    question: String,
    options: [optionSchema],
    creationDate: Date,
    totalVotes: Number
})

const PollModel = mongoose.model('poll', pollSchema)

const savePoll = async function(pollObj){
        try{
            const poll = new PollModel(pollObj)
            const response = await poll.save()
            return response
        }catch(e){
            return e.toString()
        }
        
    }

const updatePoll = async function(pollObj){
        try{
            let data = await PollModel.updateOne({_id: pollObj._id}, pollObj)
            return data
        }catch(e){
            return e.toString()
        }
    }
// returns one poll if exists
const getOnePoll = async function(filterObj){
    try{
        let data = await PollModel.findOne(filterObj)
        return data
    }catch(e){
        return e.toString()
    }
}

// returns all polls with desc order based on creation date
const getAllPolls = async function(){
        try{
            let data = await PollModel.find({}).sort({creationDate: 'desc'})
            return data
        }catch(e){
            return e.toString()
        }
    }

// returns the top 3 polls with maximum votes
const getTopPolls = async function(){
    try{
        let data = await PollModel.find({}).limit(3).sort({totalVotes: 'desc'})
        return data
    }catch(e){
        return e.toString()
    }
}

// expose only allowed functions
module.exports = module.exports = {savePoll,
    getAllPolls,
    updatePoll,
    getTopPolls,
    getOnePoll}
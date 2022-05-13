const asyncHandler = require('express-async-handler')
const Meeting = require('../models/meetingModel')

const postMeeting = asyncHandler(async (req, res) => {

    console.log("req..",req.body)

    const newMeeting = await Meeting.create(req.body)

    if(newMeeting){
        res.status(201).json({
           data: newMeeting
        })
    }else{
        res.status(400)
        throw new Error("Error Occured!")
    }
  
})

module.exports = {postMeeting}
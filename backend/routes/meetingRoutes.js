const express = require('express')
const { postMeeting } = require('../controllers/meetingController')
const router = express.Router()

router.route('/addmeeting').post(postMeeting)

module.exports = router
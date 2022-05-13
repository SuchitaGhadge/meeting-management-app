const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema(
    {
        agenda: {
            type: String,
            required: true,
            default: "meeting"
        },
        meetingType: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        meetingDate: {
            type: String,
            required: true
        },
        followUpDate: {
            type: String,
            required: false
        },
        meetingTime: {
            type: String,
            required: true
        },
        project: {
            type: String,
            required: true
        },
        cta: {
            type: String,
            required: true
        },
        developer: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        remark: {
            type: String,
            required: false,
            default: ""
        },
        rating: {
            type: Number,
            require: true
        },
        attendees: [
            {
                attenddeeName: {
                    type: String,
                    required: true
                },
                designation: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const Meeting = mongoose.model("Meeting", meetingSchema)

module.exports = Meeting
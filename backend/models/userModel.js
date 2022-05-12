const mongoose = require('mongoose')
const bycrypt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const userSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        isAdmin: {
            // just in case we need
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps : true
    }
);

// encrypt password
userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bycrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// decrypt password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User
const mongoose = require('mongoose');

const accessTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {expires: '1s'}
    }
}, {
    timestamps: true
})

const AccessToken = mongoose.model('AccessToken', accessTokenSchema);
module.exports = AccessToken;
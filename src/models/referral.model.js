const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referredUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'successful', 'expired'],
        default: 'pending'
    },
    dateReferred: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Referral', referralSchema); 
const User = require('../models/user.model');
const Referral = require('../models/referral.model');

const getReferrals = async (req, res) => {
    try {
        const referrals = await Referral.find({ referrerId: req.user._id })
            .populate('referredUserId', 'username email createdAt')
            .sort('-dateReferred');

        res.json({
            success: true,
            count: referrals.length,
            data: referrals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching referrals',
            error: error.message
        });
    }
};

const getReferralStats = async (req, res) => {
    try {
        const stats = await Referral.aggregate([
            { $match: { referrerId: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching referral stats',
            error: error.message
        });
    }
};

module.exports = {
    getReferrals,
    getReferralStats
}; 
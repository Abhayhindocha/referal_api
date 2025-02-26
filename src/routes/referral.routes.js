const express = require('express');
const router = express.Router();
const { getReferrals, getReferralStats } = require('../controllers/referral.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getReferrals);
router.get('/stats', protect, getReferralStats);

module.exports = router; 
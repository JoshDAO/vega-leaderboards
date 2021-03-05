const express = require('express')
const { getChartData, getLeaderboards } = require('./controllers')
const router = express.Router()

router.get('/leaderboards', getLeaderboards)
router.get('/address/:address', getChartData)

module.exports = router

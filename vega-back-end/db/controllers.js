const mongoose = require('mongoose')

getChartData = async (req, res) => {
  const address = req.params.address

  function find(name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
      collection.find(query).toArray(cb)
    })
  }

  find(address, { desc: 'balance' }, function (err, docs) {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: docs })
  })
}

getLeaderboards = async (req, res) => {
  function find(name, query, cb) {
    mongoose.connection.db.collection(name, function (err, collection) {
      collection.find(query).toArray(cb)
    })
  }

  find('leaderboards', {}, function (err, docs) {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: docs })
  })
}

module.exports = { getChartData, getLeaderboards }

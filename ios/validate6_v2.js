const validate = require('./validate6.js');
const { errLog, log } = require('../log.js');
const express = require('express');

const router = express.Router();

router.post('/:bundle', (req, res) => {
  const opt = {};
  if (undefined !== req.query.get_latest_receipt && req.query.get_latest_receipt !== 'false') {
    opt.get_latest_receipt = true;
  }
  // Set up response.
  log(`ios6_v2: ${req.params.bundle}`);
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Validate.
  validate(req.params.bundle, req.body.receipt, (result) => {
    // Write response.
    if (result.code !== 0) {
      errLog(JSON.stringify({
        type: 'ios6_v2',
        error: result.error,
        payload: result,
        request: req.body.receipt,
      }));
    }
    res.end(JSON.stringify(result));
  }, opt);
});

module.exports = router;

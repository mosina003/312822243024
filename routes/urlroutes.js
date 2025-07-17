
const express = require('express');
const router = express.Router();
const log = require('../middleware/logger'); 
router.get('/ping', async (req, res) => {
  await log('backend', 'info', 'urlshortener', 'Ping route hit');
  res.status(200).send('pong');
});

module.exports = router;

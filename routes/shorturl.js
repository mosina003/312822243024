const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginal } = require('../controllers/shortUrlController');

router.post('/shorten', createShortUrl);
router.get('/:shortCode', redirectToOriginal);

module.exports = router;

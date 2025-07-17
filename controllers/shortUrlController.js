const ShortURL = require("../models/ShortURL");
const generateShortcode = require("../utils/generateShortcode");
const validUrl = require("valid-url");

// POST /shorten
exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let finalCode = shortcode || generateShortcode();

  // Ensure shortcode is unique
  const existing = await ShortURL.findOne({ shortCode: finalCode });
  if (existing) {
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const expiresAt = new Date(Date.now() + validity * 60000);
  const shortUrl = new ShortURL({ originalUrl: url, shortCode: finalCode, expiresAt });
  await shortUrl.save();

  const hostname = req.get("host");
  const protocol = req.protocol;
  res.status(201).json({
    shortLink: `${protocol}://${hostname}/${finalCode}`,
    expiry: expiresAt.toISOString(),
  });
};

// GET /:shortCode
exports.redirectToOriginal = async (req, res) => {
  const short = await ShortURL.findOne({ shortCode: req.params.shortCode });
  if (!short) return res.status(404).json({ error: "Shortcode not found" });

  res.json({
    originalUrl: short.originalUrl,
    createdAt: short.createdAt,
    expiresAt: short.expiresAt,
    totalClicks: short.clicks.length,
    clickDetails: short.clicks,
  });
};

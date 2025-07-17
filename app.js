const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const ShortURL = require("./models/ShortURL");

const app = express();
app.use(express.json());
app.use(logger); 

mongoose.connect("mongodb://127.0.0.1:27017/urlshortener");

app.use("/shorturls", require("./routes/shorturl"));


app.get("/:shortcode", async (req, res) => {
  const short = await ShortURL.findOne({ shortCode: req.params.shortcode });
  if (!short) return res.status(404).json({ error: "Shortcode not found" });

  if (new Date() > short.expiresAt) {
    return res.status(410).json({ error: "Shortcode expired" });
  }

  short.clicks.push({
    referrer: req.get("referrer") || "direct",
    location: req.ip, 
  });
  await short.save();
  res.redirect(short.originalUrl);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

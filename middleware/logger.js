
const axios = require("axios");

const LOGGING_SERVER_URL = "http://20.244.56.144/evaluation-service/logs";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzbW9zaW5hMDAzQGdtYWlsLmNvbSIsImV4cCI6MTc1MjczMzg4NSwiaWF0IjoxNzUyNzMyOTg1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjBkMzQxMjEtMjk1Mi00YTAzLWIzODgtZjYwNTdjZGVlOWY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibW9zaW5hLnMiLCJzdWIiOiIwMTM3YjI2Zi1jZTg0LTQ5NDctOTI0Ni05MzU3ZDljZGJkZDAifSwiZW1haWwiOiJzbW9zaW5hMDAzQGdtYWlsLmNvbSIsIm5hbWUiOiJtb3NpbmEucyIsInJvbGxObyI6IjMxMjgyMjI0MzAyNCIsImFjY2Vzc0NvZGUiOiJ2QUh6S24iLCJjbGllbnRJRCI6IjAxMzdiMjZmLWNlODQtNDk0Ny05MjQ2LTkzNTdkOWNkYmRkMCIsImNsaWVudFNlY3JldCI6ImJRVXlZeEZnQ3RHVFdaWHQifQ.WHytU_E15IIIpOIr3aXidUhzEFZS2Yu0z6plkT8xdgk";

async function log(stack, level, pkg, message) {
  try {
    const payload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message: message,
      timestamp: new Date().toISOString(),
    };

    const response = await axios.post(LOGGING_SERVER_URL, payload, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log(" Log sent:", response.data);
  } catch (error) {
    console.error(" Failed to send log:", error.response?.data || error.message);
  }
}

module.exports = log;

const log = require("../utils/log");

const logger = async (req, res, next) => {
  try {
    await log("url-shortener", "info", "middleware", `${req.method} ${req.originalUrl}`);
  } catch (err) {
    
  }
  next();
};

module.exports = logger;

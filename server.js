const express = require('express');
const app = express();

// Root route (optional: for browser landing page)
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running. Use /api/:date?');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  let date;

  // Case 1: No date provided => use current date
  if (!dateString) {
    date = new Date();
  }
  // Case 2: dateString is a Unix timestamp (number string)
  else if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  }
  // Case 3: dateString is a regular date string
  else {
    date = new Date(dateString);
  }

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid timestamp response
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

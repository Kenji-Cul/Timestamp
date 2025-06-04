const express = require('express');
const app = express();

// API route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;

  if (!dateParam) {
    // No parameter provided → return current date
    date = new Date();
  } else if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    // If it's a valid numeric timestamp string → treat as UNIX milliseconds
    date = new Date(parseInt(dateParam));
  } else {
    // Try parsing as a normal date string
    date = new Date(dateParam);
  }

  // Check for invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return valid date in both formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

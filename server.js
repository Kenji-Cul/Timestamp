const express = require('express');
const app = express();

// API route

app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running. Use /api/:date?');
});


app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // ✅ Always respond with JSON
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' }); // This is what FCC checks
  }

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

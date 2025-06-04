const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Enable static files (optional frontpage)
app.use(express.static('public'));

// Root endpoint (optional frontpage)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  let date;
  if (!dateInput) {
    date = new Date();
  } else if (!isNaN(dateInput)) {
    date = new Date(parseInt(dateInput)); // handle unix timestamp
  } else {
    date = new Date(dateInput); // handle ISO date string
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

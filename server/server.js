const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/data', (req, res) => {
  // Handle data retrieval from the database
  // Replace with your own database logic
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

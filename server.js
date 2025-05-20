const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

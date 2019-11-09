const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' });
});

app.use('/api/jobs', require('./routes/jobpost'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRouter = require('./routes/adminRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 Local connection to shared MongoDB cluster successful!'))
  .catch(err => console.error('❌ Connection error:', err));

app.use(cors());
app.use(express.json());

// Mount your routes
app.use('/api/admin', adminRouter);


app.listen(PORT, () => console.log(`🚀 API Server running on port ${PORT}`));
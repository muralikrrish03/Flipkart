const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

const connectDatabase = require('./Database/connectDatabase');
const user = require('./routes/userRoutes');
const product = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use('/api/v1', product);
app.use('/api/v1', orders);
app.use(user);
  

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html')
    );
  });
}








const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

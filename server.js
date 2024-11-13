
const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/userRouter');

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

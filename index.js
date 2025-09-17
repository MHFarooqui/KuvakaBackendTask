const express = require('express');
const inputRoutes = require('./Routes/InputRoutes');
const outputRoutes = require('./Routes/OutputRouts');
const app = express();
const port = 3000;


app.use(express.json());

app.use("/", inputRoutes);
app.use("/", outputRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

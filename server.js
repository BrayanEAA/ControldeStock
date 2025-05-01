require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/services/db.config');

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

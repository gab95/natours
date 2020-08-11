const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting down.....');
  console.log(err.name);
  console.log(err.message);
  console.log(err);

  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(process.env.DATABASE_URL)
  .then((con) => console.log('DB connection successful'));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);
  console.log(`app running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION Shutting down.....');
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});

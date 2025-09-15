import express from 'express'
import { ENV } from './config/env';
import { connectDB } from './config/db';

const app = express();
connectDB().catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

const port = ENV.PORT || 5001;
if (isNaN(Number(port)) || Number(port) < 1 || Number(port) > 65535) {
    throw new Error(`Invalid port: ${port}`);
}
app.listen(port, () => console.log("Server is up and running on port:", port));

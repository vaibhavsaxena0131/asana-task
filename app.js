import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
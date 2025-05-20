import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import applicationRouter from './routes/applications';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', applicationRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});

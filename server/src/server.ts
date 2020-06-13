import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));

app.listen(3333);
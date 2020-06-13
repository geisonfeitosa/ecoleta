import express from 'express';
import PointController from './controllers/pointController';
import ItemController from './controllers/itemController';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();

routes.get('/item', itemController.index);
routes.post('/point', pointController.create);
routes.get('/point', pointController.index);
routes.get('/point/:id', pointController.show);

export default routes;
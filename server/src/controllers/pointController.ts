import {Request, Response} from 'express';
import knex from '../database/connection';

export default class PointController {

    async create(request: Request, response: Response) {
        const {
            title,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: 'empty',
            title,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const trx = await knex.transaction();
    
        const idsRet = await trx('point').insert(point);
        const point_id = idsRet[0];
    
        const pointItem = items.map((item_id: Number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await trx('point_item').insert(pointItem);

        await trx.commit();

        return response.json({
            id: point_id,
            ... point
        });
    }

    async index(request: Request, response: Response) {
        const {
            city,
            uf,
            items
        } = request.query;
        const itemsArray = String(items).split(',').map(i=> Number(i.trim()));
         

        const points = await knex('point').join('point_item', 'point_item.point_id', '=', 'point.id')
        .whereIn('point_item.item_id', itemsArray)
        .where('city', String(city))
        .where('uf', String(uf)).distinct().select('point.*');

        return response.json(points);
    } 

    async show(request: Request, response: Response) {
        const {id} = request.params;

        const point = await knex('point').where('id', id).first();
        const items = await knex('item').join('point_item', 'point_item.item_id', '=', 'item.id').where('point_item.point_id', id).select('title');

        return point ? response.json({point, items}) : response.status(400).json({message: 'Point not found.'});
    }
}
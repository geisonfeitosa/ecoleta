import {Request, Response} from 'express';
import knex from '../database/connection';

export default class ItemController {

    async index(request: Request, response: Response) {
        const items = await knex('item').select('*');
    
        const serializedItens = items.map(i => {
            return {
                id: i.id,
                title: i.title,
                imageUrl: `http://192.168.1.6:3333/images/${i.image}`
            };
        });
    
        return response.json(serializedItens);
    }
}
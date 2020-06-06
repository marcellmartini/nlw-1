import { Request, Response } from 'express';
import knex from '../database/connection';

// Todo: Olhar serialization, API Transform

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    // filtro recebido do usuário
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    // local onde filtra os items
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.1.228:3333/uploads/point/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.228:3333/uploads/point/${point.image}`,
    };

    /**
     * SELECT * FROM items
     *  JOIN point_items ON items.id = point_items.item_id
     *  WHERE point_items.point_id = {id}
     */
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return response.json({ serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      number,
      items
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      number
    }

    // short syntax: Quando a variável é igual ao nome do campo, não precisa colocar name: name
    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    // short syntax: Quando a variável é igual ao nome do campo, não precisa colocar item_id: item_id
    const pointItems = items
      .split(', ')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id
        };
      })

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;

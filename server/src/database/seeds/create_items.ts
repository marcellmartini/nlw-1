import Knex from 'knex';

export async function seed(knex: Knex){
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Paéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduoes Eletônicos', image: 'eletronicos.svg' },
    { title: 'Resíduoes Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);
}

import Knex from 'knex';

export async function up(knex: Knex) {
  // CREAR A TABELA
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('image').notNullable();
  });
}

export async function down(knex: Knex) {
  // VOLTAR A TRAS (DELETAR A TABELA)
  return knex.schema.dropTable('items');
}

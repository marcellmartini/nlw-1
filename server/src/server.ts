import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);

// Rota: Endereço completo da requisição
// recurso: Qual entidade estamos acessando do sitema

// GET: Buscar uma ou mais informações
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

// POST http://localhost:3333/users = Criar um usuário
// GET http://localhost:3333/users = Listar usuários
// GET https://localhost:3333/users/5 = Buscar dados do usuário com ID

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/autualizaçào de informações

// SELECT * FROM  user WHERE name = 'Marcell'
// knex('users').where('name', 'Marcell').select('*')

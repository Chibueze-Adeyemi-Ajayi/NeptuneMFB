import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'nfmb_drone_project',
  username: 'root',
  password: '',
  host: '127.0.0.1',
  dialect: 'mysql'
});

export default sequelize;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config';

class User extends Model {}

User.init({
  // Define attributes here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: 'user',
  // Other options here
});

// Define associations here

import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config';

class History extends Model {
  public id!: number;
  public drone_id!: number;
  public battery_level!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

History.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    drone_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    battery_level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: 'history',
    sequelize
  }
);

export { History };

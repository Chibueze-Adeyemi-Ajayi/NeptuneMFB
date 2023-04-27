import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config';

export class Dispatch extends Model {
  public id!: number;
  public loadId!: number;
  public droneId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Dispatch.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    droneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'dispatches',
    sequelize,
  }
);

export default Dispatch;

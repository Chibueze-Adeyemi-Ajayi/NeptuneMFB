import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config';

class MedicationModel extends Model {
  public id!: number;
  public name!: string;
  public weight!: number;
  public image!: string;
  public code!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MedicationModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'medications',
    sequelize, // passing the `sequelize` instance is required
  }
);

export {MedicationModel}
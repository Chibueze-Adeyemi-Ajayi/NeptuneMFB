import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config';

interface DroneAttributes {
  serialnumber: string;
  model: string;
  weightLimit: number;
  batteryCapacity: number;
  state: string;
}

class Drone extends Model<DroneAttributes> implements DroneAttributes {
  public serialnumber!: string;
  public model!: string;
  public weightLimit!: number;
  public batteryCapacity!: number;
  public state!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Drone.init(
  {
    serialnumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    batteryCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Drone',
  },
);

export { Drone };

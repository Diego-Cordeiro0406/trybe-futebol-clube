import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: DataTypes.NUMBER,
  awayTeamId: {
    type: DataTypes.NUMBER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

// SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

// SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default SequelizeMatches;

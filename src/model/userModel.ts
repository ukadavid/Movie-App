import {DataTypes, Model} from 'sequelize';
import db from '../config/db.config';
import { MovieInstance } from './movieModels';


export interface UserAttributes{
    id: string;
    email: string;
    username: string;
    fullName: string;
    password: string;
}

export class UserInstance extends Model <UserAttributes>{}

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    tableName: "user"
}
)

UserInstance.hasMany(MovieInstance, {foreignKey: "userId", as: "movie"});
MovieInstance.belongsTo(UserInstance, {foreignKey: "userId", as: "user"});


import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface MovieAttributes {
    id : string;
    description: string;
    title: string;
    price : number;
    image : string;
    userId: string;
}

export class MovieInstance extends Model <MovieAttributes> {}

MovieInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.UUIDV4
    }
}, {
    sequelize: db,
    tableName: "movie"
}) 
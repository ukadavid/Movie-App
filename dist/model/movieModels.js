"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class MovieInstance extends sequelize_1.Model {
}
exports.MovieInstance = MovieInstance;
MovieInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4
    }
}, {
    sequelize: db_config_1.default,
    tableName: "movie"
});

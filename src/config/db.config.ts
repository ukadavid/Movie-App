import {Sequelize} from 'sequelize';

const db = new Sequelize('app', '', '', {
    storage: './movieDatabase.sqlite',
    dialect: 'sqlite',
    logging: false
})

export default db;

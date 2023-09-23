
const dotenv=require('dotenv')
dotenv.config()

const { Sequelize, DataTypes } = require("sequelize");

const sql = require("mysql2/promise")

sql.
    createConnection({ user: process.env.USER, password: process.env.PASSWORD })
    .then(()=>
    {
        console.log("db CONNECTED successfully")
    })

const sequelize= new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,{
        host:process.env.HOSTDB,
        dialect:process.env.DIALECT,
        // timezone: '+05:30'
    }
) 

const db={}
db.sequelize=sequelize
db.USER=require("./user/user_table.js")(sequelize,DataTypes)
db.ADMIN_TRAINING=require("./admin/Schedule_training.js")(sequelize,DataTypes)
db.TRAININGS=require("./trainings/registered_user_table.js")(sequelize,DataTypes)
db.REQUEST=require('./request/request_table.js')(sequelize,DataTypes)
db.TRAINER=require('./trainner/trainer_table.js')(sequelize,DataTypes)


db.sequelize.sync({ force: false }, () => {
    console.log("Sync done");
  });
  

  
  module.exports = db;

console.log('connection successful !!!')
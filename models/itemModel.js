const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('../models/userModel')


const Item = sequelize.define('item',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title:{
        type: Sequelize.STRING,
        allowNull: false,
        // validate:{
        //     isAlpha: {args: true, msg: "Title contains invalid characters" }
        // }
    },

    description: {
        type: Sequelize.STRING , 
        allowNull: false,
        
        
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    image:{
       type: Sequelize.STRING,
       allowNull: false,
       
    },
   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

},{indexes: [{unique: true, name: 'title', fields: ['title']}]})



User.hasOne(Item, {onDelete: 'CASCADE',foreignKey: 'vendorId'});
Item.belongsTo(User ,{onDelete: 'CASCADE',foreignKey: 'vendorId'});

module.exports = Item;
const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('./userModel');
const Item = require('./itemModel');

const Order = sequelize.define('order',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
        
    },

   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

})


User.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'userId'});
Order.belongsTo(User);

Item.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'itemId'});
Order.belongsTo(Item);

User.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'vendorId'});
Order.belongsTo(User ,{onDelete: 'CASCADE',foreignKey: 'vendorId'});

module.exports = Order;


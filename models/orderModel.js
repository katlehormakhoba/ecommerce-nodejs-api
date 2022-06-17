const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('./userModel');
const Item = require('./itemModel');
const Address = require('./addressModel')

const Order = sequelize.define('order',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    orderNum:{
        type: Sequelize.STRING , 
        allowNull: false,
    },

   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

})


User.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'userId'});
Order.belongsTo(User);

Item.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'itemId'});
Order.belongsTo(Item);

Address.hasOne(Order, {onDelete: 'CASCADE',foreignKey: 'addressId'});
Order.belongsTo(Address ,{onDelete: 'CASCADE',foreignKey: 'addressId'});

module.exports = Order;


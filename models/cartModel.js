const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('./userModel');
const Item = require('./itemModel');

const Cart = sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    

   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

})


User.hasOne(Cart, {onDelete: 'CASCADE',foreignKey: 'userId'});
Cart.belongsTo(User);

Item.hasOne(Cart, {onDelete: 'CASCADE',foreignKey: 'itemId'});
Cart.belongsTo(Item);

// User.hasOne(Cart, {onDelete: 'CASCADE',foreignKey: 'vendorId'});
// Cart.belongsTo(User ,{onDelete: 'CASCADE',foreignKey: 'vendorId'});

module.exports = Cart;






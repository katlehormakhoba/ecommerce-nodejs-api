const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('./userModel');
const Item = require('./itemModel');

const Address = sequelize.define('address',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    town: {
        type: Sequelize.STRING , 
        allowNull: false,  
    },
    province: {
        type: Sequelize.STRING , 
        allowNull: false,  
    },
    city: {
        type: Sequelize.STRING , 
        allowNull: false,  
    },
    zipCode: {
        type: Sequelize.STRING , 
        allowNull: false,  
    },





   

   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

})


//FOREIGN KEY DECLARATIONS
// User.hasOne(Wish, {onDelete: 'RESTRICT',foreignKey: 'userId'});
// Wish.belongsTo(User);

User.hasOne(Address, {onDelete: 'CASCADE',foreignKey: 'userId'});
Address.belongsTo(User);

Item.hasOne(Address, {onDelete: 'CASCADE',foreignKey: 'itemId'});
Address.belongsTo(Item);



// Wish.sync({alter:true})

// const hello = async()=>{
//         const logIt = await Wish.findAll({
            
//         });
    
//         console.log(logIt)
//     }
    
//     hello()

module.exports = Address;








const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const User = require('./userModel');
const Item = require('./itemModel');

const Wish = sequelize.define('wish',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   

   
    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

})


//FOREIGN KEY DECLARATIONS
// User.hasOne(Wish, {onDelete: 'RESTRICT',foreignKey: 'userId'});
// Wish.belongsTo(User);

User.hasOne(Wish, {onDelete: 'CASCADE',foreignKey: 'userId'});
Wish.belongsTo(User);

Item.hasOne(Wish, {onDelete: 'CASCADE',foreignKey: 'itemId'});
Wish.belongsTo(Item);

// Wish.sync({alter:true})

// const hello = async()=>{
//         const logIt = await Wish.findAll({
            
//         });
    
//         console.log(logIt)
//     }
    
//     hello()

module.exports = Wish;








const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 


const Item = sequelize.define('item',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
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
     

})





module.exports = Item;








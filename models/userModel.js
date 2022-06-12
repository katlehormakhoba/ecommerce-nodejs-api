const Sequelize = require('sequelize')
const sequelize =  require("../config/db") 
const bcrypt = require('bcryptjs');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
        trim:true,
        validate:{
            isAlpha: {args: true, msg: "name contains invalid characters" },
            notNull: {args:true, msg:"Please enter Surname"},
        }
    },
    surname:{
        type: Sequelize.STRING,
        allowNull: false,

        // allowNull: {args:[false], msg:"Please enter Surname"},
        trim:true,
        validate:{
            isAlpha: {args: true, msg: "Surname contains invalid characters" },
            notNull: {args:true, msg:"Please enter Surname"},

        }
    },

    email: {
        type: Sequelize.STRING , 
        allowNull: false,
        trim:true,
        validate:{
            isEmail : true
        },
    },
    userType:{
        type: Sequelize.STRING,
        defaultValue: 'user',
        trim:true,
        allowNull: false,
        validate:{
            isIn: {args:[['user', 'admin','vendor']], msg:"Invalid user type"}
        }
    },

    password:{
       type: Sequelize.STRING,
       allowNull: false,
       trim:true,
       validate:{
        len: { args:[6,10], msg:"Password should be between 6 to 10 characters"}
       }
    },
    isActive:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    // confirmPassword: {
    //     type: Sequelize.STRING,
    //     allowNull:false,
    //     validate: {
           
    //             validator(){
    //                 if(this.password !== this.confirmPassword) throw new Error(`Password do not match`)
    //             }
           
          
    //     }
    // },

    
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     

},{indexes: [{unique: true, name: 'email',fields: ['email']}]})



  
// User.beforeCreate(async (user, options) => {
  
//     user.password = await bcrypt.hash(user.password, 12);
//     console.log("im in the beforeCreate hook User", options, user)
//   });

    
User.afterValidate(async (user, options) => {


  
    user.password = await bcrypt.hash(user.password, 12);
    console.log("im in the beforeCreate hook User",  user)
  });

// User.sync({alter:true})

module.exports = User;



'use strict';
const {
  Model, DataTypes
} = require('sequelize');

//import bcyrpt to hash the password
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Course, { //associates user to have many courses
        as: 'user', //alias for the id
        foreignKey:
        {
          fieldName: 'userId',
          allowNull: false,
        }
      })
    }
  };
  //TODO add validation
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty:{
          msg: 'Please provie a first name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required'
        },
        notEmpty:{
          msg: 'Please provie a last name'
        }
      }   
  },
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        notEmpty: {
          msg: 'Please provide an email address'
        },
        validateEmail: function(value){ //adapted from Stackoverflow phonenumber regex validation post
          let regexTest = /^[\w\d]+@[\w]+\.[\w]{2,3}$/m;
          if(!(regexTest.test(value))){
            throw new Error('Invalid email address');
          }
    
        }
      }
    },
    confirmedPassword: {
      type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A password is required'
          },
          notEmpty: {
            msg: 'Please provide a password'
          },
          len: {
            args: [8, 20],
            msg: 'The password should be between 8 and 20 characters in length'
          }
        }
     
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        if ( val === this.confirmedPassword ) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        }
      }
    }
 
}, 
{
    sequelize,
    modelName: 'User',
  });
  return User;
};
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

const Application = sequelize.define("Application", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mobileNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adhar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permanentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Application;

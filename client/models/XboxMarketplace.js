"use strict";
module.exports = (sequelize, DataTypes) => {
  const videoGame = sequelize.define("videoGame", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    price: DataTypes.INTEGER
  });
  videoGame.associate = function(models) {
    // associations can be defined here
  };
  return videoGame;
};

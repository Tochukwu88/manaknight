"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeterminateConfig extends Model {}
  TeterminateConfig.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "terminateconfig",
    }
  );
  return TeterminateConfig;
};

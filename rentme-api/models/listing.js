"use strict";

module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define("Listing", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    expiryDate: DataTypes.DATE,
    archivedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  });

  return Listing;
};

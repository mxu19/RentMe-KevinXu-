"use strict";

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    itemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.TEXT,
    markAsRead: DataTypes.BOOLEAN
  });

  return Message;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const SMS = sequelize.define('SMS', {
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  SMS.associate = function(models) {
    // associations can be defined here
    SMS.belongsTo(models.Contact, {
      as: 'Sender',
      foreignKey: 'sender_id',
      onDelete: 'CASCADE'
    });

    SMS.belongsTo(models.Contact, {
      as: 'Receiver',
      foreignKey: 'receiver_id',
    });
  };
  return SMS;
};
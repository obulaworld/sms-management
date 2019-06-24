'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.hasMany(models.SMS, {
      foreignKey: 'sender_id',
      as: 'sentMessages'
    });
    Contact.hasMany(models.SMS, {
      foreignKey: 'receiver_id',
      as: 'receivedMessages'
    });
  };
  return Contact;
};
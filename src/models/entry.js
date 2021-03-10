module.exports = (sequelize, DataTypes) => {
  const table = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
  };

  const model = sequelize.define('Entry', table);

  return { model, table };
};

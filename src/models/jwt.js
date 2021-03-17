module.exports = (sequelize, SequelizeDatatype) => {
  const table = (DataTypes) => ({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
    keyId: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
  });

  const model = sequelize.define('JWT', table(SequelizeDatatype));

  return { model, table };
};

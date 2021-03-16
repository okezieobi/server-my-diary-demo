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
    tokenSigningKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
  });

  const model = sequelize.define('JWTs', table(SequelizeDatatype));

  return { model, table };
};

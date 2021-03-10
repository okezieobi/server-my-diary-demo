import bcrypt from '../utils/bcrypt';

module.exports = (sequelize, DataTypes) => {
  const table = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      notEmpty: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      notEmpty: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
      set(value) {
        this.setDataValue('password', bcrypt.hashString(value));
      },
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: 'Client',
      isIn: [['Client', 'Admin']],
    },
  };

  const model = sequelize.define('User', table, {
    classMethods: {
      associate({ Entry }) {
        this.hasManyEntries = this.hasMany(Entry, {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          foreignKey: {
            allowNull: false,
          },
        });
      },
      async compareString(hashedPassword = '', password = '') {
        return bcrypt.compareString(hashedPassword, password);
      },
    },
  });

  return { model, table };
};

import bcrypt from 'bcrypt';

export default class Bcrypt {
  static async hashString(password = '') {
    const salt = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
  }

  static async compareString(hashedPassword = '', password = '') {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default class UserSchemas {
  constructor(schema) {
    this.schema = schema;
  }

  validatePassword() {
    return this.schema({
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least 256 characters long',
          options: { min: 1, max: 256 },
        },
        isEmpty: {
          errorMessage: 'Please enter a password',
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    });
  }

  validateLogin() {
    return this.schema({
      user: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email or username should be at least 256 characters long',
          options: { min: 1, max: 256 },
        },
        isEmpty: {
          errorMessage: 'Please enter your username or email',
        },
        isString: {
          errorMessage: 'Email or username must be string data type',
        },
        exists: {
          errorMessage: 'Email or username is required',
          options: { checkFalsy: true },
        },
      },
    });
  }

  validateSignup() {
    return this.schema({
      username: {
        in: ['body'],
        isLength: {
          errorMessage: 'Username should be at least 256 characters long',
          options: { min: 1, max: 256 },
        },
        isEmpty: {
          errorMessage: 'Please enter your username',
        },
        isString: {
          errorMessage: 'Username must be string data type',
        },
        exists: {
          errorMessage: 'Username is required',
          options: { checkFalsy: true },
        },
      },
      fullName: {
        in: ['body'],
        isLength: {
          errorMessage: 'Full name should be at least 256 characters long',
          options: { min: 1, max: 256 },
        },
        isEmpty: {
          errorMessage: 'Please enter your full name',
        },
        isString: {
          errorMessage: 'Full name must be string data type',
        },
        exists: {
          errorMessage: 'Full name is required',
          options: { checkFalsy: true },
        },
      },
      email: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email should be at least 256 characters long',
          options: { min: 1, max: 256 },
        },
        isEmpty: {
          errorMessage: 'Please enter your email',
        },
        isString: {
          errorMessage: 'Email must be string data type',
        },
        exists: {
          errorMessage: 'Email is required',
          options: { checkFalsy: true },
        },
        isEmail: {
          errorMessage: 'Email format is wrong',
        },
      },
    });
  }
}

export default class UserMiddleWare {
  constructor(validations, controllers) {
    this.signup = [...validations.user.signup, controllers.user.signup, controllers.user.setJWT];
    this.login = [...validations.user.login, controllers.user.login, controllers.user.setJWT];
    this.jwt = [...validations.user.jwt, controllers.user.authJWT];
    this.logout = controllers.user.logout;
    this.getUser = controllers.user.getUser;
  }
}

export default class User {
    constructor(user_id, login, password) {
        this.user_id = user_id;
        this.login = login;
        this.password = password;
        this.tokens = [];
    }
}
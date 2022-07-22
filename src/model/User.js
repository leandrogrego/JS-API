var crypto = require('crypto');
const sha256 = ( code ) => {
    const sha256Hasher = crypto.createHmac("sha256", code);
    const hash = sha256Hasher.update(code).digest("hex");
    return hash;
};

const newToken = ( time ) => {
    return sha256(this.email + this.password + time);
};

const checkPassword = ( password ) => {
    var check  = sha256(this.email+password+this.created)
    return this.password == check
};

const checkToken =( time, token ) => {
    var check  = sha256(this.email+this.password+time)
    return check == token
};

module.exports = class User {
    
    constructor( { id, name, email, number } ) {
        this.id = id;
        this.code = null;
        this.created = `${new Date().getTime()}`;
        this.email = email;
        this.email_validated = false;
        this.name = name;
        this.number = number;
        this.number_validated = false;
        this.perfil = 0;
        this.token = newToken(this.created);
    };

}
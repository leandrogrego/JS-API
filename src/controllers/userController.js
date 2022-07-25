const api = require("../services/api")

exports.get = async (req, res, next) => {
    var id = req?.params?.id || req?.query?.id 
    res.status(200).send( 
        id?
        await api.getUserById(id)
        : await api.getUsers()
    )
};

exports.post = (req, res, next) => {
    res.status(201).send(api.addUser(req.params));
};

exports.put = (req, res, next) => {
    var id = req?.params?.id || req?.query?.id 
    id?
    res.status(201).send(api.updateUser(req.params))
    : {}
};

exports.delete = (req, res, next) => {
    var id = req?.params?.id || req?.query?.id 
    id?
    res.status(200).send(api.removeUser(id))
    : {}
};
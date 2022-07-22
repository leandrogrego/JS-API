const express = require('express');
var { name, version} = require('../../package.json')
const router = express.Router();
router.get('/', function (req, res, next) {
    res.status(200).send(
        {
            title: name, 
            version: version,
            endpoints: [
                {
                    name : 'List Users',
                    url: `${req.headers.host}/user/`,
                    method: 'get',
                },
                {
                    name : 'Get User',
                    url: `${req.headers.host}/user/`,
                    method: 'get',
                    params: {
                        id: 0,
                    }
                },
                {
                    name: 'Add User',
                    url: `${req.headers.host}/user/`,
                    method: 'post',
                    body: {
                        name: 'name', 
                        email: 'email', 
                        number: 'number'
                    }
                },
                {
                    name : 'Update User',
                    url: `${req.headers.host}/user/`,
                    method: 'put',
                    body: {
                        id: 0,
                        name: 'name', 
                        email: 'email', 
                        number: 'number'
                    }
                },
                {
                    name : 'Remove User',
                    url: `${req.headers.host}/user/`,
                    method: 'delete',
                    params: {
                        id: 0,
                    }
                },
            ]
        }
    )
})

module.exports = router;
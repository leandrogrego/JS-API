const session = require('./session');
const User = require('../model/User');
const GRAU = 111.320;

const userMap = session.tableMap(
    { 
        name : User.name, 
        fields : Object.getOwnPropertyNames(new User({}))
    }
)

const gets = async (array) => {
    var result = []
    await array.map(element => {
        result.push({ ... element })
    })
    return result.length > 1? result : result[0]
}

const addUser = async (user) => {
    if ( user?.email && !getUserByEmail(user.email) )
    return get(
        await userMap.Insert(new User(user)).affectedRows
    ) 
    return null
}

const getUsers = async ()=> {
    return gets(
        await session.query( userMap ).select()
    )
}

const getUserById = async (id)=> {
    return gets(
        await session.query( userMap ).where(
            userMap.id.Equal(id)
        )
    )
}

const getUserByEmail = async (email)=> {
    return gets(
        await session.query( userMap ).where(
            userMap.email.Equal(email)
        )
    )
}

const getUserByToken = async (token)=> {
    return gets(
        await session.query( userMap ).where(
            userMap.token.Equal(token)
        )
    )
}

// A DESENVOLVER
const getUsersByDistance = async ( latitude, longitude, distance ) => {
    return get(
        await session.query( location ).where(
            userMap.location.latitude.MoreEqual(latitude - (distance*GRAU)).And().location.latitude.LessEqual(latitude + (distance*GRAU)).And()
               .location.longitude.MoreEqual(longitude + (distance*GRAU)).And().location.longitude.LessEqual(longitude + (distance*GRAU)).And()
        )
    )
}

module.exports = {
    addUser, getUsers, getUserById, getUserByToken, getUsersByDistance
};
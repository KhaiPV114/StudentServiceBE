const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const client = require("./redis.config")
const os = require("os")

module.export = {
    //create accress token
    signAccessToken: (user) => {
        return new Promise ((resolve, reject) => {
            const payload = {
                email: user.email,
                name: user.name, 
            };

            const secret = process.env.ACCESS_JWT_SECRET
            const option = {
                expiresIn: '5h'
            };

            JWT.sign(payload, secret, option, (err, token) => {
                if(err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError);
                }
                resolve(token)
            });
        });
    },

    //create refresh token
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_JWT_TOKEN
            const option = {
                expiresIn: '7d'
            }

            JWT.sign(payload, secret, option, async (err, token) => {
                if(err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError);
                }

                // save refresh to redis
                await client.set()

                resolve(token)
            })
        })
    }
}

# bcore-jwt
a jwt mini-server of bcore 


just wrapper [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package ,and register it as `bcore`'s mini-server

only exports two functions:

**sign(payload)**:

* generate jwt token string
* return `Promise`
* `payload` is HashMap

**verify(token)**:

* return `Promise`
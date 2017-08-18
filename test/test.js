require('../index')

const MiniServer = require('bcore/lib/mini-server-center')

class JWTCLA {
    constructor() {}

    async test() {

        console.log(this.msrv.jwt)

        let token = await this.msrv.jwt.sign({
            sub: 'userID'
        })

        console.log('token:', token)

        let payload = await this.msrv.jwt.verify(token)

        console.log('payload:', payload)
    }
}

let obj = new JWTCLA()

MiniServer
    .load('testApp', 'jwt', {
        secret: 'buns.li',
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    })
    .then(() => {

        MiniServer.injection('testApp', obj)

        obj.test()

    })
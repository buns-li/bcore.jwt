const bcore = require('bcore')

const jwt = require('jsonwebtoken')

const PAYLOAD_DEFAULT_KEYS = ['exp', 'nbf', 'sub', 'aud', 'iss']

bcore.on('jwt', {
    alg: 'HS256',
    secret: 'bcore-jwt',
    cert: '',
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, function () {

    this.__init = function (options) {

        this.payload = {}

        PAYLOAD_DEFAULT_KEYS.forEach(item => {
            if (options[item]) {
                this.payload[item] = options[item]
            }
        })

        this.secretOrPrivateKey = options.privateKey || options.secret

        this.secretOrPublichKey = options.publicKey || options.secret

        this.alg = options.alg || 'HS256'
    }

    this.sign = function (payload) {

        let curPayload

        if (!payload) {
            curPayload = this.payload
        } else {
            curPayload = Object.assign(this.payload, payload)
        }

        return new Promise((resolve, reject) => {
            jwt.sign(curPayload, this.secretOrPrivateKey, {
                algorithm: this.alg
            }, (err, token) => err ? reject(err) : resolve(token))
        })
    }

    this.verify = function (token) {

        return new Promise((resolve, reject) => {

            jwt.verify(token, this.secretOrPublichKey, {
                algorithms: [this.alg]
            }, (err, payload) => err ? reject(err) : resolve(payload))

        })
    }

})

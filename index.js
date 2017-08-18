const bcore = require('bcore')

const jwt = require('jsonwebtoken')

const PAYLOAD_DEFAULT_KEYS = ['exp', 'nbf', 'sub', 'aud', 'iss']

const confSymbol = Symbol('jwt#conf')

bcore.on('jwt', {
    alg: 'HS256',
    secret: 'bcore-jwt',
    cert: '',
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, function() {

    this.__init = function(options) {

        let conf = {}

        conf.payload = {}

        PAYLOAD_DEFAULT_KEYS.forEach(item => {
            if (options[item]) {
                conf.payload[item] = options[item]
            }
        })

        conf.secretOrPrivateKey = options.privateKey || options.secret

        conf.secretOrPublichKey = options.publicKey || options.secret

        conf.alg = options.alg || 'HS256'

        this[confSymbol] = conf
    }

    /**
     * 签名
     *
     * @param {Hash} payload 载荷
     *
     * @return {Promise}
     */
    this.sign = function(payload) {

        let conf = this[confSymbol]

        let curPayload = payload ? Object.assign(conf.payload, payload) : conf.payload

        return new Promise((resolve, reject) => {
            jwt.sign(curPayload, conf.secretOrPrivateKey, {
                algorithm: conf.alg
            }, (err, token) => err ? reject(err) : resolve(token))
        })
    }

    /**
     * 签证签名
     * 
     * @param {String} token 待验证的签名字符串
     * 
     * @return {Promise}
     */
    this.verify = function(token) {

        let conf = this[confSymbol]

        return new Promise((resolve, reject) => {

            jwt.verify(token, conf.secretOrPublichKey, {
                algorithms: [conf.alg]
            }, (err, payload) => err ? reject(err) : resolve(payload))

        })
    }

})
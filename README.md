# bcore-jwt

bcore微服务--jwt认证

基于 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## API

**sign(payload)**:
生成签名

* `payload`:[`Hash`]:载荷

```js
 this.msrv.hashpsw.sign({}).then().catch()
```

**verify(token)**:
验证签名字符串

* `token`:[`String`] 已签名的字符串

```js
 this.msrv.hashpsw.verify({}).then().catch()
```
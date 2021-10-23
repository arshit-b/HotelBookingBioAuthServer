import NodeRSA from 'node-rsa';
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy+UG5gH0HoLcdlerfXN7esnA/NJKYp4m5SJ9O4ntT+oPdba9qKhiLqZKnnxTsdW91VvULGVq0kOD0R/664TgPXicPqK/2SqQ0ZfdcdsRVuOsU07xxq8x0kbzf/AIn0eNPg2FJb+DHkmCLy/vF1EGL/0x+8YK2NSJhwxBvb27y1pEzAHQ4Xe/Sl62/dn1Vwez+bBJbU7AikGcJWCjaBdwoDuvbF3mm6AryNXb9/8PLpQaERDwKFUn25H3YYd/n9y/YdmvPDkrvSlfkXupni5dqRmKEkd8oDHgxHu8Jzgap++7Qo/aPzqKFVnbfqItTgvS1/YOko4BdM6gao+B+oobswIDAQAB'
const payload = 'some test payload'
const signature = 'QRlk23usAv7rl2kmX3xJi8O0oSRl0n+w4j2PYxbgPsdtlJlQHtsZ2HARHXmmASUE8GmOXJ3jZuGVN49ayjKxkOeUhvx+GHCrOXNGKAp5hM1dUaqiOo1QhxGRpZbpUHD4XNgMFaLNYOY6B5EJOnp5KNUcJQBpJLdnfzph7TBeqtBtJZ0lMn1cT+b71R5u7dFfrt6RKZisGIMp4cFzCmZfm2s4ZtGPhFaJU8jMkyg6uOJeeVh+ew3y7Jma95px6ha/54mSpvA3EpYSvExFpaLtLHnmruOouXjEFcLmVGJnkoBvc9KPhm0oeECC6cs0SreMN97DCI7qfMFw9fp8VAMErg=='
const publicKeyBuffer = Buffer.from(publicKey, 'base64')
const key = new NodeRSA()
const signer = key.importKey(publicKeyBuffer, 'public-der')
const signatureVerified = signer.verify(Buffer.from(payload), signature, 'utf8', 'base64')

console.log(signatureVerified)
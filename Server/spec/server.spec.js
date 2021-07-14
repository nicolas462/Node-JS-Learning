var request = require('request') //for http requests testing

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4)
    })
})

describe('get messages', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done() // Async
        })
    })
    it('should return list not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done() // Async
        })
    })
})

describe('get message from user', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done() // Async
        })
    })
    it('user should be John', (done) => {
        request.get('http://localhost:3000/messages/John', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('John')
            done() // Async
        })
    })
})
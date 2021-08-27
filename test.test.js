describe("app-service", () =>{
  describe("exception", () => {
    it('should print help is not a valid command if no argv is passed',async () => {
      process.argv = ['node', 'app.js']
      try {
        const response = require('./app')      
      } catch (error) {
        expect(error).toEqual('help is not a valid command!')      
      }
    })
    it('should print help is not a valid command if an invalid argv is passed',async () => {
      process.argv = ['node', 'app.js', '--invalid']
      try {
        const response = require('./app')      
      } catch (error) {
        expect(error).toEqual('help is not a valid command!')      
      }
    })
  })
})
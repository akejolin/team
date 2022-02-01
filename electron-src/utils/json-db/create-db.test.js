/**
* @desc Test to write cache file.
*/
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const createDB = require('./create-db')

createDB('mock-cache', 'db-test.json', {hello: 'world!'})

const diskPath = path.resolve('.', 'mock-cache')

describe('createDB', () => {
  it('should make sure dir exists and create a file in it', async () => {
    await fs.readFile(`${diskPath}/db-test.json`, 'utf8', (err, data) => {
      expect(data).toEqual('{"hello":"world!"}')
      shell.rm('-fr', diskPath)
    })
  })
})

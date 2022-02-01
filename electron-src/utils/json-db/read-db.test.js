/**
* @desc Test function that reads a file and import data
*/

const readDB = require('./read-db')

describe('readDB', () => {
  it('should read some data from a file on disk', async () => {
    const data = await readDB('mock', 'test-db.json')
    expect(data).toEqual([{"great":"success"}])
  })
})






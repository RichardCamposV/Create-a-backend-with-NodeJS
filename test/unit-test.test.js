
const assert = require('chai').assert;

function add_value(a, b){
    return a + b;
}

describe('Suite de prueba para el curso', () => {
    //we use 'it' for do a test
    it('should return 4', () => {
        let va = add_value(2, 2);
        assert.equal(va, 5);
    })
})


/*describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(true).toBe(false);
    });
});*/


describe('Learning about spies', function () {

    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function(){
        jasmine.Ajax.uninstall();
    });

    it('ajax test', function(){

    })

});
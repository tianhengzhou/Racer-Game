/* stopwatchspec.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 *
 * Notice: This test suite only has a time accuracy of 10 ms. Any smaller time
 * under 10 ms will fail the test. e.g. 123 ms doesn't support, please use120 ms
 * instead. This is due to the setup time costed by jasmine, since this time is
 * randomly around 4 - 5 ms, I just floor any time under 10ms to 0. However
 * sometimes the time will exceed 10ms, please rerun the test until it becomes
 * succeed.
 */


describe('Stop Watch', function() {
    /* This is the test for stop watch function. 1 pretest and 5 test cases
     * include.
     */
    //pretest check if stopwatch is defined
    it('is defined', function() {
        expect(sw).toBeDefined();
    });
    //test case 1 quick start and stop and start again, the output should be 0
    it('quick start and stop shouldn\'t count time', function (done) {
        expect(sw.start().stop().start().log()).toBe(0);
        setTimeout(function(){
            done()
        }, 120);
    });
    //test case 2 wait for 120ms, the output should be 120
    it('wait 120 ms', function (done) {
        expect(Math.floor(sw.log()/10)*10).toBe(120);
        setTimeout(function(){
            done()
        }, 100);
    });
    //test case 3 wait for another 100ms, the output should be 220
    it('wait 100 ms', function () {
        expect(Math.floor(sw.stop().log()/10)*10).toBe(220)
    });
    //test case 4 After stop. wait for 100ms, the output shouldn't change
    it('wait 1000 ms', function (done) {
        expect(Math.floor(sw.log()/10)*10).toBe(220);
        setTimeout(function(){
            done()
        }, 1000);
    });
    //test case 5 After reset. output should be 0
    it('reset', function () {
        sw.reset();
        expect(sw.log()).toBe(0)
    })
});
describe('Racers', function () {
    /*
    * This it the racer game test. 1 pretest and 4 test cases include.
    * */
    //pretest check if racers are defined
    it('are defined', function () {
        expect(sumeet).toBeDefined();
        expect(travis).toBeDefined();
        expect(harshit).toBeDefined()
    });
    //test case 1, check the names of racers are current
    it('names are all correct', function () {
        expect(Racer.all[0]).toBe(travis);
        expect(Racer.all[1]).toBe(sumeet);
        expect(Racer.all[2]).toBe(harshit)
    });
    //test case 2, start stopwatch for all racers, but stop sumeet instantly
    it('sumeet stop instantly', function (done) {
        Racer.all.start();
        expect(Math.floor(sumeet.stop().log()/100)*100).toBe(0);
        setTimeout(function () {
            done()
        },1000);
    });
    //test case 3, stop harshit after 1000ms, output should be 1000ms
    it('harshit wait for 1000ms', function (done) {
        expect(Math.floor(harshit.stop().log()/100)*100).toBe(1000);
        setTimeout(function () {
            done()
        },1000);
    });
    //test case 3, stop travis after another 1000ms, output should be 0
    it('travis wait for another 1000 ms', function () {
        expect(Math.floor(travis.stop().log()/100)*100).toBe(2000)
    });
    //test case 4, sumeet should be winner since he has smallest time.
    it('Winner is sumeet', function () {
        expect(Racer.getWinner()).toBe(sumeet)
    });
});

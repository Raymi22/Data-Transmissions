function test(){
 console.log(getFibonacci(2)==[1, 1]?"Passed":"Failed");
 console.log(getFibonacci(3)==[1, 1, 2]?"Passed":"Failed");
 console.log(getFibonacci(4)==[1, 1, 2, 3]?"Passed":"Failed");
 console.log(getFibonacci()=="not allowed"?"Passed":"Failed");
 }

function testString(){
    console.log("Testing string...");
    console.log(getFibonacci("sdads")=="not allowed"?"Passed":"Failed");
 }
function testBool(){
    console.log("Testing boolean...");
    console.log(getFibonacci(true)=="not allowed"?"Passed":"Failed");
 }
 test();
 testString();
 testBool();
 
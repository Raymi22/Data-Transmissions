function test(){
 console.log(sum(0)==0?"Passed":"Failed");
 console.log(sum(2)==3?"Passed":"Failed");
 console.log(sum(4)==10?"Passed":"Failed");
 console.log(sum()=="n is undefined"?"Passed":"Failed");
 }

function testString(){
    console.log("Testing string...");
    console.log(sum("sdads")=="n is not a number"?"Passed":"Failed");
 }
function testBool(){
    console.log("Testing boolean...");
    console.log(sum(true)=="n is not a number"?"Passed":"Failed");
 }
 testString();
 testBool();
 
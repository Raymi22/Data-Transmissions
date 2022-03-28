var api = require('./api.js').app;
var hamming = require('./hamming.js');

api.put('/message', function(request, response) {
  var bits = request.body.bits;
  bits = distortBit(bits);

  console.log("\n Received sequence: " + bits + "\n");

  var decoded = hamming.decode(bits);
  if(decoded.errorCorrected){
    console.log('One error corrected on position: '+decoded.errorPosition);
    response.json('One error corrected on position: '+decoded.errorPosition);
  }
  else if(decoded.errorDetected){
    console.log('More than 1 error found. Errors could not be corrected.');
    response.json('More than 1 error found. Errors could not be corrected.');
  }
  else{
    response.json('Message received without errors');
  }
  
});

api.listen(3001, function(){
  console.log('CORS-enabled web server is listening on port 3001...');
});

function distortBit(bits){
  var errors = Math.floor(Math.random() * 3);
  for(let i=0;i<errors;i++) {
    var index = Math.floor(Math.random() * bits.length);
    bits[index] = (bits[index]+1) % 2;
  }
  return bits;
}
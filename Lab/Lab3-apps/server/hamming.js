function decode(bits) {
	var z4=parity(bits[4]+bits[5]+bits[6]+bits[7]);
	var z2=parity(bits[2]+bits[3]+bits[6]+bits[7]);
	var z1=parity(bits[1]+bits[3]+bits[5]+bits[7]);
	var z0=parity(bits[1]+bits[2]+bits[4]+bits[6]+bits[3]+bits[5]+bits[7]);
    
    var errorPosition=z1*1+z2*2+z4*4;
	var errorDetected=false;
	var errorCorrected=false;
	if (errorPosition!=0 || z0!=bits[0]) errorDetected=true;
	if (errorDetected) {
		if (z0!=0 && errorPosition!=0) {		
			errorCorrected=true;
		}
		else if (z0!=0) {
			bits[0]=parity(z0+1);
			errorCorrected=true;
		}
	}
    return { errorDetected: errorDetected, errorCorrected: errorCorrected, errorPosition: errorPosition, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;

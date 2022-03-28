document.getElementById("n").addEventListener('input',inputSum );

 function inputSum(){
	var inputNumber = parseInt(document.getElementById("n").value );
	console.log(getFibonacci(inputNumber));
}

 function getFibonacci(n){
	if (typeof n != 'number' || n<2) return "not allowed";
	let list = [1, 1]
	for(var i=3;i<=n;i++){
		console.log(list[list.length-2]);
		console.log(list[list.length-1]);
		list.push(list[list.length-2] + list[list.length-1]);
	}
	return list;
 }
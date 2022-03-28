document.getElementById("plus").addEventListener("click",add);
document.getElementById("minus").addEventListener("click",subtract);
document.getElementById("mult").addEventListener("click",multiply);
document.getElementById("div").addEventListener("click",divide);

function add(){
	result=$("#firstNumber").val()+$("#secondNumber").val();
	printValue("result", result);
}

function subtract(){
	result=$("#firstNumber").val()-$("#secondNumber").val();
	printValue("result", result);
}

function divide(){
	result=$("#firstNumber").val()/$("#secondNumber").val();
	printValue("result", result);
}

function multiply(){
	result=$("#firstNumber").val()*$("#secondNumber").val();
	printValue("result", result);
}
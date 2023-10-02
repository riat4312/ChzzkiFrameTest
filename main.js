var Money = 0;
var Workers = 0;
var Money_display = document.getElementById("MoneyX");
var Worker_display = document.getElementById("WorkerX");

function Display() {
	Money_display.textContent = Money;
	Worker_display.textContent = Workers;
}

function WorkingClick() { Money = Money + 100; }
function HiringClick() { Workers = Workers + 1; }

function MoneyUpdate() {
	Money = Money + Workers * 10;
	/*document.getElementById("Num1").textContent = money;*/
}

setInterval(Display, 10);
setInterval(MoneyUpdate, 100);
let Money = 0;
let Workers = 0;
let WorkSpeed = 100;
let TickSpeed = 1000;
let Money_display = document.getElementById("MoneyX");
let Worker_display = document.getElementById("WorkerX");
let WorkSpeed_display = document.getElementById("WorkSpeedX");

function Display() {
	Money_display.textContent = Money;
	Worker_display.textContent = Workers;
	WorkSpeed_display.textContent = WorkerSpeed;
}

function WorkingClick() { Money = Money + 100; }
function HiringClick() { Workers = Workers + 1; }

function MoneyUpdate() { Money = Money + Workers * 10; }

function WorkSpeedUpdate() {
	let Tick = setInterval(MoneyUpdate, TickSpeed);
	clearInterval(Tick);
	WorkSpeed = WorkSpeed * 1.1;
	TickSpeed = TickSpeed * 0.9;
	setInterval(MoneyUpdate, TickSpeed);
}

setInterval(Display, 10);


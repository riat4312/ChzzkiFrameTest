let Money = 0; let Workers = 0; let Machine = 0; let iGrowth = 0;
let Money_display = document.getElementById("MoneyX");
let Worker_display = document.getElementById("WorkerX");
let Machine_display = document.getElementById("MachineX");
let infGrowth_display = document.getElementById("infGrowthX");

function Display() {
	Money_display.textContent = Money.toLocaleString('ko');
	Worker_display.textContent = Workers.toLocaleString('ko');
	Machine_display.textContent = Machine.toLocaleString('ko');
	iGrowth_display.textContent = iGrowth.toLocaleString('ko');
}

function BasicClick() { Money = Money + 100; }
function WorkerClick() { Workers = Workers + 1; }
function MachineClick() { Machine = Machine + 1; }
function iGrowthClick() { infGrowth = iGrowth + 1; }

function MoneyUpdate() {
	Money = Money + Workers * 10;
	/*if ( Money >= 1000000000000 ) { Money = 1000000000000; };*/
}
function EmployUpdate() { Workers = Workers + Machine; }
function iGrowthUpdate() { Machine = Machine + infGrowth; }

setInterval(Display, 10);
setInterval(MoneyUpdate, 100);
setInterval(EmployUpdate, 100);
setInterval(iGrowthUpdate, 100);

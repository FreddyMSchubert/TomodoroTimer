let workTime = 25 * 60;
let breakTime = 5 * 60;

let isWorkMode = true;
let isRunning = false;

let intervalId;
let timeLeft = workTime;

let currentCaption;
getTomCaption(false, true).then(result => {
    currentCaption = result;
    updateDisplay();
});



function updateDisplay()
{
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;

	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
		
	document.getElementById('time').innerText = updateTextBox(isWorkMode, currentCaption, `${minutes}:${seconds}`);
}



function togglePlayPause()
{
	isRunning = !isRunning;
	document.getElementById('play-pause').innerText = isRunning ? '||' : '|>';

	if (isRunning)
	{
		getTomCaption(isWorkMode, false).then(result => {
			currentCaption = result;
			updateDisplay();
		});
		
		intervalId = setInterval(() =>
		{
			timeLeft--;
			if (timeLeft <= 0)
				toggleMode();
			updateDisplay();
		}, 1000);
	}
	else
	{
		clearInterval(intervalId);
	}
}
function toggleMode()
{
	isWorkMode = !isWorkMode;
	timeLeft = isWorkMode ? workTime : breakTime;
	getTomCaption(isWorkMode, false).then(result => {
		currentCaption = result;
		updateDisplay();
	});
	updateDisplay();
}
function resetTimer()
{
	timeLeft = isWorkMode ? workTime : breakTime;
	updateDisplay();
}



document.getElementById('play-pause').addEventListener('click', togglePlayPause);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('skip').addEventListener('click', toggleMode);
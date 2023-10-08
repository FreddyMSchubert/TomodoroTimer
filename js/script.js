let workTime = 25 * 60;
let breakTime = 5 * 60;

let isWorkMode = true;
let isRunning = false;
let isLimitDistractionsMode = false;

let startWorkAutomatically = false;
let startBreakAutomatically = true;

let intervalId;
let timeLeft = workTime;

let currentCaption;
let currentFace;
getTomCaption(false, true).then(result => {
    currentCaption = result.text;
	currentFace = result.face;
    updateDisplay();
});



function updateDisplay()
{
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;

	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	document.getElementById('time').innerText = updateTextBox(isWorkMode, currentCaption, currentFace, `${minutes}:${seconds}`);

	// webpage title
	let mode_emoji = isWorkMode ? '👩‍💻' : '☕️';
	document.title = `${mode_emoji} ${minutes}:${seconds} | P0M0D0R0 T1M3R`;
}



function togglePlayPause()
{
	isRunning = !isRunning;

	if (isRunning)
	{
		getTomCaption(isWorkMode, false).then(result => {
			currentCaption = result.text;
			currentFace = result.face;
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
    
    // Get a new caption for the next mode
    getTomCaption(isWorkMode, false).then(result => {
        currentCaption = result.text;
		currentFace = result.face;
        updateDisplay();
    });

    if (isRunning) {
        if ((isWorkMode && startWorkAutomatically) || (!isWorkMode && startBreakAutomatically)) {
        } else {
            togglePlayPause();
        }
    }
    
    updateDisplay();
}
function resetTimer()
{
	timeLeft = isWorkMode ? workTime : breakTime;
	updateDisplay();
}

// pass in nothing for toggle, boolean for specific state
function toggleDistractionMode(shouldHide) {
    const distractions = document.querySelectorAll('.distraction');
    
    distractions.forEach(distraction => {
        if (typeof shouldHide !== 'undefined') {
            shouldHide ? distraction.classList.add('hidden') : distraction.classList.remove('hidden');
        } else {
            distraction.classList.toggle('hidden');
        }
    });
}



window.addEventListener('keydown', function(e)
{
	if (document.activeElement.contentEditable === 'true' || document.activeElement === taskInput)
        return;

	switch (e.code) {
		case 'Space':
		case 'KeyP':
			togglePlayPause();					// Play / pause
			break;
		case 'KeyR':
		case 'ArrowLeft':
			resetTimer();						// Reset
			break;
		case 'KeyS':
		case 'ArrowRight':
			toggleMode();						// Skip
			break;
		case 'KeyO':
			popup.classList.toggle('hidden');	// Settings
			break;
		case 'KeyD':
			toggleDistractionMode();
			break;
		case 'KeyF':							// Fullscreen
			if (!this.document.fullscreenElement)
			{
				this.document.documentElement.requestFullscreen();
				toggleDistractionMode(true);
			}
			else
			{
				this.document.exitFullscreen();
				toggleDistractionMode(false);
			}
			break;
		default:
			break;
	}
	
}, false);
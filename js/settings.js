/* ----- POPUP ----- */
const popup = document.getElementById('popup');

document.addEventListener('click', (event) => {
  if (event.target !== popup && !popup.contains(event.target)) {
    popup.classList.add('hidden');
  }
});


/* ----- SETTINGS ----- */
function updateTimes()
{
    const workDurationInput = document.getElementById('workDurationInput');
    const breakDurationInput = document.getElementById('breakDurationInput');
    workTime = workDurationInput.value * 60;
    breakTime = breakDurationInput.value * 60;
}
function updateColors()
{
    const foregroundColorInput = document.getElementById('foregroundColorInput');
    const backgroundColorInput = document.getElementById('backgroundColorInput');
    document.documentElement.style.setProperty('--second-color', foregroundColorInput.value);
    document.documentElement.style.setProperty('--first-color', backgroundColorInput.value);

    // calculate the new color for readable links
    const r = parseInt(backgroundColorInput.value.slice(1, 3), 16);
    const g = parseInt(backgroundColorInput.value.slice(3, 5), 16);
    const b = parseInt(backgroundColorInput.value.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    document.documentElement.style.setProperty('--link-color', luminance > 0.5 ? '#000000' : '#ffffff');
}
function updateAutoContinue()
{
  const startWorkAutomaticallyUpdated = document.getElementById('startWorkAutomatically').checked;
  const startBreakAutomaticallyUpdated = document.getElementById('startBreakAutomatically').checked;
  startBreakAutomatically = startBreakAutomaticallyUpdated;
  startWorkAutomatically = startWorkAutomaticallyUpdated;
}


/* ----- LOCAL STORAGE SAVE ----- */
function saveSettings() {
  localStorage.setItem('workTime', workTime);
  localStorage.setItem('breakTime', breakTime);
  localStorage.setItem('foregroundColor', document.documentElement.style.getPropertyValue('--second-color'));
  localStorage.setItem('backgroundColor', document.documentElement.style.getPropertyValue('--first-color'));
  localStorage.setItem('startWorkAutomatically', startWorkAutomatically);
  localStorage.setItem('startBreakAutomatically', startBreakAutomatically);
}

function loadSettings() {
  const savedWorkTime = localStorage.getItem('workTime');
  const savedBreakTime = localStorage.getItem('breakTime');
  const savedForegroundColor = localStorage.getItem('foregroundColor');
  const savedBackgroundColor = localStorage.getItem('backgroundColor');
  const savedStartWorkAutomatically = localStorage.getItem('startWorkAutomatically') === 'true';
  const savedStartBreakAutomatically = localStorage.getItem('startBreakAutomatically') === 'true';

  if (savedWorkTime) document.getElementById('workDurationInput').value = savedWorkTime / 60;
  if (savedBreakTime) document.getElementById('breakDurationInput').value = savedBreakTime / 60;
  if (savedForegroundColor) document.getElementById('foregroundColorInput').value = savedForegroundColor;
  if (savedBackgroundColor) document.getElementById('backgroundColorInput').value = savedBackgroundColor;
  if (savedStartWorkAutomatically) document.getElementById('startWorkAutomatically').checked = savedStartWorkAutomatically;
  if (savedStartBreakAutomatically) document.getElementById('startBreakAutomatically').checked = savedStartBreakAutomatically;

  // Call the update functions to apply the loaded settings
  updateTimes();
  updateColors();
  updateAutoContinue();
}

document.addEventListener('DOMContentLoaded', loadSettings);

/* ----- LISTENERS ----- */
document.getElementById('workDurationInput').addEventListener('input', () => { updateTimes(); saveSettings(); });
document.getElementById('breakDurationInput').addEventListener('input', () => { updateTimes(); saveSettings(); });
document.getElementById('foregroundColorInput').addEventListener('input', () => { updateColors(); saveSettings(); });
document.getElementById('backgroundColorInput').addEventListener('input', () => { updateColors(); saveSettings(); });
document.getElementById('startWorkAutomatically').addEventListener('input', () => { updateAutoContinue(); saveSettings(); });
document.getElementById('startBreakAutomatically').addEventListener('input', () => { updateAutoContinue(); saveSettings(); });

/* ---- SETTINGS RESET ----- */

const defaultSettings = {
  workTime: 25 * 60,
  breakTime: 5 * 60,
  foregroundColor: '#00ff00',
  backgroundColor: '#000000',
  startWorkAutomatically: false,
  startBreakAutomatically: true
};

function resetToDefault() {
  document.getElementById('workDurationInput').value = defaultSettings.workTime / 60;
  document.getElementById('breakDurationInput').value = defaultSettings.breakTime / 60;
  document.getElementById('foregroundColorInput').value = defaultSettings.foregroundColor;
  document.getElementById('backgroundColorInput').value = defaultSettings.backgroundColor;
  document.getElementById('startWorkAutomatically').checked = defaultSettings.startWorkAutomatically;
  document.getElementById('startBreakAutomatically').checked = defaultSettings.startBreakAutomatically;

  updateTimes();
  updateColors();
  updateAutoContinue();

  saveSettings();
}

document.getElementById('resetButton').addEventListener('click', resetToDefault);
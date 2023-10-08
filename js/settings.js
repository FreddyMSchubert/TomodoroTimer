const popup = document.getElementById('popup');

document.addEventListener('click', (event) => {
  if (event.target !== popup && !popup.contains(event.target)) {
    popup.classList.add('hidden');
  }
});



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

document.getElementById('workDurationInput').addEventListener('input', updateTimes);
document.getElementById('breakDurationInput').addEventListener('input', updateTimes);
document.getElementById('foregroundColorInput').addEventListener('input', updateColors);
document.getElementById('backgroundColorInput').addEventListener('input', updateColors);
document.getElementById('startWorkAutomatically').addEventListener('input', updateAutoContinue);
document.getElementById('startBreakAutomatically').addEventListener('input', updateAutoContinue);

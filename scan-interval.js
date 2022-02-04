const scanBtn = document.getElementsByClassName("gui-cmd-btn-scan gui-action-btn")[0];
const buttonsDiv = document.getElementById("app-page-btns");

let intervalId = 0; // id of the interval that will press start button every n seconds
let interval = 0; // number of (minimum) millis to wait until the next scan

/**
 * Call this to start an interval to click the scan button every {@code interval} seconds
 */
const start = () => {
	if (intervalId) { // if it is a truthy, the interval may still be running. Don't start a new interval
		alert("Interval is running. Stop it first");
		return;
	}
	intervalId = setInterval(() => scanBtn.click(), interval);
	console.log(`${interval / 1_000}s interval has started. Interval id: ${intervalId}`);
};

/**
 * Call this to stop the interval initiated by its counterpart start
 */
const stop = () => {
	if (!intervalId) // if falsy, there is no interval running
		return;
	clearInterval(intervalId);
	intervalId = 0;
};

// create range input to allow user select the interval
const template = document.createElement("template");
template.innerHTML = `<div style="display: flex; align-items: center; gap: 0.5rem">
	<input type="button" id="stop-interval" class="gui-action-btn" value="Stop interval" style="width: 100px; text-align: center;">
	<input type="range" id="scan-interval" min="5" max="60" value="10" step="1">
	<span id="scan-interval-indicator">10 s</span>
</div>`.trim();
const intervalInput = template.content.getElementById("scan-interval");
const intervalIndicator = template.content.getElementById("scan-interval-indicator");
const stopIntervalBtn = template.content.getElementById("stop-interval");
intervalInput.addEventListener("input", () => { // when the input changes update the ui and interval value
	interval = parseInt(intervalInput.value) * 1_000; // the interval value should be in milliseconds
	intervalIndicator.innerText = `${intervalInput.value} s`;
});
stopIntervalBtn.onclick = (e) => {
	stop();
	e.preventDefault();
}

// start the interval as soon the user presses scan for the first time
scanBtn.addEventListener("click", start);

buttonsDiv.getElementsByClassName("btn-list")[0].appendChild(template.content);

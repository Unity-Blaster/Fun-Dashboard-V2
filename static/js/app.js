function refreshTime() {
	const timeDisplay = document.querySelector(".time-content");
	const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
	let msString = new Date().getMilliseconds();

	// console.log(msString);
	// if (typeof msString === "string") {
	// 	if (msString.length == 1) {
	// 	  msString = "00" + msString;
	// 	} else if (msString.length == 2) {
	// 	  msString = "0" + msString;
	// 	}
	//   } else {
	// 	console.error("msString is not a string");
	// 	console.log(typeof msString);
	//   }
	let paddedMsString = String(msString).padStart(3, "0");
	// console.log(paddedMsString);

	timeDisplay.textContent = timeString + "." + paddedMsString;
	// document.querySelector(".time-content").textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + "." + msString;
}
setInterval(refreshTime, 32);

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function refreshDate() {
	const dateDisplay = document.querySelector(".date-content");
	const dayString = new Date().getDay();
	const dateString = new Date().getDate();
	const paddedDateString = String(dateString).padStart(2, "0");
	const monthString = new Date().getMonth() + 1;
	const paddedMonthString = String(monthString).padStart(2, "0");
	var yearString = new Date().getFullYear();
	yearString = yearString.toString().slice(2, 4);
	dateDisplay.textContent = weekday[dayString] + ", " + paddedDateString + "-" + paddedMonthString + "-" + yearString;
	// document.querySelector(".date-content").textContent = weekday[new Date().getDay()] + ", " + new Date().getDate() + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear();
}
setInterval(refreshDate, 1000);

function popup() {
	console.log("hi, popup...?");
	var text = document.querySelector(".popup");
	text.style.display = "flex";
	setTimeout(resetPopup, 5000);
}

function resetPopup() {
	console.log("bye, popup...?");
	var text = document.querySelector(".popup");
	text.style.display = "none";
}

// function addClient() {}
// function removeClient() {}
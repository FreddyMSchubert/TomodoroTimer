function getTomCaption(isWorkMode, isWelcome)
{
	let file;
	switch (isWorkMode ? "work" : isWelcome ? "welcome" : "break") {
		case "break":
			file = "./captions/break.txt"
			break;
		case "welcome":
			file = "./captions/greetings.txt"
			break;
		default:
			file = "./captions/work.txt"
			break;
	}

	return fetch(file)
		.then(response => response.text())
		.then(data => {
			const lines = data.split('\n');
			const randomLine = lines[Math.floor(Math.random() * lines.length)];
			return randomLine;
		})
		.catch(error => console.error('Error:', error));
}
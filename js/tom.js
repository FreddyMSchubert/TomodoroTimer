function getTomFace(key)
{
	return fetch("./ascii_emojis.json")
	.then(response => response.json())
	.then(data => {
		const emojiObject = data.ascii_emojis.find(emoji => emoji.key === key);
		return emojiObject.face;
	})
	.catch(error => console.error('Ah, the dark clouds of error loom: ', error));
}

async function getTomCaption(isWorkMode, isWelcome)
{
	let file;
	switch (isWorkMode ? "work" : isWelcome ? "welcome" : "break") {
		case "break":
			file = "./captions/break.json"
			break;
		case "welcome":
			file = "./captions/greetings.json"
			break;
		default:
			file = "./captions/work.json"
			break;
	}

	try {
		const response = await fetch(file);
		const data = await response.json();

		const captions = data.captions;
		const randomIndex = Math.floor(Math.random() * captions.length);

		const faceEmoji = await getTomFace(captions[randomIndex].face);
		captions[randomIndex].face = faceEmoji

		return captions[randomIndex];
	} catch (error) {
		console.error('Ah, the dark clouds of error loom: ', error);
	}
}

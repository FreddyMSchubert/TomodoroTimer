let boxWidth = 30;

function generateDigit(digit) {
    const segments = {
        '0': [' _ ', '| |', '|_|'],
        '1': ['   ', '  |', '  |'],
        '2': [' _ ', ' _|', '|_ '],
        '3': [' _ ', ' _|', ' _|'],
        '4': ['   ', '|_|', '  |'],
        '5': [' _ ', '|_ ', ' _|'],
        '6': [' _ ', '|_ ', '|_|'],
        '7': [' _ ', '  |', '  |'],
        '8': [' _ ', '|_|', '|_|'],
        '9': [' _ ', '|_|', ' _|'],
        ':': ['   ', ' . ', ' . ']
    };

    return segments[digit];
}

function formatTimeCodeAsSevenDigitDisplay(timecode) {
    const str = timecode.toString();
    if (!/^\d{1,3}:\d{2}$/.test(str)) {
        throw new Error('Invalid timecode format. It should be in the format HH:MM or HHH:MM');
    }

    const rows = [[], [], []];
    for (const digit of str) {
        const segments = generateDigit(digit);
        segments.forEach((segment, index) => {
            rows[index].push(segment);
        });
    }

    const result = rows.map(row => '    ' + row.join(' ').padEnd(19 + 4, ' ')).join('\n');
    
    return result;
}

function createBox(text, sevenSegmentDisplay, face) {
    const lines = text.split('\n');
    let result = '';
  
    // Top border
    result += '/' + '-'.repeat(boxWidth - 2) + '\\' + '\n';
  
    // Text lines
    for (let line of lines) {
        const paddingCount = Math.max(0, boxWidth - line.length - 2);  // Ensure paddingCount is not negative
        line = '|' + line + ' '.repeat(paddingCount) + '|';
        result += line + '\n';
    }
  
    // Seven-segment display
    const sevenSegmentLines = sevenSegmentDisplay.split('\n');
    const sevenSegmentWidth = sevenSegmentLines[0].length;
    const padding = Math.floor((boxWidth - sevenSegmentWidth) / 2);
    for (let line of sevenSegmentLines) {
        if (line) {
            const sidePadding = Math.max(0, boxWidth - padding - line.length - 2);  // Ensure sidePadding is not negative
            result += '|' + ' '.repeat(padding) + line + ' '.repeat(sidePadding) + '|\n';
        }
    }
  
    // Bottom border
    result += '\\' + '-'.repeat(boxWidth - 2 - 2) + '__ \\' + '\n';
    result += ' '.repeat(boxWidth - 1) + '\\|' + '\n';

    // Tom Face
    result += '\n';
    result += ' '.repeat(boxWidth - 2) + face;
  
    return result;
}

function updateTextBox(isWorkMode, caption, face, timecode)
{
	let text = "";
	text += isWorkMode ? "    <<<<<   WORK   >>>>>    \n" : "    <<<<<   BREAK  >>>>>    \n";
	text += "\n"; // empty line

	const words = caption.split(' ');
	let index = 0;
	
	for (let word of words)
	{
		if (index + word.length + 1 <= boxWidth - 2)
		{
			text += (index > 0 ? ' ' : '');  // Only add space if it's not the beginning of a line
			text += word;
			index += word.length + (index > 0 ? 1 : 0);  // Only add 1 to index if it's not the beginning of a line
		}
		else
		{
			text += '\n';
			text += word;
			index = word.length;
		}
	}

	let sevenSegmentDisplay = formatTimeCodeAsSevenDigitDisplay(timecode);

	let textBox = createBox(text, sevenSegmentDisplay, face);

	return textBox;
}


function generateMorseCode() {
    let code = {};

    let letters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?\'!/()&:;=+-_"$@ ';

    let morseValues = [
        '.-', '-...', '-.-.', '-..', '.', '..-.',
        '--.', '....', '..', '.---',
        '-.-', '.-..', '--', '-.', '---',
        '.--.', '--.-', '.-.', '...', '-',
        '..-', '...-', '.--', '-..-', '-.--',
        '--..', '-----', '.----', '..---',
        '...--', '....-', '.....', '-....',
        '--...', '---..', '----.', '.-.-.-',
        '--..--', '..--..', '.----.', '-.-.--',
        '-..-.', '-.--.', '-.--.-',
        '.-...', '---...', '-.-.-.', '-...-',
        '.-.-.', '-....-', '..--.-',
        '.-..-.', '...-..-', '.--.-.'
    ];

    for (let i = 0; i < letters.length; i++) {
        code[letters[i]] = morseValues[i];
    }

    return code;
}


// Available symbol presets
const symbolPresets = {
    standard: {
        dot: ".",
        dash: "-"
    },

    flowers: {
        dot: "✿",
        dash: "❀"
    },

    numbers: {
        dot: "1",
        dash: "2"
    },

    shapes: {
        dot: "○",
        dash: "■"
    },

    stars: {
        dot: "★",
        dash: "☆"
    },
    birds: {  
        dot:'𓅣',
        dash:'𓅼'
    }
};


// Apply selected preset to the input fields
const applyPreset = () => {

    const selectedPreset =
        document.getElementById('symbolPreset').value;

    // Don't change anything if no preset is selected
    if (selectedPreset === '') {
        return;
    }

    const preset = symbolPresets[selectedPreset];

    // Fill in the custom symbol inputs
    document.getElementById('dotSymbol').value = preset.dot;

    document.getElementById('dashSymbol').value = preset.dash;

};


let morseCode = generateMorseCode();


// Translate normal text into custom Morse code
let translateTextToMorse = (text, dot, dash) => {

    let words = text.split(' ');
    let translatedWords = words.map((word) => {

        let chars = word.split('');
        let morseChars = chars.map((char) => {

            let standardMorse = morseCode[char];

            if (!standardMorse) {
                return char;
            }

            // Replace standard dots and dashes
            return standardMorse
                .replace(/\./g, dot)
                .replace(/-/g, dash);
        });

        return morseChars.join(' ');

    });

    return translatedWords.join(' / ');
};


// Handle text to custom Morse translation
let handleTextToMorseTranslate = () => {

    // Get custom symbols
    let dot = document.getElementById('dotSymbol')
        .value.trim();
    let dash = document.getElementById('dashSymbol')
        .value.trim();

    // Get user text
    let textToMorse = document.getElementById('textToMorse')
        .value.trim().toUpperCase();

    let output = document.getElementById('textToMorseOutput');

    // Check for empty symbols
    if (dot === '' || dash === '') {
        output.textContent = 'Please enter both custom symbols.';
        return;
    }

    // Check that symbols are different
    if (dot === dash) {
        output.textContent = 'Your dot and dash symbols must be different.';
        return;
    }

    // Check for empty text
    if (textToMorse === '') {
        output.textContent = 'No Input Provided';
        return;
    }
    let translatedMorse =
        translateTextToMorse(textToMorse, dot, dash);

    output.textContent = translatedMorse;

 
};





// Copy Text To Morse output
let copyTextToMorseOutput = () => {

    let output = document.getElementById('textToMorseOutput');
    let text = output.textContent;

    copyTextToClipboard(text);
};


// Copy text to clipboard
let copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);

};

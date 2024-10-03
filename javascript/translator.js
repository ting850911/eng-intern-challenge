// Braille Mappings
const brailleMappings = {
  'O.....': ['A', 'a', '1'],
  'O.O...': ['B', 'b', '2'],
  'OO....': ['C', 'c', '3'],
  'OO.O..': ['D', 'd', '4'],
  'O..O..': ['E', 'e', '5'],
  'OOO...': ['F', 'f', '6'],
  'OOOO..': ['G', 'g', '7'],
  'O.OO..': ['H', 'h', '8'],
  '.OO...': ['I', 'i', '9'],
  '.OOO..': ['J', 'j', '0'],
  'O...O.': ['K', 'k'],
  'O.O.O.': ['L', 'l'],
  'OO..O.': ['M', 'm'],
  'OO.OO.': ['N', 'n'],
  'O..OO.': ['O', 'o', '>'],
  'OOO.O.': ['P', 'p'],
  'OOOOO.': ['Q', 'q'],
  'O.OOO.': ['R', 'r'],
  '.OO.O.': ['S', 's'],
  '.OOOO.': ['T', 't'],
  'O...OO': ['U', 'u'],
  'O.O.OO': ['V', 'v'],
  '.OOO.O': ['W', 'w'],
  'OO..OO': ['X', 'x'],
  'OO.OOO': ['Y', 'y'],
  'O..OOO': ['Z', 'z'],
  '..OO.O': '.',
  '..O...': ',',
  '..O.OO': '?',
  '..OOO.': '!',
  '..OO..': ':',
  '..O.O.': ';',
  '....OO': '-',
  '.O..O.': '/',
  '.O..O.': '<',
  'O.O..O': '(',
  '.O.OO.': ')',
  '......': ' ',
};

function specialCases(input) {
  if (input === '.....O') {
    return 'capital';
  } else if (input === '.O.OOO') {
    return 'number';
  }
}

function isBraille(input) {
  for (const chunk of input) {
    if (/[^O.]/.test(chunk)) {
      return false;
    }
  }

  return true;
}

function translator(input) {
  const chunks = input.match(/.{1,6}/g);
  const mapObj = Object.entries(brailleMappings);

  let result = '';
  let isCapital = false;
  let isNumber = false;
  let braille;

  if (input.length % 6 !== 0) {
    braille = false;
  } else {
    braille = isBraille(chunks);
  }

  if (braille) {
    for (let i = 0; i < chunks.length; i++) {
      const ele = chunks[i];
      const specialCase = specialCases(ele);
      if (specialCase === 'capital') {
        isCapital = true;
      } else if (specialCase === 'number') {
        isNumber = true;
      }
      if (Array.isArray(brailleMappings[ele])) {
        if (isNumber) {
          result += brailleMappings[ele][2];
        } else if (isCapital) {
          result += brailleMappings[ele][0];
          isCapital = false;
        } else {
          result += brailleMappings[ele][1];
        }
      } else {
        result += brailleMappings[ele];
      }
    }
  } else {
    for (let i = 0; i < input.length; i++) {
      if (/[A-Z]/.test(input[i]) && !isCapital) {
        result += '.....O';
        isCapital = true;
      } else if (/[0-9]/.test(input[i]) && !isNumber) {
        result += '.O.OOO';
        isNumber = true;
      }
      mapObj.forEach((element) => {
        const char = element[1];
        if (Array.isArray(char)) {
          char.find((e) => {
            if (e === input[i]) {
              result += element[0];
            }
          });
        } else {
          if (char === input[i]) {
            result += element[0];
          }
        }
      });
    }
  }

  console.log(result);
}
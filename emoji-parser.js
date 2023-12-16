const fs = require('fs');
const path = require('path');

const parseEmojiLine = (line) => {
  const parts = line.split(' ; ');
  const u = parts[0].trim();
  const rest = parts[1].split(' # ');
  const e = rest[1].split(' ')[0].trim();
  const n = rest[1].substring(e.length).trim();
  const filecode = u.substring(2);
  const shortcut = `:${n.toLowerCase().replace(/ /g, '_')}:`;

  return {
    u, // nicode,
    e, // moji,
    n, // ame,
  };
};

const regex = /\s/;


const processFile = (fileName) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    const lines = data.split('\n');
    const emojis = lines.filter(line => line.trim() !== '').map(parseEmojiLine).filter(emoji => !regex.test(emoji.u))
    const outputFileName = path.basename(fileName, path.extname(fileName)) + '.json';

    fs.writeFile(outputFileName, JSON.stringify(emojis, null, 0), (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
      } else {
        console.log(`Output written to ${outputFileName}`);
      }
    });
  });
};

const fileName = process.argv[2];
if (!fileName) {
  console.log('Please provide a file name as an argument.');
  process.exit(1);
}

processFile(fileName);

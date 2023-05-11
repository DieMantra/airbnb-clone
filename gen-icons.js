// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
import path from 'path';
const directoryPath = './public/icons/sorting';

fs.readdir(directoryPath, (err, items) => {
  if (err) throw err;

  const directories = [];
  const files = [];

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      directories.push(item);
    } else if (stat.isFile()) {
      files.push(item);
    }
  });
  files.filter((file) => file !== '.DS_Store');
  fs.appendFile('icons.json', JSON.stringify(files), (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
    console.log('Directories:', directories);
    console.log('Files:', files);
  });
});

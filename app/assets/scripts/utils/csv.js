module.exports.csvToJSON = function csvToJSON (csv) {
  const lines = csv.replace(/\r/g, '').split('\n');
  const header = lines[0].split('\t');
  const body = lines.slice(1);
  return body.map(b => {
    return Object.assign(...b.split('\t').map((el, i) => ({ [header[i]]: el })));
  });
};

module.exports.jsonToCSV = function jsonToCSV (json) {
  return [Object.keys(json[0]).join('\t')]
    .concat(json.slice(1).map(row => {
      return Object.keys(row).map(d => row[d]).join('\t');
    }))
    .join('\n');
};

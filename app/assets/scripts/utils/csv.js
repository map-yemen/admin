module.exports.csvToJSON = function csvToJSON (csv) {
  const lines = csv.replace(/\r/g, '').split('\n');
  const header = lines[0].split(', ');
  const body = lines.slice(1);
  // we need these two value + nothing falsey in the header
  if (header.indexOf('data_value') === -1 || header.indexOf('sub_nat_id') === -1 || header.some(h => !h)) {
    throw new Error('Invalid csv');
  }
  return body
    // don't use falsey/empty lines
    .filter(b => b)
    .map(b => {
      return Object.assign(...b.split(', ').map((el, i) => ({ [header[i]]: el })));
    });
};

module.exports.jsonToCSV = function jsonToCSV (json) {
  return [Object.keys(json[0]).join(', ')]
    .concat(json.map(row => {
      return Object.keys(row).map(d => row[d]).join(', ');
    }))
    .join('\n');
};

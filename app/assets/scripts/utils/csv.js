module.exports.csvToJSON = function csvToJSON (csv) {
  const lines = csv.replace(/\r/g, '').split('\n');
  const header = lines[0].split('\t');
  const body = lines.slice(1);
  // we need these two value + nothing falsey in the header
  if (header.indexOf('data_value') === -1 || header.indexOf('sub_nat_id') === -1 || header.some(h => !h)) {
    throw new Error('Invalid csv');
  }
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

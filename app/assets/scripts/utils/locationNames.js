import districtNames from './districtNames';

let governorateMap = {}; // From governorate name to code
let reverseGovernorateMap = {}; // From governorate code to name

Object.keys(districtNames).forEach((governorate) => {
  let marker = districtNames[governorate][0]['governorate_marker'];
  governorateMap[governorate] = marker;
  reverseGovernorateMap[marker] = governorate;
});

function districtLookup (governorateCode, districtCode) {
  if (districtCode === 'All') { return 'All Districts'; }
  let districtName = null;
  let districts = districtNames[reverseGovernorateMap[governorateCode]];
  districts.forEach((district) => {
    if (parseInt(district.district_marker) === parseInt(districtCode)) {
      districtName = district.district;
    }
  });

  return districtName;
}

module.exports = {
  governorateMap,
  reverseGovernorateMap,
  districtLookup
};

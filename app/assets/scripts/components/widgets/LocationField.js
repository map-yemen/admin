import React from 'react';
import { governorateMap, arabicGovernorateMap, reverseGovernorateMap } from '../../utils/locationNames';
import districtNames from '../../utils/districtNames';

export default class testingField extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {governorate, district, lat, lon} = this.state;
    const chosenGovernorate = reverseGovernorateMap[governorate] || '';

    let districts = (chosenGovernorate === '' ? [] : districtNames[chosenGovernorate].map((district) => {
      return <option key={district['district_marker']} value={district['district_marker']}>{district['district'] + ' - ' + district['district_ar']}</option>;
    }));
    if (districts.length) districts.unshift(<option key={'-2'} value={'All'}>All Districts - كل المراكز </option>);
    districts.unshift(<option key={'-1'} value={''}>District</option>);

    const governorates = Object.keys(governorateMap).map((governorate) => {
      return <option key={governorateMap[governorate]} value={governorateMap[governorate]}>{governorate + ' - ' + arabicGovernorateMap[governorate]}</option>;
    });

    governorates.unshift(<option key={'-1'} value={''}>Governorate</option>);

    return (
      <div className="form-group field field-array  multiform-group">
        <div className="form-location">
          <div id="root_category__title">Locations - النطاق الجغرافي</div>
          <div className="col-sm-6">
            <label>
              <p>Governorate*</p>
              <p>المحافظة</p></label>
            <select id="governorate" className="form-control" value={governorate} onChange={this.onChange}>
              {governorates}
            </select>
          </div>
          <div className="col-sm-6">
            <label>
              <p>District/Municipality</p>
              <p>المركز/قسم</p>
            </label>
            <select id="district" className="form-control" value={district} onChange={this.onChange('district')}>
              {districts}
            </select>
            <p onClick={this.newLine}>Add another district</p>
          </div>
          <div className="col-sm-6">
            <label>
              <p>Latitude</p>
              <p>خط العرض</p>
            </label>
            <input className="form-control" type="number" value={lat} step="0.00001"
              onChange={this.onChange('lat')} />
          </div>
          <div className="col-sm-6">
            <label>
              <p>Longitude</p>
              <p>خط الطول</p>
            </label>
            <input className="form-control" type="number" value={lon} step="0.00001"
              onChange={this.onChange('lon')} />
          </div>
        </div>
      </div>
    );
  }
}

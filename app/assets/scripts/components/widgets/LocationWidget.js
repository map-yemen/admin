import React from 'react';
import { governorateMap, arabicGovernorateMap, reverseGovernorateMap } from '../../utils/locationNames';
import districtNames from '../../utils/districtNames';

export default class LocationFieldItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    for (let key in props.formData) {
      this.state[key] = props.formData[key];
    }
  }

  onChange (name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

  render () {
    const {lat, lon} = this.state.marker;
    const {district, governorate} = this.state.district;
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
      <div>
        <div className="form-location">
          <legend>{this.props.schema.title}</legend>
          <div className="row">
            <div className="col-sm-6">
              <label>Governorate - المحافظة *</label>
              <select className="form-control" value={governorate} onChange={this.onChange('governorate')}>
                {governorates}
              </select>
            </div>
            <div className="col-sm-6">
              <label>District/Municipality - المركز/قسم</label>
              <select className="form-control" value={district} onChange={this.onChange('district')}>
                {districts}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label>Latitude - خط العرض</label>
            <input className="form-control" type="number" value={lat} step="0.00001"
              onChange={this.onChange('lat')} />
          </div>
          <div className="col-sm-6">
            <label>Longitude - خط الطول</label>
            <input className="form-control" type="number" value={lon} step="0.00001"
              onChange={this.onChange('lon')} />
          </div>
        </div>
      </div>
    );
  }
}

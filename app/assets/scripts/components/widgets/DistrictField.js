import React from 'react';
import districtNames from '../../utils/districtNames';

  /**
   * District widget with Governorate & district dropdowns
   */
export default class DistrictField extends React.Component {
  constructor (props) {
    super(props);
    if (props.formData && props.formData.governorate && props.formData.district) {
      const {governorate, district} = props.formData;
      this.state = {governorate, district};
    } else {
      this.state = {governorate: '', district: ''};
    }
  }
  onChange (name) {
    return (event) => {
      this.setState({[name]: event.target.value}, () => {
        this.props.onChange(this.state);
      });
    };
  }

  render () {
    const {governorate, district} = this.state;
    let districts = (governorate === '' ? [] : districtNames[governorate].map((district) => {
      return <option key={district} value={district}>{district}</option>;
    }));
    if (districts.length) districts.unshift(<option key={'-2'} value={'All'}>All Districts</option>);
    districts.unshift(<option key={'-1'} value={''}>District</option>);

    const governorates = Object.keys(districtNames).map((governorate) => {
      return <option key={governorate} value={governorate}>{governorate}</option>;
    });

    governorates.unshift(<option key={'-1'} value={''}>Governorate</option>);

    return <div className="form-location">
      <legend>{this.props.schema.title}</legend>
      <div className="row">
        <div className="col-sm-6">
          <label>Governorate</label>
          <select className="form-control" value={governorate} onChange={this.onChange('governorate')}>
            {governorates}
          </select>
        </div>
        <div className="col-sm-6">
          <label>Districts</label>
          <select className="form-control" value={district} onChange={this.onChange('district')}>
            {districts}
          </select>
        </div>
      </div>
    </div>;
  }
}

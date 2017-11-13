import React from 'react';
import LocationField from './LocationField';
  /**
   * District widget with Governorate & district dropdowns
   */

export default class DistrictField extends React.Component {
  constructor (props) {
    super(props);
    if (props.formData && props.formData.governorate && props.formData.district) {
      const {governorate, district} = props.formData;
      this.state = {governorate, district, lat: '', lon: ''};
    } else {
      this.state = {governorate: '', district: '', lat: '', lon: ''};
    }
  }

  onChange (e) {
    console.log(this.props.formData);

    if (e.target) {
      let name = e.target.id;
      let thing = (name === 'lat' || name === 'lon' ? parseFloat(e.target.value) : e.target.value);

      if (name === 'lat' || name === 'lon') {
        thing = parseFloat(e.target.value);
      } else {
        thing = e.target.value;
      }

      this.setState({[name]: thing});
    }
  }

  newLine () {
    console.log('woof');
  }

  render () {
    const {formData, onChange} = this.props;

    return <div className="form-group field field-array  multiform-group">
      <LocationField />
    </div>;
  }
}

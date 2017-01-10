import React from 'react';

export default function (label, helpText, enumOptions, arEnumOptions) {
  return class Dropdown extends React.Component {
    constructor (props) {
      super(props);
      this.state = {};
      if (props.formData && props.formData.en) {
        let enVal = props.formData.en;
        enumOptions.forEach((val, i) => {
          if (val === enVal) {
            this.state.val = i;
          }
        });
      }
    }

    onChange (event) {
      let nextValue = (event.target.value === '-1') ? undefined : parseInt(event.target.value);
      this.setState({val: nextValue}, () => {
        if (nextValue) {
          let nextState = {en: enumOptions[nextValue], ar: arEnumOptions[nextValue]};
          this.props.onChange(nextState);
        } else {
          this.props.onChange(undefined);
        }
      });
    }

    render () {
      return (
        <div className="row">
          <div className="col-sm-6">
            <label>{label}</label>
            <select className="form-control" onChange={this.onChange.bind(this)} value={this.state.val}>
              <option key='-1' value='-1'>{helpText}</option>
              {
                enumOptions.map((option, i) => {
                  return <option key={i} value={i}>{option} - {arEnumOptions[i]}</option>;
                })
              }
            </select>
          </div>
        </div>
      );
    }
  };
}

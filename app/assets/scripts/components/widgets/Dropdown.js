import React from 'react';

export default function (label, helpText, enumOptions) {
  return class Dropdown extends React.Component {
    constructor (props) {
      super(props);
      this.state = {};
      if (props.formData) {
        this.state.val = props.formData;
      }
    }

    onChange (event) {
      let nextValue = (event.target.value === '-1') ? undefined : event.target.value;
      this.setState({val: nextValue}, () => {
        this.props.onChange(this.state.val);
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
                  return <option key={i} value={option}>{option}</option>;
                })
              }
            </select>
          </div>
        </div>
      );
    }
  };
}

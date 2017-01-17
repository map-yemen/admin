import React from 'react';

class CustomNumberWidget extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.state.value = this.props.formData;
  }

  onChange (e) {
    if (e.target.value.length > 0) {
      this.props.onChange(Number(e.target.value));
    } else {
      this.props.onChange(undefined);
    }
  }

  render () {
    let {
      schema,
      id,
      placeholder,
      disabled,
      readonly,
      autofocus
    } = this.props;
    return (<div>
      <label className="control-label">{schema.title}</label>
      <p className="field-description">{schema.description}</p>
      <input
      type="number"
      id={id}
      className="form-control"
      value={this.state.value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      onChange={this.onChange.bind(this)}/>
      </div>);
  }
}

export default CustomNumberWidget;


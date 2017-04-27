import React from 'react';

class CustomTextAreaWidget extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.state.value = this.props.formData;
  }

  onChange (e) {
    if (e.target.value.length > 0) {
      this.setState({ value: e.target.value });
      this.props.onChange(e.target.value);
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

    let requiredLabel = (this.props.required) ? '*' : '';
    return (<div>
      <label className="control-label">{`${schema.title} ${requiredLabel}`} </label>
      <p className="field-description">{schema.description}</p>
      <textarea
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

export default CustomTextAreaWidget;

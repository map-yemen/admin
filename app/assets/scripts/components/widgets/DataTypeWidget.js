import React from 'react';

export default class DataTypeWidget extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      category: props.formData
    };
  }

  onChange (event) {
    return this.setState({
      category: event.target.value
    }, () => this.props.onChange(this.state.category));
  }

  render () {
    return (
      <div>
        <label className="control-label">{this.props.schema.title}</label>
        <select value={this.state.category} className="form-control" onChange={this.onChange.bind(this)}>
          <option value="Sequential">Sequential</option>
          <option value="Diverging">Diverging</option>
          <option value="Categorical">Categorical</option>
        </select>
        <div className="field-example">
          <h3 className="header-small">Type of Data Examples</h3>
          <div className="field-example-item">
            <h4 className="header-smallest">Sequential</h4>
            <p>Data is an increasing or decreasing range</p>
          </div>
          <div className="field-example-item">
            <h4 className="header-smallest">Diverging</h4>
            <p>Data highlights two opposing extremes</p>
          </div>
          <div className="field-example-item">
            <h4 className="header-smallest">Categorical</h4>
            <p>Data represents different categories</p>
          </div>
        </div>
      </div>
    );
  }
}

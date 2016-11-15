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
        <br />
        <div>
          <label>Sequential</label>
          <p>Data is an increasing or decreasing range</p>
          <div className="ramp BuGn">
            <svg width="75" height="15">
              <rect fill="rgb(237,248,251)" width="15" height="15" x="0"></rect>
              <rect fill="rgb(178,226,226)" width="15" height="15" x="15"></rect>
              <rect fill="rgb(102,194,164)" width="15" height="15" x="30"></rect>
              <rect fill="rgb(44,162,95)" width="15" height="15" x="45"></rect>
              <rect fill="rgb(0,109,44)" width="15" height="15" x="60"></rect>
            </svg>
          </div>
        </div>
        <br />
        <div>
          <label>Diverging</label>
          <p>Data highlights two opposing extremes</p>
          <div className="ramp RdBu">
            <svg width="75" height="15">
              <rect fill="rgb(202,0,32)" width="15" height="15" x="0"></rect>
              <rect fill="rgb(244,165,130)" width="15" height="15" x="15"></rect>
              <rect fill="rgb(247,247,247)" width="15" height="15" x="30"></rect>
              <rect fill="rgb(146,197,222)" width="15" height="15" x="45"></rect>
              <rect fill="rgb(5,113,176)" width="15" height="15" x="60"></rect>
            </svg>
          </div>
        </div>
        <br />
        <div>
          <label>Categorical</label>
          <p>Data represents different categories</p>
          <div className="ramp Accent">
            <svg width="75" height="15">
              <rect fill="rgb(127,201,127)" width="15" height="15" x="0"></rect>
              <rect fill="rgb(190,174,212)" width="15" height="15" x="15"></rect>
              <rect fill="rgb(253,192,134)" width="15" height="15" x="30"></rect>
              <rect fill="rgb(255,255,153)" width="15" height="15" x="45"></rect>
              <rect fill="rgb(56,108,176)" width="15" height="15" x="60"></rect>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

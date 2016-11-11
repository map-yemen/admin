import React from 'react';
import { Link } from 'react-router';
import {schema} from './IndicatorForm.js';

const config = require('../config');
const apiRoot = config.api_root;
const ordering = [
  'name',
  'description',
  'private',
  'data'
];

const sortOrder = {};
ordering.forEach((item, index) => {
  sortOrder[item] = index;
});

class Indicator extends React.Component {
  componentWillMount () {
    const component = this;
    const id = component.props.location.pathname.replace('/indicators/', '');

    component.props.auth.request(`${apiRoot}/indicators/${id}`, 'get')
      .then(function (resp) {
        component.setState({
          indicator: resp,
          id: id
        });
      }).fail(function (err, msg) {
        console.error('error', err, msg);
      });
  }

  render () {
    const component = this;
    if (component.state && component.state.indicator) {
      const indicator = component.state.indicator.data;
      const keys = schema.properties;
      const rows = Object.keys(indicator).sort(function (a, b) {
        if (sortOrder[a] < sortOrder[b]) { return -1; }
        if (sortOrder[a] > sortOrder[b]) { return 1; }
        return 0;
      }).map(function (key) {
        if (key === 'data') {
          return (<li key={key} className='large'>
            <label>{keys[key].title}</label>
            <textarea className='form-control' readOnly value={indicator[key]}></textarea>
          </li>);
        } else if (keys[key].type === 'string' || keys[key].type === 'boolean') {
          return <li key={key}><label>{keys[key].title}</label>{ String(indicator[key]) }</li>;
        }
      });

      return (
        <div className="indicator-display">
          <ul>
            { rows }
          </ul>
          <Link className="btn btn-outline-primary" to={`/indicators/${component.state.id}/edit`}>Edit</Link>
          <br />
          <br />
          <Link className="btn btn-outline-primary" to='/indicators'>All Indicators</Link>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Indicator;

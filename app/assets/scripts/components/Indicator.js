import React from 'react';
import { Link } from 'react-router';
import {schema} from './IndicatorForm.js';

const config = require('../config');
const apiRoot = config.api_root;
const ordering = [
  'name',
  'description',
  'published',
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
        } else if (key === 'private') {
          return <li key={key}><label>{keys[key].title}</label>{ indicator[key] ? 'Private' : 'Public' }</li>;
        } else if (key === 'published') {
          return <li key={key}><label>{keys[key].title}</label>{ indicator[key] ? 'Published' : 'Draft' }</li>;
        } else if (keys[key].type === 'string') {
          return <li key={key}><label>{keys[key].title}</label>{ String(indicator[key]) }</li>;
        }
      });

      return (
        <div className="indicator-display wrapper-content width-medium">
          <h1 className="header-page-main">Indicator Name</h1>
          <Link className="btn button--primary button-section-header" to={`/indicators/${component.state.id}/edit`}>Edit</Link>
          <ul>
            { rows }
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Indicator;

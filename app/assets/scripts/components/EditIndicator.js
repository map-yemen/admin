import React, {PropTypes as T} from 'react';
import IndicatorForm from './IndicatorForm';
import { Link } from 'react-router';

const config = require('../config');
const apiRoot = config.api_root;

class EditIndicator extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount () {
    const component = this;
    const id = component.props.location.pathname
      .replace('/indicators/', '')
      .replace('/edit', '')
    ;

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

  handleSubmit ({formData}) {
    const component = this;
    const indicatorData = formData.data;
    if (indicatorData) {
      const lines = indicatorData.replace(/\r/g, '').split('\n');
      const header = lines[0].split('\t');
      const body = lines.slice(1);
      formData.data = body.map(b => {
        return Object.assign(...b.split('\t').map((el, i) => ({ [header[i]]: el })));
      });
    }
    return component.props.auth.request(`${apiRoot}/indicators/${component.state.id}`, 'put', {
      data: JSON.stringify(formData)
    }).then(function (resp) {
      if (resp.id) {
        component.context.router.push(`/indicators/${resp.id}`);
      }
    }).fail(function (err, msg) {
      console.error('error', err, msg);
    });
  }

  handleDelete () {
    const component = this;
    return component.props.auth.request(`${apiRoot}/indicators/${component.state.id}`, 'delete')
      .then(function (resp) {
        component.context.router.push('/indicators');
      }).fail(function (err, msg) {
        console.error('error', err, msg);
      });
  }

  render () {
    const component = this;
    if (component.state && component.state.indicator) {
      return <div className="wrapper-content width-medium">
        <h1>Edit Indicator</h1>
        <IndicatorForm onSubmit={component.handleSubmit} formData={component.state.indicator.data}>
          <button className="btn button--base button-group" onClick={component.handleDelete}>Delete</button>
          <Link className="btn button--base-bounded button-group" to={`/projects/${component.state.id}`}>Cancel</Link>
        </IndicatorForm>
      </div>;
    }
    return <div></div>;
  }
}

export default EditIndicator;

import React from 'react';
import { PropTypes as T } from 'prop-types';
import ReactDOM from 'react-dom';
import AuthService from '../utils/AuthService';

class Login extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }
  constructor (props) {
    super(props);
    this.state = {};
  }

  handleSubmit (e) {
    e.preventDefault();
    const component = this;

    this.props.auth.login({
      realm: 'Username-Password-Authentication',
      scope: 'openid roles',
      redirectUri: window.location.origin,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function (err) {
      if (err) component.setState({ message: err.message });
    });
  }

  componentWillMount () {
    if (this.props.auth.loggedInNotEditor()) {
      this.setState({ message: 'Not authorized to access the admin panel' });
    }
  }

  render () {
    return (
      <div className='login'>
        <h2>Log in to continue</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <span className='message-error'>{this.state.message}</span>
          <div className='form__group'>
            <label htmlFor='email'>E-mail</label>
            <input className='form__control' type='email' ref='email' id='email' placeholder="yours@example.com" required />
          </div>

          <div className='form__group'>
            <label htmlFor='password'>Password</label>
            <input className='form__control' type='password' ref='password' id='password' placeholder="Password" required />
          </div>

          <div>
            <button className="btn button--primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;

import React from "react";
import { useHistory } from "react-router-dom"

import { axiosWithAuth } from '../utils/axiosWithAuth';


class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };


  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // Make a POST request and send the credentials object to the api
    axiosWithAuth()
      .post('/api/login', this.state.credentials)
      .then(res => {
        console.log(res)
        window.localStorage.setItem('token', res.data.payload);
        // navigate the user to /protected (whatever landing page)
        console.log(this)
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;


// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;

import React from 'react';
// import { Link, NavLink, withRouter } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const Navbar = (props) => {
  const { auth, profile, signOut } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks signOut={signOut} profile={profile} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper light-blue darken-4" id="nav_wrapper">
      <div className="container">
        <Link className="brand-logo" id="nav_logo" to="/"><i className="material-icons">fitness_center</i>Fitness.ai</Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/add'>Add Content</NavLink></li>
        <li><button className="link-button" onClick={props.signOut}>Log Out</button></li>
        <li><NavLink to='/' className="btn btn-floating teal lighten-1">
          {props.profile.initials}
        </NavLink></li>
      </ul>
    </div>
  )
}

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/signup'>Signup</NavLink></li>
        <li><NavLink to='/signin'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

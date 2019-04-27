import React, { useEffect } from 'react';
// import { Link, NavLink, withRouter } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import M from "materialize-css/dist/js/materialize.min.js";

const Navbar = (props) => {
  const { auth, profile, signOut } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks signOut={signOut} profile={profile} className={"right hide-on-med-and-down"}/> : <SignedOutLinks className={"right hide-on-med-and-down"}/>;
  const mobile_links = auth.uid ? <SignedInLinks signOut={signOut} profile={profile} className={"sidenav"}/> : <SignedOutLinks className={"sidenav"}/>;
  return (
    <div>
    <nav className="nav-wrapper light-blue darken-4" id="nav_wrapper">
      <div className="container">
        <Link className="brand-logo" id="nav_logo" to="/"><i className="material-icons">fitness_center</i>Fitness.ai</Link>
        <NavLink to="#" data-target="mobile-sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></NavLink>
        {links}
      </div>
    </nav>
      {mobile_links}
    </div>
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
  useEffect(() => {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 250
    });
    return(() =>{ //clean up effect like componentWillUnmount
        var sidenav_overlay = document.querySelector('.sidenav-overlay');
        var drag_target = document.querySelector('.drag-target');
        if (sidenav_overlay) {
          sidenav_overlay.parentNode.removeChild(sidenav_overlay);
          drag_target.parentNode.removeChild(drag_target);
        }
      }
    )
  },[]); // By adding an empty array it tells react to only init the M.Sidenav once (like componentDidMount)

  const { className } = props;
  const id = className === "sidenav" ? "mobile-sidenav" : "main-nav";
  const a_class = className === "sidenav" ? "sidenav-close " : "";
  const a_button = className === "sidenav" ? "sidenav-button" : "nav-button";
  return (
    <div>
      <ul className={className} id={id}>
        <li><NavLink className={a_class} to='/add'>Add Content</NavLink></li>
        <li><NavLink to="#" className={a_class} onClick={props.signOut}>Log Out</NavLink></li>
        <li><NavLink to='/' id={a_button} className={a_class + "btn btn-floating teal lighten-1"}>
          {props.profile.initials}
        </NavLink></li>
      </ul>
    </div>
  )
}

const SignedOutLinks = (props) => {
  useEffect(() => {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 250
    });
    return(() =>{ //clean up effect like componentWillUnmount
        var sidenav_overlay = document.querySelector('.sidenav-overlay');
        var drag_target = document.querySelector('.drag-target');
        if (sidenav_overlay) {
          sidenav_overlay.parentNode.removeChild(sidenav_overlay);
          drag_target.parentNode.removeChild(drag_target);
        }
      }
    )
  },[]); // By adding an empty array it tells react to only init the M.Sidenav once (like componentDidMount)

  const { className } = props;
  const id = className === "sidenav" ? "mobile-sidenav" : "main-nav";
  const a_class = className === "sidenav" ? "sidenav-close " : "";
  return (
    <div>
      <ul className={className} id={id}>
        <li><NavLink to='/signup' className={a_class}>Signup</NavLink></li>
        <li><NavLink to='/signin' className={a_class}>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

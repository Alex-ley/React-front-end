import React, { Component } from 'react'
import ContentStream from '../content/ContentStream'
import AddContent from '../content/AddContent'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'



class Feed extends Component {
  render() {
    const { media, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m7">
            <AddContent divType="section no-bottom-padding" />
            <ContentStream media={media} />
          </div>
          <div className="col s12 m4 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    media: state.firestore.ordered.media,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'media', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
)(Feed)

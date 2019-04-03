import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ContentDetails = (props) => {
  const { content, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />
  if (content) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-2">
          <div className="card-content">
            <span className="card-title">{content.title}</span>
            {
              (() => {
                switch (content.type.slice(0,5)) {
                  case 'video':
                    return <VideoComponent content={content}/>;
                  case 'image':
                    return <ImageComponent content={content}/>
                  default:
                    return null;
                }
              })()
            }
            <p>{content.description}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {content.authorFirstName} {content.authorLastName}</div>
            <div>{moment(content.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading content...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const media = state.firestore.data.media;
  const content = media ? media[id] : null
  return {
    content: content,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'media'
  }])
)(ContentDetails)


const VideoComponent = ({content}) => {
  return (
    <div>
      <video controls>
        <source src={content.firebaseURL} type={content.type}/>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

const ImageComponent = ({content}) => {
  return (
    <img className="full-width-parent" src={content.firebaseURL} alt={content.type} />
  )
}

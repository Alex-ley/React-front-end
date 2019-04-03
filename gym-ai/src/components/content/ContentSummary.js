import React from 'react'
import moment from 'moment'

const ContentSummary = ({content}) => {
  // const media = content.type.slice(0,5) === "video" ? <VideoComponent content={content}/> : <ImageComponent content={content}/>

  return (
    <div className="card z-depth-2 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{content.title}</span>
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
        <p>Posted by {content.authorFirstName} {content.authorLastName}</p>
        <p className="grey-text">{moment(content.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ContentSummary

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

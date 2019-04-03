import React from 'react'
import ContentSummary from './ContentSummary'
import { Link } from 'react-router-dom'

const ContentStream = ({media}) => {
  return (
    <div className="project-list section">
      { media && media.map(content => {
        return (
          <Link to={'/content/' + content.id} key={content.id}>
            <ContentSummary content={content} />
          </Link>
        )
      })}
    </div>
  )
}

export default ContentStream

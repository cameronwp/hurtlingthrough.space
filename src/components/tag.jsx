import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'

import './tag.scss'

class Tag extends React.Component {
  render() {
    const { display, name } = this.props

    return (
      <div>
        <Link to={`/tags/${name}`} className='tag-content'>{display || name}</Link>
      </div>
    )
  }
}

export default Tag

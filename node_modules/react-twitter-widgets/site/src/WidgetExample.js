import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './WidgetExample.css'

import {
  Follow,
  Hashtag,
  Mention,
  Share,
  Timeline,
  Tweet,
} from '../../dist'


const widgetNameToComponentMap = {
  Follow,
  Hashtag,
  Mention,
  Share,
  Timeline,
  Tweet,
}


const jsonPropertyQuoteRegex = /"([^(")"]+)":/g


export default class WidgetExample extends Component {
  render() {
    const { widget, widgetProps } = this.props

    const c = widgetNameToComponentMap[widget] || 'div'

    // Generate a string of jsx-like props for
    // code example based on on widgetProps
    const propsString = Object.keys(widgetProps).map((wpn) => {
      const v = widgetProps[wpn]

      const displayValue = (typeof v === 'string')
        ? `"${v}"`
        // json-stringify props, then remove quotes from property names
        : `{${JSON.stringify(widgetProps[wpn]).replace(jsonPropertyQuoteRegex, '$1:')}}`

      return `  ${wpn}=${displayValue}`
    }).join('\n')

    const exampleCode = `<${widget}\n${propsString}\n/>`

    return (
      <div className="WidgetExample-container">
        <h3>{widget}</h3>
        <pre>{exampleCode}</pre>
        <br /><br />
        {React.createElement(c, widgetProps)}
      </div>
    )
  }
}

WidgetExample.propTypes = {
  widget: PropTypes.oneOf(Object.keys(widgetNameToComponentMap)).isRequired,
  widgetProps: PropTypes.object.isRequired,
}

import React, { Component } from 'react'

import logo from './logo.svg'

import './App.css'

import WidgetExample from './WidgetExample'

import widgetPropExamples from './widgetPropExamples'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>react-twitter-widgets</h1>
          <h2>by Andrew Suzuki (@andrewsuzuki)</h2>
        </div>
        <div className="App-content">
          {Object.keys(widgetPropExamples).map((name) =>
            <WidgetExample
              key={name}
              widget={name}
              widgetProps={widgetPropExamples[name]}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App

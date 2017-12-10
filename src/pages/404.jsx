import React from 'react'

class FourOhFour extends React.Component {
  render() {
    return (
      <div style={{marginTop: '5em'}}>
        <h2>404 - page not found</h2>
        <p>"Oh no, not again."</p>
        <img src='/potted-plant.jpg' alt="potted plant (it's a joke from the hitchhiker's guide to the galaxy)"/>
      </div>
    )
  }
}

export default FourOhFour

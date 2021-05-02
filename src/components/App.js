import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(data => this.handleResponse(data))
    } else {
      fetch('/api/pets?' + new URLSearchParams({...this.state.filters}))
      .then(resp => resp.json())
      .then(data => this.handleResponse(data))
    }
  }

  handleResponse = data => {
    this.setState({
      pets: data
    })
  }

  onAdoptPet = (id) => {
    const adoptedPet = this.state.pets.filter(pet => pet.id === id)[0]
    adoptedPet.isAdopted = true
    this.setState(previousState => ({
      pets: previousState.pets, adoptedPet
    }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

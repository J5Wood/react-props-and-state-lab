import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {

  displayPets = () => {
    return this.props.pets.map(pet => <Pet onAdoptPet={this.props.onAdoptPet} key={pet.id} pet={pet}/>)
  }

  render() {
    return ( 
      <div className="ui cards">
        {this.displayPets()}
      </div>
    )
  }
}

export default PetBrowser

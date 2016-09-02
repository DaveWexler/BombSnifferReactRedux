import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


const SmartSearchBar = class extends Component{
  render(){
    return(
      <SearchBar onSubmit={handleSubmit} />
    )
  }
}

function handleSubmit(event){
  event.preventDefault()
  var userInput = event.target.children[0].children[0].children[0].children[0].value
  debugger
  this.props.actorByRating(userInput)
  //"this" is undefined at this point, much less props.  Have no access to action creator
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({actorByRating: actorByRating, getInput: getInput}, dispatch)
}

export default connect(null, mapDispatchToProps)(SmartSearchBar)

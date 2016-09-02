import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import actorByRating from '../Actions/ActorByRating'
// import { Field, reduxForm } from 'redux-form';


const SearchBar = class extends Component {

  render() {
    // const {fields: {Search, ActorDirector}} = this.props
    return(
      <div>
        <div className="form-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <input className="form-control" type="text" placeholder="search" />
                </div>
                <div className="col-md-3">
                  <select className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" >
                    <option value="actor" id="searchActor">Seach by Actor</option>
                    <option value="director" id="searchDirector">Seach by Director</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="col-md-3">
                <input type="submit" id="submit" className="btn btn-default btn-lg" />
              </div>
            </div>
          </form>
        </div>
      </div>
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
  return bindActionCreators({actorByRating: actorByRating}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)


// function mapDispatchToProps(dispatch){
//   return bindActionCreators({actorByRating: actorByRating}, dispatch)
// }
// export default reduxForm({
//   form: 'searchBar',
//   fields: ['Search', 'ActorDirector']
// }, mapDispatchToProps)(SearchBar);

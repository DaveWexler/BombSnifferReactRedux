import React, { Component } from 'react'
import actorByRating from '../Actions/ActorByRating'
import { reduxForm } from 'redux-form';



class SearchBar extends Component {

  render() {
    const { fields: { searchTerm, actorDirector }, handleSubmit } = this.props;

    return(
      <div>
        <div className="form-center">
          <form onSubmit={handleSubmit(actorByRating)}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <input className="form-control" type="text"  name="searchTerms" id="searchTerms" placeholder="search" {...searchTerm}/>
                </div>
                <div className="col-md-3">
                  <select id="searchType" className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" {...actorDirector}>
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

export default reduxForm({
  form: 'SearchBar',
  fields: [
    'searchTerm',
    'actorDirector',
  ],
}, null, { actorByRating })(SearchBar);

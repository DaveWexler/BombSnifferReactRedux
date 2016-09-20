import React, { Component } from 'react'
import actorByRating from '../Actions/ActorByRating'
import { Field, reduxForm } from 'redux-form';



class SearchBar extends Component {

  onSubmit (formData, dispatch) {
    if (formData.actorDirector === "actor") {
      dispatch(actorByRating(formData.searchTerm))
    }
  }

  render() {
    const { fields: { searchTerm, actorDirector }, handleSubmit, onSubmit } = this.props;

    return(
      <div>
        <div className="form-center">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <Field name="searchTerm" className="form-control" component="input" type="text" placeholder="Search" {...searchTerm}/>
                </div>
                <div className="col-md-3">
                  <label>Choose Actor or Director:</label>
                  <br/>
                  <Field name="actorDirector" className="btn btn-default btn-md dropdown-toggle" component="select">
                  {/* <select id="searchType" className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" {...actorDirector}> */}
                    <option />
                    <option value="actor" id="searchActor">Seach by Actor</option>
                    <option value="director" id="searchDirector">Seach by Director</option>
                  </Field>
                  {/* </select> */}
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
    'actorDirector'
  ],
}, null, {actorByRating})(SearchBar);

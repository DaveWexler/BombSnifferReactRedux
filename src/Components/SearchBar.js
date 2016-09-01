import React, { Component } from 'react'
import SearchBarContainer from '../Containers/SearchBarContainer'

const SearchBar=class extends Component {
  handleSubmit(event) {
    debugger
  }

  render() {
    return(
      <div>
        <div className="form-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <input className="form-control" type="text"  name="searchTerms" id="searchTerms" placeholder="search" />
                </div>
                <div className="col-md-3">
                  <select id="searchType" className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
                    <option value="actor" id="searchActor">Seach by Actor</option>
                    <option value="director" id="searchDirector">Seach by Director</option>
                  </select>
                </div>
              </div>
              <br />
              <div className="col-md-3">
                <input type="submit" id= "submit" className="btn btn-default btn-lg" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default SearchBar

import React, { Component } from 'react'

const SearchBar = class extends Component {
  render() {
    return(
      <div>
        <div class="form-center">
          <form role="form">
            <div class="form-group">
              <!-- input -->
              <div class="row">
                <!-- text -->
                <div class="col-md-6">
                  <input class="form-control" type="text"  name="searchTerms" id="searchTerms" size=50 placeholder="search" />
                </div>
                <!-- dropdown -->
                <div class="col-md-3">
                  <select id="searchType" class="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
                    <option value="actor" id="searchActor">Seach by Actor</option>
                    <option value="director" id="searchDirector">Seach by Director</option>
                  </select>
                </div>
              </div>
              <br />
              <div class="col-md-3">
                <button id= "submit" type="button" class="btn btn-default btn-lg">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux';
import SearchBar from '../Components/SearchBar'
import actorByRating from '../Actions/ActorByRating'
import bindActionCreators from 'redux'


// function mapDispatchToProps(dispatch){
//   return bindActionCreators({actorByRating: ActorByRating}, dispatch)
// }
//
//
// const SmartSearchBar = connect(null, mapDispatchToProps)(SearchBar)
//
// export default SmartSearchBar

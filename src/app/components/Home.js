import React, { Component } from 'react';
import DropDownBox from './dropdown/index';

export class Home extends Component {
constructor(props) {
    super();
    //set default states and variable values
    this.state = {
      results: null,
      searchText: '',
      searchResults: [],
      sortBy: "descend",
      isLowestId: true,
      selectedFilter: ''
    };
  };

  componentDidMount() {
    const url = `../../data/data.json`;
    fetch(url)
      .then((res) => res.json())
      .then(res => {

        this.setState({
          results: res
        })
      })
      .catch(() => {
        console.log('Error fetching data');
      })
  }

  onHandleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  onHandleSubmit(event) {
    event.preventDefault();
    this.onSearch(this.state.results, this.state.searchText, this.state.selectedFilter);
  }

  onSearch(data, query, filter) {
    let queryString = query.split(', ');
    let matchedQueries = [];

    if (data === null || query === '') {
      this.setState({
        searchResults: 'Search results not found'
      })
    }

    queryString.forEach((param) => {
      for (let i = 0, len = data.length; i < len; i++) {
        Object.values(data[i]).forEach(key => {
          if(key == param) {

            matchedQueries.push(data[i]);
            //TODO: Set indepth filter funtionality
            // if(filter === '') {
              this.addAllResults(matchedQueries);
            // }

            // if(filter === "First Name") {
            //   this.filterByFirstName(matchedQueries);
            // }
          }
        })
      }
    })
  }

  addAllResults(allQueryMatches) {
    this.setState({
      searchResults: this.state.searchResults.concat(allQueryMatches)
    })
  }

  filterByFirstName(allQueryMatches) {
    let filteredResults = [];
    allQueryMatches.forEach(element => {
      filteredResults.push(element.first_name);
    })

    this.setState({
      searchResults: this.state.searchResults.concat(filteredResults)
    })
  }

  filterByEmail(allQueryMatches) {

  }

  sortBy(searchResults) {
    if (this.state.isLowestId) {
      this.setState({
        searchResults: searchResults.sort()
      })
    } else {
      this.setState({
        searchResults: searchResults.reverse()
      })
    }
  }

  onSort(event) {
    this.sortBy(this.state.searchResults);
    this.setState({
      isLowestId: !this.state.isLowestId
    })
  }

  getSelectedFilterValue(selectedFilter) {
    this.setFilter(selectedFilter);
  }

  setFilter(selectedFilter) {
    this.setState({
      selectedFilter: selectedFilter
    })
  }

  resetSearchAndFilter() {
    this.setState({
      searchResults: [],
      selectedFilter: ''
    })
  }

  render() {
    let filterOptions = [
      {value: 'First Name', id: 1},
      {value: 'Last Name', id: 2},
      {value: 'Email', id: 3}
    ]
    return (
      <div>
      <div style={{margin: '16px', position: 'relative'}}>
          <DropDownBox title="Select filter"
          filterOptions={filterOptions}
          onSelectFilterOptiion={(filter) => this.getSelectedFilterValue(filter)}/>
      </div>
        <form onSubmit={(event) => this.onHandleSubmit(event)}>
            <label>
                Search:
                <input type="text" className="form-control" value={this.state.searchText}
                       onChange={(event) => this.onHandleChange(event)}/>
                <input type="submit" value="Submit" />
            </label>
        </form>
        <div>Results: {this.state.searchResults.map((item, index) => (
          <div className="border" key={index}>
             {/* this.state.selectedFilter == 'First Name' &&
              <p>FirstName: {item.first_name} </p>
             */ }
              <p>FirstName: {item.first_name}</p>
              <p>LastName: {item.last_name} </p>
              <p>Email: {item.email} </p>
          </div>

          ))}
        </div>
        <button className="btn btn-primary" onClick={(event) => {this.onSort(event)}}>Sort</button>
        <button className="btn btn-primary" onClick={() => {this.resetSearchAndFilter()}}>Reset</button>
      </div>
    );
  }
}

// Home.propTypes = {
//   FirstName: React.PropTypes.string,
// };

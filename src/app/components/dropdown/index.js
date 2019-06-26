import React, { Component } from 'react';
import "./style.css";

class DropDownBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOptions: this.props.filterOptions || [],
      showFilterOptions: false,
      selectedFilterOption: ''
    }
  }

  openList() {
    this.setState(prevState => ({
      showFilterOptions: !prevState.showFilterOptions
    }))
  }

  selectFilterOption(filterOption) {
    this.props.onSelectFilterOptiion(filterOption);
    this.setState({
      selectedFilterOption: filterOption,
    })
  }

  resetFilter() {
    this.setState({
      selectedFilterOption: ''
    })
  }

  render() {

    return <div className="select-box--container">
      <div className="select-box--selected-item"
      >
      Selected Filter: { this.state.selectedFilterOption.value }
          <h1>DropDown</h1>
          <div
            className="select-box--arrow"
            onClick={() => this.openList()}
          >

              <span className={`${this.state.showFilterOptions ? 'select-box-arrow-up':
            'select-box--arrow-down'}`}/>
          </div>
          <div
              style={{display: this.state.showFilterOptions ? 'block' : 'none'}}>
              {
                this.props.filterOptions.map((filterOption) => <div
                key={filterOption.id}
                onClick={() => this.selectFilterOption(filterOption)}
                className={this.state.selectedFilterOption === filterOption ? 'selected' : ''}
                >
                  { filterOption.value }
                </div>
                )
              }
          </div>
        </div>
    </div>
  }
}

export default DropDownBox

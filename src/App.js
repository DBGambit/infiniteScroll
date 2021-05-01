import React, { Component } from 'react';
import './App.css';
import CustomTable from './components/CustomTable/customTable';
import {data, headers} from './data';

class App extends Component {
  state = {
    data,
    headers
  }

  onItemClick = (index) => {
    let updtData = [...this.state.data]
    let item = {...updtData[index]}
    if (item.selected === undefined) {
      item.selected = true
    }else {
      item.selected = !item.selected
    }
    updtData[index] = item
    this.setState({data: updtData})
  }

  onRemoveItems = () => {
    let updtData = [...this.state.data]
    updtData = updtData.filter(i => !i.selected)
    this.setState({data: updtData})
  }

  onFilter = (type, i) => {
    if (this.state.headers[i].sorter) {
      let updtData = [...this.state.data]
      let updtHeaders = [...this.state.headers]
      let header = updtHeaders[i]
      if (header.sorted) {
        header.sorted = false
        updtHeaders[i] = header
        updtData.sort((a, b) => a[type] - b[type])
      }else {
        header.sorted = true
        updtHeaders[i] = header
        updtData.sort((a, b) => b[type] - a[type])
      }
      this.setState({data: updtData, headers: updtHeaders})
    }
    return
  }

  render() {
    return (
    <div className="App">
      <CustomTable
        headers={this.state.headers}
        data={this.state.data}
        onItemClick={this.onItemClick}
        onRemoveItems={this.onRemoveItems}
        onFilter={this.onFilter}
      />
    </div>
  );
  }
}

export default App;

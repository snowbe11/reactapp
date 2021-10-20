import logo from './logo.svg';
import './App.css';
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value:0
    }

    this.onclick = this.onclick.bind(this);
  }

  onclick() {
    this.setState({
      value:this.state.value + 1
    });
  }

  render() {
    return (
    <div>
      <h2>{this.state.value}</h2>
      <button onClick={this.onclick}>Increase</button>
    </div>);
  }
}

class CustomerInfo extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>{this.props.name}, {this.props.phone}</div>
    );
  }
}

class Phone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      library: [
        {
          name: 'james',
          phone: '010-0000-0001'
        },
        {
          name: 'henry',
          phone: '010-0000-0002'
        }
      ],
      selected: -1,
      isEditing: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onConfirmChange = this.onConfirmChange.bind(this);
  }

  onChange(e) {
    this.setState({
      library: e.target.value
    });
  }

  onClick(seletedIndex) {
    this.setState({
      selected:seletedIndex
    })
  }

  onDelete() {
    if (this.state.selected == -1)
    {
      return;
    }

    this.state.library.splice(this.state.selected, 1);
    let newIndex = -1;//Math.max(this.state.selected - 1, 0);

    this.setState({
      library: this.state.library,
      selected: newIndex
    });
  }

  onEdit() {
    this.setState({
      isEditing: true
    });
  }

  onConfirmChange() {
    this.setState({
      isEditing: false
    });
  }

  render() {
    const map_func = (data) => {
      data = data.filter(value => 
        value.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
      );

      return data.map((key, i) => {
        return (<CustomerInfo name={key.name} phone={key.phone} onClick={() => this.onClick(i)} />);
      });
    }

    let selectedItem = (this.state.selected != -1) ? this.state.library[this.state.selected] : null;

    return (
      <div>
        <div>
          <h>Contact</h>
          <hr></hr>
        </div>
        <div>
          <input name='search' placeholder='search' onChange={this.onChange}></input>
        </div>
        <div>
          {map_func(this.state.library)}
        </div>
        <hr></hr>
        <div>
          <CustomerDetail name={selectedItem ? selectedItem.name : ''} phone={selectedItem ? selectedItem.phone : ''} edit={this.state.isEditing}/>
          <br/>
          <button onClick={this.state.isEditing ? this.onConfirmChange : this.onEdit}>{this.state.isEditing ? 'Confirm' : 'Edit'}</button>
          <button onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    const ReadOnlyForm = (
      <div>
        {this.props.name}<br/>
        {this.props.phone}
      </div>
    );

    const EditForm = (
      <div>
        <input placeholder={this.props.name}>
        </input><br/>
        <input placeholder={this.props.phone}>
        </input>
      </div>
    );

    return (<div>{this.props.edit ? EditForm : ReadOnlyForm}</div>);
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Counter/>
        <Phone/>
      </div>
      );
  }
}

export default App;

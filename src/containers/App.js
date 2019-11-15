import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Radium from "radium";

class App extends Component {
  state = {
    persons: [
      { "id": "asdfd", name: "Max", age: 28 },
      { "id": "ascvd", name: "James", age: 25 },
      { "id": "asssd", name: "James", age: 25 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, index) => {
    const persons = [...this.state.persons]
    persons[index].name = event.target.value
    this.setState({
      persons: persons
    })
  }

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons]
    persons.splice(index, 1)
    this.setState(
      { persons: persons }
    )
  }



  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px sold blue",
      ":hover": {
        backgroundColor:"lightgreen",
        
      }
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
            <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>
        </div>
      )
      style.backgroundColor = "red";
    }
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <div>
            <p className={assignedClasses.join(' ')}>Hi, I'm a React App</p>
            <button style={style} onClick={this.togglePersonHandler}>Toggle persons</button>
        </div>
        {persons}
      </div>
    );
  }
};


export default Radium(App);


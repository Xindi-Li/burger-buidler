import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
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
          {this.state.persons.map((person, index) =>
            <Person
              name={person.name}
              age={person.age}
              changed={(event) => this.nameChangedHandler(event, index)}
              click={() => this.deletePersonHandler(index)}
              key={person.id} />
          )}
        </div>
      )
      style.backgroundColor = "red";
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }
    return (
      <div className="App">
        <p className={classes.join(" ")}>Hi, I'm a React App</p>
        <button style={style} onClick={this.togglePersonHandler}>Toggle persons</button>
        {persons}
      </div>
    );
  }
};


export default Radium(App);


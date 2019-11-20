import React from "react";
import Person from "./Person/Person"

class Persons extends React.Component {

    componentDidMount(){
        console.log("didMount");
    }

    componentDidUpdate(){
        console.log("didUpdate")
    }

    render() {
        return this.props.persons.map((person, index) =>
            <Person
                name={person.name}
                age={person.age}
                changed={(event) => this.props.changed(event, index)}
                click={() => this.props.clicked(index)}
                key={person.id} />
        )
    }
}

export default Persons;
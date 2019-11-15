import React from "react";
import Person from "./Person/Person"

const persons = props => (
    props.persons.map((person, index) =>
        <Person
            name={person.name}
            age={person.age}
            changed={(event) => props.changed(event, index)}
            click={() => props.clicked(index)}
            key={person.id} />
    )
)

export default persons;
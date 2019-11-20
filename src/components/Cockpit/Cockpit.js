import React, {useEffect} from "react";

const cockpit = (props) => {
  useEffect(()=>{
    
  })
    const classes = [];
    if (props.state.persons.length <= 2) {
      classes.push("red");
    }
    if (props.state.persons.length <= 1) {
      classes.push("bold");
    }
    return (
        <div>
            <p className={classes.join(" ")}>Hi, I'm a React App</p>
            <button style={style} onClick={props.togglePersonHandler}>Toggle persons</button>
        </div>
    )
}
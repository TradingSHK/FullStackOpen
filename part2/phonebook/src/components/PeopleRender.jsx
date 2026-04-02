const PeopleRender = (props) => {
    return (
        <div>{props.personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}</div>
    )
}

export default PeopleRender
import Entry from './Entry'

const PeopleRender = (props) => {
    return (
        <div>{props.personsToShow.map(person => <Entry key={person.id} name={person.name} number={person.number} id={person.id} onDelete={props.onDelete}/>)}</div>
    )
}

export default PeopleRender
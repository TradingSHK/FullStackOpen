import entryService from './../services/entry'

const Entry = (props) => {
    return(
        <li>{props.name} {props.number} <button onClick={() => dialogAndDeleteCall(props)}>Delete</button></li>
    )
}

const dialogAndDeleteCall = (props) => {
    if(confirm(`Delete ${props.name}?`)){
        entryService.deleteEntry(props.id).then(() => props.onDelete(props.id))
    }

} 

export default Entry
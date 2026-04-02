const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.nameToLookFor} onChange={props.handleFilter}/>
        </div>
    )
}

export default Filter
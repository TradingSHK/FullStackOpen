import Part from './Part'

const Content = (props) => {
    //const parts = props.parts.map(part => <Part part={part}/>)
    return(
        props.parts.map(part => <Part key={part.id} part={part}/>)
    )
}

export default Content
import axios from 'axios'
import countryService from '../services/country'
import { useState, useEffect } from 'react'

const Country = ({ countryName, capital, area, languages, flag }) => {
    if (!countryName || !capital || !area || !languages || languages.length === 0 || !flag) {        
        console.log(countryName, capital, area, languages, flag);
        
        return null
    }

    return (
        <div>
            <h2>{countryName}</h2>
            <p>Capital {capital}</p>
            <p>area {area}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul> 
            <img src={flag}/>
        </div>
    ) 
}

export default Country
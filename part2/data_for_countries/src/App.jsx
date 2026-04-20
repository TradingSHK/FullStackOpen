import { useState, useEffect } from 'react'
import Country from './components/Country'
import countryService from './services/country'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState('')
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleCountryChange = (event) => {    
    countryService.getAll().then(response => {
      const countryToLookFor = event.target.value
      const listOfCountries = response.map(country => country["name"]["common"])
      const filtered = listOfCountries.filter(country => country.toLowerCase().includes(countryToLookFor.toLowerCase()))
      
      setFilteredCountries(filtered)
      
      if (filtered.length === 1) {
        // Automatically fetch the single matching country
        countryService.getCountry(filtered[0]).then(countryResponse => {
          setCountry(countryResponse["name"]["common"])
          setCapital(countryResponse["capital"][0])
          setArea(countryResponse["area"])
          setLanguages(Object.values(countryResponse["languages"]))     
          setFlag(countryResponse["flags"]["png"])
        })
      } else {
        // Clear country data if multiple results
        setCountry('')
        setCapital('')
        setArea('')
        setLanguages([])
        setFlag('')
      }
    })
    
    setCountryName(event.target.value)
  }

  const searchCountry = event => {
    event.preventDefault()
    countryService.getCountry(countryName).then(response => {
      setCountry(response["name"]["common"])
      setCapital(response["capital"][0])
      setArea(response["area"])
      setLanguages(Object.values(response["languages"]))     
      setFlag(response["flags"]["png"])
    })
  }

  return (
    <div>
      <form id="countrySearch">
        <p>find countries</p>
        <input value={countryName} onChange={handleCountryChange}/>
      </form>
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <div>
          <h3>Results:</h3>
          <ul>
            {filteredCountries.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        </div>
      )}
      <Country countryName={country} capital={capital} area={area} languages={languages} flag={flag}/>
    </div>
  )
}

export default App
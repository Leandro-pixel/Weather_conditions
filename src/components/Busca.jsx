import React from 'react'
import { SearchButton, SearchCity, SearchContainer } from './BuscaStyles'

const Busca = ({city, setCity, searchWeather}) => { //usa-se ({para poder passar as props como argumentos})
  //buscar clima é disparado com o botão
  //o input vai ser quando digitar algo ou seja onchange
  return (
    <SearchContainer>
        <SearchCity type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite uma cidade..."
        />
        <SearchButton onClick={searchWeather}>Buscar</SearchButton>
    </SearchContainer>
  )
}

export default Busca
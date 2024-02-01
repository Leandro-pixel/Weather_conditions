
import Busca from './components/Busca'
import ClimaAtual from './components/ClimaAtual'
import Previsao from './components/Previsao'

import { useState, useEffect } from 'react'
import axios from "axios"

import {Titulo, WeatherContainer} from "./AppStyles.js"

function App() {

  const [city, setCity] = useState(""); //nome = string
  const [weather, setWeather] = useState(null); //todas as informações do clima = array = null
  const [forecast, setForecast] = useState([]);//vazio pois é uma lista

  const apiKey = import.meta.env.VITE_API_KEY || "";

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(async (position) => { //usa essa função para conseguir a localização do usuário
      //console.log(position)

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      const responseForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );
        setCity(response.data.name)
        setWeather(response.data)
        setForecast(responseForecast.data.list.slice(0,5))
    });

  }, [apiKey]);

  const searchWeather = async() => { //tem que ser uma função asincrona
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br` //aqui esses 'q=' 'appid=' são tags urls de pesquisa, é preciso consultar uma tabela pra saber qual usar
        ); //buscando algum dado da API

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br` //aqui esses 'q=' 'appid=' são tags urls de pesquisa, é preciso consultar uma tabela pra saber qual usar
          );

        setWeather(weatherResponse.data); //data pra voltar com o conteúdo dela
        setForecast(forecastResponse.data.list.slice(0,5));//slice para extrair as 5 primeiras
    } catch(error) {
      console.log("Erro ao buscar clima: ", error)
    }
  };

  //console.log(forecast)

  return (
    <>
    <WeatherContainer>
      <Titulo>Condições climáticas</Titulo>
      <Busca city={city} setCity={setCity} searchWeather={searchWeather}/> 
      
      {weather &&   
      //aqui como a variavel começa em null é preciso ter uma ação para null
      <ClimaAtual weather={weather} />}

      {forecast.length > 0 && <Previsao forecasts={forecast}/>}
    </WeatherContainer>
    </>
  )
}

export default App

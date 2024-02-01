import React from 'react'
import { ForecastContainer } from './PrevisaoStyles'

const Previsao = ({forecasts}) => {
  return (
    <ForecastContainer>
        <h4>Previsão para as próxima horas:</h4>
        <ul>
        {forecasts.map((forecast) => (
          <li forecast={forecast.dt}>
         <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
         alt= {forecast.weather[0].description}
         />

             {forecast.main.temp}ºC - {forecast.weather[0].description}
          </li>
        ))}
            
        </ul>
    </ForecastContainer>
  )
}

export default Previsao
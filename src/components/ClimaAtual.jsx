import { WeatherInfo } from './ClimaAtualStyles'

const ClimaAtual = ({weather}) => {
  return (
    <WeatherInfo>
        <h3>{weather.name}</h3>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
         alt={weather.weather[0].description} />
        <p>{weather.main.temp}ºC</p>
        <p>{weather.weather[0].description}</p>
    </WeatherInfo>
  )
}

export default ClimaAtual
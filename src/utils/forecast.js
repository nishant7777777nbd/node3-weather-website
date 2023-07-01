

const request = require('request')

const forecast= (latitude , longitude, callback) => {
  //  const baseUrl='https:api.openweathermap.org/data/2.5/weather?lat=26.6333&lon=92.8&appid=5d9e9f2216191dac607f5862268a1f31`
  console.log(latitude,longitude)
     const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
//    const lat= 26.6333;
//  const lon=92.8; 
    
    const units = 'metric';
    
    const requestUrl = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${process.env.FORECAST_API_TOKEN}&units=metric`;

    request.get(requestUrl, (error, response,body) => {
      
  
        if (error) {
          callback('Unable to connect to weather service ',undefined);
        } 
        else if(response.body.error){
          callback('Unable to find location')
        }
          else {
            const data = JSON.parse(body)
            console.log( data.weather)
            // console.log(data)
          callback(undefined, 'It is currently '+ data.main.temp + ' and feels like '+ data.main.feels_like + ' .The humidity is '+ data.main.humidity + ' and has ' + data.weather[0].description )
    // callback(undefined, 'de aar')
}
    });
}
     module.exports = forecast
     
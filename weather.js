let api_key = '2faeef6daac08a854737c16d695cc2b9';

const iconImg = document.getElementById('weather-icon');
const date = document.querySelector('#date')
const city = document.querySelector('#location');
const tempF = document.querySelector('.tempnow');
const tempH = document.querySelector('.high');
const tempL = document.querySelector('.low');
const cond = document.querySelector('.conditions');
const hum = document.querySelector('.humidity');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
 
 
$(document).ready(function(){ 
    $('#submit').on('click', function() { 
        var zipcode = $("#zipCode").val()
  if (!zipcode || zipcode.length < 5 || zipcode.length > 5) {
      alert("The Zip/Postal Code is missing or invalid.")

  }else{
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api_key}&units=imperial`      ;
   
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const  temp  = data.main.temp;
          const  temph  = data.main.temp_max;
          const  templ  = data.main.temp_min;
          const place = data.name;
          const humidity = data.main.humidity
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    

          const sunriseEST = new Date(sunrise * 1000);
          const sunsetEST = new Date(sunset * 1000);
          
          let currentDate = new Date();
          let tday = currentDate.getDate();
          let month = currentDate.getMonth() + 1;
          let year = currentDate.getFullYear();
          let hours = currentDate.getHours() ;
          function formatHoursTo12(hours) {
            return hours % 12 || 12;
          }
          let cTime = formatHoursTo12(hours) + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
          let dayOfWeek = currentDate.toLocaleString("default", { weekday: "long" })

         
 
          iconImg.src = iconUrl;
          date.textContent = 'Today is ' + dayOfWeek + ", " + month + "/" + tday + "/" + year + "\n\n\n" + cTime;
          city.textContent = 'City:' + "\n"  + `${place}`;
          cond.textContent = 'Conditions:' + "\n"  + `${description}`;
          tempF.textContent = 'Temp Now:' + "\n"  + `${temp} °F`;
          tempH.innerHTML = 'High:' + "\n"  + `${temph} °F`;
          tempL.textContent = 'Low:' + "\n"  + `${templ} °F`;
          hum.textContent = 'Humidity:' + "\n"  + `${humidity} %`;
          sunriseDOM.textContent = 'Sunrise:' + "\n"  + `${sunriseEST.toLocaleDateString()}, ${sunriseEST.toLocaleTimeString()}`;
          sunsetDOM.textContent = 'Sunset' + "\n"  + `${sunsetEST.toLocaleDateString()}, ${sunsetEST.toLocaleTimeString()}`;
        })}})})
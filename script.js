let  row=document.querySelector(".row");
let btn=document.querySelector("btn");
let coountries = fetch ("https://restcountries.com/v3.1/all");
coountries.then((data)=>data.json()).then((data1)=>{
    data1.forEach(element => {

        let div=document.createElement("div");
        
        div.className="col-sm-6 col-md-4 col-lg-4 col-xl-4";
        
        let fileload=template(element);
        
        div.innerHTML=fileload;
        
        row.appendChild(div);
        
    });
})

let template= (country)=>{
    let temp=`
        <div class="card h-100" >
            <div class="card-header">
            ${country.name.common}
            </div>
            <div class="card-body">
                <img class="card-img-top" src="${country.flags.png}" alt="Avatar">
                <div class="card-text">
                <br>
                <p class="card-text"><b>Capital:</b>${country.capital}</p>
                <p class="card-text"><b>Region :</b>${country.region}</p>
                <p class="card-text"><b>Country Code :</b> ${(country.fifa!=undefined)?country.fifa:country.cca3}</p>
                <p class="card-text"><b>Population :</b> ${(country.population)}</p>
                <br>
            </div>
                <button class="btn btn-primary" onclick="cityWeather([${country.latlng[0]},${country.latlng[1]}],'${country.name.common}')">click for weather</button>
                <p id="load${country.name.common}"></p>
            </div>
        </div><br>`;        
    return temp
}
let cityWeather=(lan,name)=>{
    let [lat,lon]=lan
    let l=document.getElementById(`load${name}`)
    l.innerHTML="Loading...please wait...";
    //fetching weather api
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f39c72d26289aee877598fdfd5e4280d`
    fetch(url).then((ress)=>ress.json()).then((data1)=>{
        
        //weather msg template
        let weatherMsg=`
        Country     :  ${data1.name}
        Latiture    :  ${lat}  
        Longiture   :  ${lon}
        Weather     :  ${data1.weather[0].description}
        Temperature :  ${data1.main.temp}
        windspeed   :  ${data} 
        `;
        
        //we are going to show weather report via alert.
        alert(weatherMsg);
        l.innerHTML="";
})
}
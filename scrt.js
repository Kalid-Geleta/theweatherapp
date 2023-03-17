
document.querySelector(".temp1h");
document.querySelector(".temp1l");





console.log("https://api.open-meteo.com/v1/forecast?latitude="+"&&longitude="+"&&hourly=relativehumidity_2m,precipitation,rainstat,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_80m,temperature_80m&&start_date="+start_end()[0]+"+&&end_date="+start_end()[1]);
function main(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((element)=>
        {var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+element.coords.latitude+"&longitude="+element.coords.longitude+"&localityLanguage=en").then(response=>response.json()).then(result=>{
            
            document.querySelector(".header").innerText= result['city'].split(" ").join(",")+" "+result['countryName']

          });
           fetch("https://api.open-meteo.com/v1/forecast?latitude="+element.coords.latitude+"&&longitude="+element.coords.longitude+"&&hourly=relativehumidity_2m,precipitation,rain,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_80m,temperature_80m&&start_date="+start_end()[0]+"&&end_date="+start_end()[1], requestOptions)
            .then(response => response.json())
            .then(result =>{
              
                const d = new Date();
                // averageofsections(result['hourly']['temperature_80m'],7)[d.getDay()]
              console.log(averageofsections(result['hourly']['relativehumidity_2m'],7)[d.getDay()])
                console.log(averageofsections(result['hourly']['precipitation'],7)[d.getDay()])
                // averageofsections(result['hourly']['rainstat'],7)[d.getDay()]
                // averageofsections(result['hourly']['cloudcover_low'],7)[d.getDay()]
                // averageofsections(result['hourly']['cloudcover_mid'],7)[d.getDay()]
                // averageofsections(result['hourly']['cloudcover_high'],7)[d.getDay()]
                // averageofsections(result['hourly']['windspeed_80m'],7)[d.getDay()]
               

month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","oct","Nov","Dec"]
day=["Monday","Tuesday","Wenesday","Thursday","Friday","Saturday","Sunday"]

date1=[day[d.getDay()-1],month[d.getMonth()]].join(",");
date2=[date1,d.getDate(),d.getFullYear()].join(" ");


document.querySelector(".date").innerText=date2;
document.querySelector(".todaytemp").innerText=averageofsections(result['hourly']['temperature_80m'],7)[d.getDay()].toFixed(1);
document.querySelector(".precipitation").innerText=String((averageofsections(result['hourly']['precipitation'],7)[d.getDay()]).toFixed(2));
//console.log(averageofsections(result['hourly']['relativehumidity_2m'])[d.getDay()]);
document.querySelector(".humidity").innerText=String((averageofsections(result['hourly']['relativehumidity_2m'],7)[d.getDay()]).toFixed(2));
document.querySelector(".wind").innerText=(averageofsections(result['hourly']['windspeed_80m'],7)[d.getDay()]).toFixed(2);

document.querySelector("#icon1").classList.add(...weatherinfo(averageofsections(result['hourly']['rain'],7)[d.getDay()],averageofsections(result['hourly']['cloudcover_high'],7)[d.getDay()], averageofsections(result['hourly']['cloudcover_mid'],7)[d.getDay()],averageofsections(result['hourly']['cloudcover_low'],7)[d.getDay()], averageofsections(result['hourly']['windspeed_80m'],7)[d.getDay()]).split(" "));


classes=["#icon2","#icon3","#icon4","#icon5","#icon6","#icon7","#icon8"];



let i=0;
classes.forEach((element)=>{

  if(i<classes.length){
    
  document.querySelector(element).classList.add(...weatherinfo(averageofsections(result['hourly']['rain'],7)[i],averageofsections(result['hourly']['cloudcover_high'],7)[i], averageofsections(result['hourly']['cloudcover_mid'],7)[i],averageofsections(result['hourly']['cloudcover_low'],7)[i], averageofsections(result['hourly']['windspeed_80m'],7)[i]).split(" "));
  i++;

  }

});
m=0;
  smallestlargestweek(result['hourly']['temperature_80m'],7).forEach(element=>{
  
    document.querySelector(".t"+m).innerText=element[0];
    m++;
    document.querySelector(".t"+m).innerText=element[1];
    m++;

  });
 
  const key = 'jczdwEzUnS73GJ2fZlQK';
  console.log(element.coords.latitude);
    console.log(element.coords.longitude);
      const map = L.map('map').setView([element.coords.latitude,element.coords.longitude], 15); //starting position
      L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(map);
      L.marker([element.coords.latitude,element.coords.longitude]).addTo(map);

  //console.log(weatherinfo(averageofsections(result['hourly']['rain'],7)[d.getDay()],averageofsections(result['hourly']['cloudcover_high'],7)[d.getDay()], averageofsections(result['hourly']['cloudcover_mid'],7)[d.getDay()],averageofsections(result['hourly']['cloudcover_low'],7)[d.getDay()], averageofsections(result['hourly']['windspeed_80m'],7)[d.getDay()]))

            })
            .catch(error => console.log('error', error));}
        );
    
    }


  }
  main();
  

function weatherinfo(rain,ch,cm,cl,w){
  let cloudstat="";
  let rainstat="";
  let windspeed="";
  if(ch>cm){
    cloudstat="Sunny"
  }
  else if (cm>cl){
    cloudstat="Parital Cloudy"
  }
  else{
cloudstat="Cloudy"
  }

  if(rain<2.5){
    rainstat="lightrain";

  }
  else if(rain<7.6){;
    rainstat="midrain"

  }
  else{
    rainstat="highrain";

  }

if(w/1.609344<20){
windspeed="lightwind";
}
else if(w/1.609344<30){
  windspeed="midwind";

}
else{
windspeed="highwind"
}

console.log(cloudstat,rainstat,windspeed)

if(cloudstat=="Sunny"&&rainstat=="lightrain"&&windspeed=="lightwind"){
  return "fa-sharp fa-solid fa-sun";
}
else if (cloudstat=="Sunny"&&rainstat=="lightrain"&&windspeed=="midwind"){
  return "fa-solid fa-cloud-sun-rain";
}
else if (cloudstat=="Sunny"&&rainstat=="lightrain"&&windspeed=="highwind"){
  return "fa-solid fa-wind"
}
else if (cloudstat=="Sunny"&&rainstat=="midrain"&&windspeed=="lightwind"){
  return "fa-solid fa-cloud-sun-rain";
}
else if (cloudstat=="Sunny"&&rainstat=="midrain"&&windspeed=="midwind"){
  return "fa-sharp fa-solid fa-sun";
}
else if (cloudstat=="Sunny"&&rainstat=="midrain"&&windspeed=="highwind"){
  return "fa-solid fa-wind";
}
else if (cloudstat=="Sunny"&&rainstat=="highrain"&&windspeed=="lightwind"){
  return "fa-solid fa-cloud-sun-rain";
}
else if (cloudstat=="Sunny"&&rainstat=="highrain"&&windspeed=="midwind"){
  return "fa-solid fa-cloud-showers-heavy";

}
else if (cloudstat=="Sunny"&&rainstat=="highrain"&&windspeed=="highwind"){
  return "fa-solid fa-cloud-showers-heavy";
}

else if (cloudstat=="Parital Cloudy"&&rainstat=="lightrain"&&windspeed=="lightwind"){
 return "fa-solid fa-cloud-sun-rain";
}
else if (cloudstat=="Parital Cloudy"&&rainstat=="lightrain"&&windspeed=="midwind"){
  return  "fa-solid fa-cloud-sun-rain";

}
else if (cloudstat=="Parital Cloudy"&&rainstat=="lightrain"&&windspeed=="highwind"){
  return  "fa-solid fa-cloud-sun-rain";

}
else if (cloudstat=="Parital Cloudy"&&rainstat=="midrain"&&windspeed=="lightwind"){
  return  "fa-solid fa-cloud-sun-rain";

}
else if (cloudstat=="Parital Cloudy"&&rainstat=="midrain"&&windspeed=="midwind"){
  return  "fa-solid fa-cloud-showers-heavy";

}
else if (cloudstat=="Parital Cloudy"&&rainstat=="midrain"&&windspeed=="highwind"){
  return  "fa-solid fa-cloud-showers-heavy";
  
}
else if (cloudstat=="Parital Cloudy"&&rainstat=="highrain"&&windspeed=="lightwind"){
  return  "fa-solid fa-cloud-showers-heavy";

}
else if (cloudstat=="Parital Cloudy"&&rainstat=="highrain"&&windspeed=="midwind"){
  return  "fa-solid fa-cloud-showers-heavy";
}
else if (cloudstat=="Parital Cloudy"&&rainstat=="highrain"&&windspeed=="highwind"){
  return  "fa-solid fa-cloud-showers-heavy";
}
else if (cloudstat=="Cloudy"&&rainstat=="lightrain"&&windspeed=="lightwind"){
  return "fa-solid fa-cloud";

}
else if (cloudstat=="Cloudy"&&rainstat=="lightrain"&&windspeed=="midwind"){
  return "fa-solid fa-cloud";
}
else if (cloudstat=="Cloudy"&&rainstat=="lightrain"&&windspeed=="highwind"){
  return "fa-solid fa-cloud";
}
else if (cloudstat=="Cloudy"&&rainstat=="midrain"&&windspeed=="lightwind"){
  return "fa-solid fa-cloud";
}
else if (cloudstat=="Cloudy"&&rainstat=="midrain"&&windspeed=="midwind"){
  return "fa-solid fa-cloud";
}
else if (cloudstat=="Cloudy"&&rainstat=="midrain"&&windspeed=="highwind"){
  return "fa-sharp fa-solid fa-wind";
}
else if (cloudstat=="Cloudy"&&rainstat=="highrains"&&windspeed=="lightwind"){
  return  "fa-solid fa-cloud-showers-heavy";
}
else if (cloudstat=="Cloudy"&&rainstat=="highrain"&&windspeed=="midwind"){
  return  "fa-solid fa-cloud-showers-heavy";
}
else if (cloudstat=="Cloudy"&&rainstat=="highrain"&&windspeed=="highwind"){
  return  "fa-solid fa-cloud-showers-heavy";
}
else{
return "error";
}

  

}

function averagecalculater(arr){
sum=0;


    arr.forEach(element => {
        sum+=element;
         
    });
    return sum/arr.length;
       

}

function start_end(){
    const d = new Date();
    arr=(d.getDate());
    start=[d.getFullYear(),String((d.getMonth()+1)).padStart(2, '0'),String((d.getDate()-(d.getDay()-1))).padStart(2, '0')].join("-");
    end=[d.getFullYear(),String((d.getMonth()+1)).padStart(2, '0'),String((d.getDate()-(d.getDay()-1))+6).padStart(2, '0')].join("-");;
     return [start,end];
}

function findthenumber(arr,ord){
    number=arr[0];
  if (ord=="largest"){
    arr.forEach(element=>{
        if(element>number){
            number=element;
        }
    });
  }else{

    arr.forEach(element=>{
        if(element<number){
            number=element;
        }
    });
  }


  return number;
  }
  function averageofsections(arr,sec){

   startingpoint=0
   stopingpoint=Math.floor((arr.length+1)/sec)
   point=Math.floor((arr.length+1)/sec);
   container=[];
   for(i=1;i<=sec;i++){
    if(i==sec){
  
         container.push(averagecalculater(arr.slice(startingpoint,arr.length)))
       return container;
    } 
  
    container.push(averagecalculater(arr.slice(startingpoint,stopingpoint)))
    startingpoint=stopingpoint
    stopingpoint=(i+1)*point;
   }
  }
  function sections(arr,sec){

    startingpoint=0
    stopingpoint=Math.floor((arr.length+1)/sec)
    point=Math.floor((arr.length+1)/sec);
    container=[];
    for(i=1;i<=sec;i++){
     if(i==sec){
   
          container.push(arr.slice(startingpoint,arr.length))
        return container;
     } 
   
     container.push(arr.slice(startingpoint,stopingpoint))
     startingpoint=stopingpoint
     stopingpoint=(i+1)*point;
    }
   }
 
   function smallestlargestweek(arr,numberofsections){
    bigcontiner=[]
   
    sections(arr,numberofsections).forEach((element)=>{
      smallcontiner=[];
     

      smallcontiner.push(findthenumber( element ,"smallest"))
      smallcontiner.push(findthenumber( element ,"largest"))
      bigcontiner.push(smallcontiner);

    })
return bigcontiner;

   }
 ar= [1,3,4,6,7,8,2,8,6,4,5,2,1,0,3,2,1]

console.log(smallestlargestweek([1,3,4,6,7,8,2,8,6,4,5,2,1,0,3,2,1],6))


 

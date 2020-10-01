import { handleURL } from "./formChecker";
import { text } from "body-parser";

// event.preventDefault()
let allData = {};
    //let form = document.querySelector('form');
    //const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
    //const username = "diana_szalai";
    //const weatherbitUrl= 'https://api.weatherbit.io/v2.0/forecast/daily?';
    //const ApiKey= '6c93fef169ea443692a449b79c652cf8';
    //const pixabayUrl = 'https://pixabay.com/api/?key=';
    //const pixabayAPI = '17209347-c5f003843d069024e54cd72f8';
    const foodUrl= 'https://api.spoonacular.com/recipes/complexSearch?apiKey='
    const ApiKey =  '49c37fe7674b4a0aada0534814cd0333';
    const idFoodUrl = 'https://api.spoonacular.com/recipes/'

export function handleSubmit(e) {
        e.preventDefault(); //Prevent default behaviour to stop page reload
        // Getting element value from DOM
        allData.ingredients = document.getElementById('name').value;
        allData.number = document.getElementById('carbs').value;
        allData.cuisine = document.getElementById('cuisine').value;
        let text = document.getElementById('name').value;
        let crbs = document.getElementById('carbs').value;
        let lang = document.getElementById('cuisine').value;
        //const departure =new Date(document.getElementById('departure_date').value );
        //const arrival =new Date(document.getElementById('arrival_date').value );
        let apiURL = foodUrl + ApiKey + '&query=' + text + '&maxCarbs=' + crbs + '&cuisine=' +lang ;
        console.log(apiURL)
        //console.log(`This is to see the date`)
        //var startDate = departure.getTime();
        //var endDate = arrival.getTime();
        //var stampDate= Math.floor((endDate-startDate) / (60 * 60 *  24 * 1000));
        //allData.stampDate = stampDate
        //console.log(`Calculate the diff:`)
        //console.log(stampDate)
         //Check the input destination 
        if (text.length !== 0){
        try { 
            // Fetching geo stats of destination place.
            getGeoDetails(allData.ingredients, allData.number, allData.cuisine )
                .then((toInfo) => {
                    //Assigning the fetched value from JSON toInfo
                    console.log('2')
                    console.log(toInfo)
                    console.log(`----------This is the URL FOR FOOD`)
                    console.log(apiURL);
                    console.log (toInfo);
                    const idNumber = toInfo.results[0].id;
                    const title = toInfo.results[0].title;
                    let someData = toInfo.results; 
                    console.log('------------important')
                    console.log(someData)
                        let recData = {
                            accounting: []
                    };
                    for (var i in someData) {
                        var item = someData[i];
                        recData.accounting.push({
                            "id" : item.id,
                            "title" : item.title,
                            "image" : item.image
                        });
                    };
                    console.log('------------important')
                    console.log(recData.accounting)
                    console.log('----------very--important')
                    let arrayResults = recData.accounting
                    console.log(arrayResults)
                    allData.accounting= arrayResults;

                    //const latt = toInfo.geonames[0].lat;
                    //const long = toInfo.geonames[0].lng;
                    //allData.name = toInfo.geonames[0].name;
                    //allData.countryCode = toInfo.geonames[0].countryCode
                    //console.log(latt, long)
                    console.log(idNumber, title )
                    //Getting Weather details
                    return getWeatherData(idNumber, title ) 
                })
                .then((foodData) => {
                    //console.log(`${idFoodUrl}${idNumber}/information?apiKey=${ApiKey}&includeNutrition=false`)
                    console.log(foodData)
                    //Storing the weather info
                    allData.sourceUrl = foodData.sourceUrl;
                    allData.title = foodData.title;
                    allData.summary = foodData.summary;
                    allData.title = foodData.title;
                    allData.image = foodData.image;
                    console.log('------------3')
                    console.log(allData)
                    //Calling Pixabay API to fetch the first img of the city
                    return getImage(allData.destination);
                })
               // .then((allData) => {
                    //if (imageDetails.hits.length > 0) {
                      //  allData.cityImage = imageDetails.hits[0].webformatURL ;
                        updateInfo(allData);
                  //  }
               // })
        } catch (e) {
            console.log('error', e);
        }
     }
}
    // Function to get Geo stats
async function getGeoDetails(ingredients, number, cuisine) {
    console.log(1)
    console.log('-------first URL')
    console.log(foodUrl + ApiKey + '&query=' + ingredients + '&maxCarbs=' + number + '&cuisine=' + cuisine)
    const response = await fetch(foodUrl + ApiKey + '&query=' + ingredients + '&maxCarbs=' + number + '&cuisine=' + cuisine);
    try {
        return await response.json();
    } catch (e) {
        console.log('(1)There was an error :', e);
    }
}

//Function to get weather data
async function getWeatherData(idNumber, title ) {
    console.log(idNumber)
    console.log('-------second URL')
    console.log(idFoodUrl + idNumber + '/information?apiKey=' + ApiKey + '&includeNutrition=false')
        const response = await fetch(idFoodUrl + idNumber + '/information?apiKey=' + ApiKey + '&includeNutrition=false');
        try {
        return await response.json();
        //return await response.json();
    } catch (e) {
        console.log('(2)There was an error :', e)
    }
}

async function getImage(city) {
    const imgUrl = allData.image;
    //const apiURL = `${imgUrl}${pixabayAPI}&q=${city}&image_type=photo`
    console.log(imgUrl)
    //console.log(apiURL)
   // const response = await fetch(pixabayUrl + pixabayAPI + '&q=' + city + '&image_type=photo');
    //console.log('3')
    //console.log(response)
    //try {
     //   return await response.json();
   // } catch (e) {
  //      console.log('(3)There was an error :', e);
 //   }
}

//async function calculateTime(date) {
  //  const response = await fetch(pixabayUrl + pixabayAPI + '&q=' + city + '&image_type=photo');
    //console.log('3')
    //console.log(response)
 //   try {
 //       return await response.json();
 //   } catch (e) {
 //       console.log('(3)There was an error :', e);
 //   }
//}

//Updating the UI
function updateInfo(allData) {
    document.getElementById('myAnchor').src = allData.image;
    document.getElementById('recipe1').src = allData.accounting[1].image;
    document.querySelector('.cityName').textContent = allData.title;
    document.querySelector('.recipe-1').textContent = allData.accounting[1].title;
    document.querySelector('.recipe-2').textContent = allData.accounting[2].title;
    document.querySelector('.recipe-3').textContent = allData.accounting[3].title;
    document.querySelector('.recipe-4').textContent = allData.accounting[4].title;
    document.querySelector('.recipe-5').textContent = allData.accounting[5].title;
    document.querySelector('.recipe-5').textContent = allData.accounting[5].title;
    document.querySelector('.countryCode').textContent = allData.summary
    //document.getElementById('iconID').src = `/src/client/views/icons/${allData.weatherIcon}.png`;
    //console.log(`/src/client/views/icons/${allData.weatherIcon}.png`)
    //document.querySelector('.temperature').textContent =`${allData.temperature} °C` ;
    //document.querySelector('.weatherDescription').textContent = allData.weatherDesc;
    //document.querySelector('.travelTime').textContent = allData.stampDate;
} 


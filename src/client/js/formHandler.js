import { handleURL } from "./formChecker";
import { text } from "body-parser";

// event.preventDefault()
let allData = {};
    const foodUrl= 'https://api.spoonacular.com/recipes/complexSearch?apiKey='
    //const ApiKey =  '49c37fe7674b4a0aada0534814cd0333';
   // const ApiKey =  '7ec74b107fba44ee83fb5886d1282e6f'
    const ApiKey = 'c4d6cc06367049f190047e8d4a69953c'
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
        let apiURL = foodUrl + ApiKey + '&query=' + text + '&maxCarbs=' + crbs + '&cuisine=' +lang ;
        console.log(apiURL)
        if (text.length !== 0){
        try { 
            // Fetching geo stats of destination place.
            getGeoDetails(allData.ingredients, allData.number, allData.cuisine )
                .then((toInfo) => {
                    //Assigning the fetched value from JSON toInfo
                    console.log('2')
                    console.log(apiURL);
                    const idNumber = toInfo.results[0].id;
                    const title = toInfo.results[0].title;
                    let someData = toInfo.results; 
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
                    let arrayResults = recData.accounting
                    console.log(arrayResults)
                    allData.accounting= arrayResults;
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
                console.log(`------------>>>>>>problem`)
                console.log(allData)        
                updateInfo(allData);
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
    console.log(`_________________->>>>>`)
    console.log(allData)
    //document.querySelector('.cityName').textContent = allData.title;
        let finalArray = [];
        allData.accounting.forEach(element => {

            if (!finalArray.includes(element.title)){
                finalArray.push(element.title);
         }
            console.log(`-------->>>>>>`+ finalArray)

            var node = document.createElement("LI");
            var img = document.createElement('img');
            document.querySelector('.cityImg').appendChild(img);
            img.src = element.image
            var textnode = document.createTextNode(element.title);
            node.appendChild(textnode);
            document.getElementById("myList").appendChild(node);
    })
    //document.querySelector('.countryCode').textContent = allData.summary    
} 

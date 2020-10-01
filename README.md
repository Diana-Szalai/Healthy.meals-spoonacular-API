# FEND Capstone - Travel App


This project aims to build a custom travel app. It is very JavaScript heavy, but still has a clean and appealing HTML/CSS. It has changings in the DOM, working with objects, it retrievs data from 3 APIs in which one of those is reliant on another to work. Finally, this is all done in a Webpack environment, using an express server, and wrapped up with service workers.

This is a travel application which includes a simple form where you enter the location you are traveling to and the date you are leaving and also the returning date. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. Weatherbit API only takes in coordinates for weather data so I needed to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.


## Running the app

- `cd` into your new folder and run:
- ```npm install```
- ```npm install build-dev```
- ```npm start index.js``` to start the server -this app runs on localhost:8080 
- ``` Options from the Extend your Project/Ways to Stand Out sections that have been added ```:
- Add end date and display length of trip.
- Incorporate icons into forecast.

## Images

<img src="https://github.com/Diana-Szalai//Travel_app/blob/master/src/client/views/photos/Img_2.png?raw=true" width="423" height="266" />
<img src="https://github.com/Diana-Szalai//Travel_app/blob/master/src/client/views/photos/Img_1.png?raw=true" width="423" height="264" />

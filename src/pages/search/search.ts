
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

declare var google: any; //declare global variable

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
locationItems:any[];
autocomplete:any;
locationService:any;
location = {};//added from example code
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private WeatherProvider:WeatherProvider,
    private Storage:Storage,
    private Events:Events
  ) {
    this.locationService = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      city: ''
    }
  }
GetCityName(){
  if(this.autocomplete.city =='') {
    this.locationItems =[];
    return;
  }
  //self gives us access to the windows object - method is a function inside an object
  let self = this;
  let config = {
    types:['geocode'],
    input: this.autocomplete.city

  }
  this.locationService.getPlacePredictions(config, (predictions,status) => {
    self.locationItems = [];
    predictions.forEach(prediction=> {
     self.locationItems.push(prediction)
    })
    //console.log(predictions);
    //predictions.forEach(prediction => {
      //self.locationItems.push(prediction);
   // });

  })
}
  AddItems(item) {
   this.WeatherProvider.SearchCity(item.structured_formatting.main_text)
   .subscribe(res => {
     if(res.length > 0) {
       this.location = {
         id:res[0].id, 
         icon: `http://openweathermap.org/img/w/${res[0].weather[0].icon}.png`, //changed from weather    
         current: res[0],
         forecast: res[1]
       }
       this.Storage.set(`location ${res[0].id}`, JSON.stringify(this.location));
       this.Events.publish("cityinfo", this.location);//cityinfo is the topic name to listen for the event //publish the location object
       this.navCtrl.setRoot("HomePage",{"weatherInfo": this.location});
     }
   })
  }
}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import  moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('slideRef') slide: Slides;
  
  locationInfo: any;
  cityName: string;
  Slides =[];
  bgImage: string;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
  ) { 
    this.locationInfo = this.navParams.get("weatherInfo");
    if(this.locationInfo) {
     this.bgImage = this.BgImage();
   
    }
  }

  ionViewDidLoad() {
    this.locationInfo = this.navParams.get("weatherInfo");
    if(this.locationInfo){
      this.cityName = this.locationInfo.current.name;
      this.Slides.push(this.locationInfo);
      
    }
  }
GetDay = function(time: number) {
  let day = new Date(time*1000).toISOString();
  let d = new Date(day);
  let weekday =[];
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tues";
  weekday[3] = "Wed";
  weekday[4] = "Thur";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let n = weekday[d.getDay()];
  return n;
}

GetDate = (time: number)=>{
  let day = moment(time*1000).format("MM/DD")
  return day;

}

windDirection = (deg) => {
  if (deg > 11.25 && deg < 33.75){
    return "NNE";
  }else if (deg > 33.75 && deg < 56.25){
    return "ENE";
  }else if (deg > 56.25 && deg < 78.75){
    return "E";
  }else if (deg > 78.75 && deg < 101.25){
    return "ESE";
  }else if (deg > 101.25 && deg < 123.75){
    return "ESE";
  }else if (deg > 123.75 && deg < 146.25){
    return "SE";
  }else if (deg > 146.25 && deg < 168.75){
    return "SSE";
  }else if (deg > 168.75 && deg < 191.25){
    return "S";
  }else if (deg > 191.25 && deg < 213.75){
    return "SSW";
  }else if (deg > 213.75 && deg < 236.25){
    return "SW";
  }else if (deg > 236.25 && deg < 258.75){
    return "WSW";
  }else if (deg > 258.75 && deg < 281.25){
    return "W";
  }else if (deg > 281.25 && deg < 303.75){
    return "WNW";
  }else if (deg > 303.75 && deg < 326.25){
    return "NW";
  }else if (deg > 326.25 && deg < 348.75){
    return "NNW";
  }else{
    return "N"; 
  }

}
BgImage = () => {
  this.locationInfo = this.navParams.get("weatherInfo");
  if(this.locationInfo.current.weather[0].main =="Rain"){
    return './assets/imgs/rain.jpg';
  } else if(this.locationInfo.current.weather[0].main =="Clear"){
    return './assets/imgs/clear.jpg';
  } else if(this.locationInfo.current.weather[0].main =="Clouds"){
    return './assets/imgs/clouds.jpg';
  } else if(this.locationInfo.current.weather[0].main =="Drizzle"){
  return './assets/imgs/drizzle.jpg';
  } else if(this.locationInfo.current.weather[0].main =="Snow"){
  return './assets/imgs/snow.jpg';
  } else if(this.locationInfo.current.weather[0].main =="Thunder"){
  return './assets/imgs/thunder.jpg';
  } else {
  return './assets/imgs/clear.jpg';
}
}
}

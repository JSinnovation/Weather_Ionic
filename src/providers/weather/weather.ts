import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherProvider {
apiKey =`ca14b1faaa4c11f6b8b77d156cd49804`;
//apiKey = 'eff0fa5fc13fcfd8968c5a196079d4a6'; //open weather map api key
//apiKey = 'f0447177624cb30f72f80766ea1ed4b2'
  constructor(
    private http: HttpClient,
    private geolocation: Geolocation
  ) {
    
  }

  async getPosition() {
    return await this.geolocation.getCurrentPosition();

  }

  public currentWeather(lon: number, lat: number): Observable<any> {
  const currentInfo = this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`);
  const forecastInfo = this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`);

  //return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&APPID=ca14b1faaa4c11f6b8b77d156cd49804`);
 
  //const currentInfo = this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${this.apiKey}`);
  //const forecastInfo = this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=imperial&cnt=10&APPID=${this.apiKey}`);

   return Observable.forkJoin([currentInfo, forecastInfo])
      .map(responses => {
        return [].concat(...responses);
      });
 }

  SearchCity(city: string): Observable<any> {
   
    //api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}
    //const currentWeather = this.http.get(`http://api.wunderground.com/api/918254536913fedf/conditions/q/WI/Milwaukee.json}`);
    const currentWeather = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${this.apiKey}`);
    const forecastWeather = this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${this.apiKey}`);
    
    //const forecastWeather = this.http.get(`http://api.wunderground.com/api/918254536913fedf/forecast10day/q/WI/Milwaukee.json}`);
    
    //const forecastWeather = this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=imperial&cnt=10&APPID=${this.apiKey}`);
    return Observable.forkJoin([currentWeather, forecastWeather])
      .map(responses => {
        return [].concat(...responses);
     });
 }

 
}


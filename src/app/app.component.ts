import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherProvider } from './../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, AfterViewInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage"

  pages: any[] = [];
  location = {}; //object saved
  current: any; //changed from weather
  weather: any; //test line
  forecast: any;

  hideDelete = false;
  loc: string;
  weatherUnits = [];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private weatherProvider: WeatherProvider,
    private storage: Storage,
    private events: Events,//type Events,
    private alertCtrl: AlertController
  
  ) {
   this.initializeApp();
  }
  
  ngOnInit() {
    
    
   this.storage.forEach((value, key, index) => {
    
    this.pages.push(JSON.parse(value));
    })
  }
  //}
  //forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): Promise<null> {
  //  return this._dbPromise.then(db => db.iterate(iteratorCallback));
  
 // private newMethod(value: any) {
   // this.pages.push(JSON.parse(value));
  //}

  ngAfterViewInit() {
    this.weatherProvider.getPosition().then(resp => {
      this.weatherProvider.currentWeather(resp.coords.longitude, resp.coords.latitude)
        .subscribe(res => {
          if(res.length > 0){
            this.weather = res[0];//changed from weather
            this.loc = res[0].name

            this.location = {
              id: res[0].id,
              icon: `http://openweathermap.org/img/w/${res[0].weather[0].icon}.png`, //changed from weather                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
              //icon: 'https://icons.wxug.com/i/c/e/${res[0].weather[0].icon}.gif',
              current:  res[0],
              forecast: res[1]
            }
           this.storage.set(`location ${res[0].id}`, JSON.stringify(this.location));

          
           if(this.pages.length <= 0){
            this.events.publish("cityinfo", this.location);//cityinfo is the topic name to listen for the event //publish the location object
          }
          
          this.nav.setRoot("HomePage", {"weatherInfo": this.location});
        }
      });
  });
  //data is the callback - results
  this.events.subscribe("cityinfo", (data) => {
    this.pages.push(data);
  })//this last }) cannot have a semicolon, as breaks code

  this.showUnits();
}

initializeApp() {
  this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
}

openPage(page) {
  this.nav.setRoot("HomePage", {"weatherInfo": page});
}

searchPage() {
  this.nav.push("SearchPage");//push leaves back button on the page
}
//AIzaSyDAP9i7ljWu5jjG3GqSWVvR_BdrArlUuJA
showButton() {
  this.hideDelete = !this.hideDelete;
}

removeCity(item) {
  let index = this.pages.indexOf(item);

  if(index > -1){
    this.pages.splice(index, 1);
    this.storage.remove(`location ${item.id}`).then(res => {
     this.nav.setRoot("HomePage", {"weatherInfo": this.location});
     //this.nav.setRoot(this.nav.getActive().component);
    })
  }
}

showUnits() {
  this.weatherUnits.push( //because it is an array
    {
      title: 'Temperature',
      unit: 'C',
      icon: 'thermometer',
      show: () => {
        let alert = this.alertCtrl.create({
          title: 'Temperature',
          subTitle: `<ion-badge>Unit: Farenheit</ion-badge>`,
          buttons: ['Cancel'],
          cssClass: 'alertCss'
        })
        return alert.present();
      }
    },
    {
      title: 'Pressure',
      unit: 'Hpa',
      icon: 'cloud',
      show: () => {
        let alert = this.alertCtrl.create({
          title: 'Pressure',
          subTitle: `<ion-badge>Unit: HectorPascal</ion-badge>`,
          buttons: ['Cancel'],
          cssClass: 'alertCss'
        })
        return alert.present()
      }
    },
    {
      title: 'Wind',
      unit: 'MPH',
      icon: 'speedometer',
      show: () => {
        let alert = this.alertCtrl.create({
          title: 'Wind',
          subTitle: `<ion-badge>Unit: Miles/Hour</ion-badge>`,
          buttons: ['Cancel'],
          cssClass: 'alertCss'
        })
        return alert.present()
      }
    },
    {
      title: 'Humidity',
      unit: '%',
      icon: 'umbrella',
      show: () => {
        let alert = this.alertCtrl.create({
          title: 'Humidity',
          subTitle: `<ion-badge>Unit: Percentage</ion-badge>`,
          buttons: ['Cancel'],
          cssClass: 'alertCss'
        })
        return alert.present();
      }
    }
  )
}

settingsPage() {
  this.nav.push("SettingsPage", {"currentLocation": this.loc});
}

slidesPage() {
  this.nav.push("MyslidesPage");
}

}

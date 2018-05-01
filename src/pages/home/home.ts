import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    position = {
        lat: 0,
        lon: 0
    };

    constructor(public navCtrl: NavController, public _camera: Camera, private geolocation: Geolocation, public _alertController:AlertController) { }
    
    public geolocalizacion(){
        this.geolocation.getCurrentPosition().then((resp) => {
            this.position.lat = resp.coords.latitude;
            this.position.lon = resp.coords.longitude;
            console.log(this.position);
            return true;
        }).catch((error) => {
             console.log('Error getting location', error);
             return false;
        });
    }

    public tomarFoto(){
        if(this.geolocalizacion){
            const options: CameraOptions = {
                quality: 100,
                destinationType: this._camera.DestinationType.DATA_URL,
                encodingType: this._camera.EncodingType.JPEG,
                mediaType: this._camera.MediaType.PICTURE
            }
            this._camera.getPicture(options).then((imageData) => {
                
            }, (err) => {
                console.log(err);
            });
        } else {
            let confirm = this._alertController.create({
                title: 'Ubicación',
                message: 'No he podido identificar tu ubicación, por favor verifica que esté prendida',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      console.log('Disagree clicked');
                    }
                  }
                ]
                });
            confirm.present();
        }
    }

    public tomarVideo(){
        if(this.geolocalizacion){
            const options: CameraOptions = {
                quality: 100,
                destinationType: this._camera.DestinationType.DATA_URL,
                mediaType: this._camera.MediaType.VIDEO
            }
            this._camera.getPicture(options).then((imageData) => {
            
            }, (err) => {
                console.log(err);
            });
        } else {
            let confirm = this._alertController.create({
                title: 'Ubicación',
                message: 'No he podido identificar tu ubicación, por favor verifica que esté prendida',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      console.log('Disagree clicked');
                    }
                  }
                ]
                });
            confirm.present();
        }
    }

}

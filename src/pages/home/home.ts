import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    position = {
        lat: 0,
        lon: 0
    };

    geo:boolean = false;

    constructor(public navCtrl: NavController, 
                public _camera: Camera, 
                private geolocation: Geolocation, 
                public _alertController:AlertController,
                private screenOrientation: ScreenOrientation,
                private mediaCapture: MediaCapture) { 

        //setTimeout(()=>{ this.geo = true; }, 7000);
        this.orientation();
        this.geolocalizacion();
    }

    public orientation(){
        if(!this.geo){
            let confirm = this._alertController.create({
                title: 'Ubicación',
                message: 'Por favor, prende tu ubicación para poder continuar.',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                        this.geolocalizacion();
                    }
                  }
                ]
                });
            confirm.present();
        }
        this.screenOrientation.lock('portrait-primary');
    }
    
    public geolocalizacion(){
        this.geolocation.getCurrentPosition().then((resp) => {
            this.position.lat = resp.coords.latitude;
            this.position.lon = resp.coords.longitude;
            console.log(this.position);
            this.geo =  true;
        }).catch((error) => {
             console.log('Error getting location', error);
             this.geo = false;
        });
    }

    public tomarFoto(){
        if(this.geo){
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
                        this.geolocalizacion();
                    }
                  }
                ]
                });
            confirm.present();
        }
    }

    public tomarVideo(){
        if(this.geo){
            let options: CaptureImageOptions = {  };
            this.mediaCapture.captureVideo(options).then( (data: MediaFile[]) => { 
                console.log(data);
            },(err: CaptureError) => console.log(err));
        } else {
            let confirm = this._alertController.create({
                title: 'Ubicación',
                message: 'No he podido identificar tu ubicación, por favor verifica que esté prendida',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                        this.geolocalizacion();
                    }
                  }
                ]
                });
            confirm.present();
        }
    }

}

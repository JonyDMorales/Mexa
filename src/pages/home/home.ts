import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public _camera: Camera) { }

    public tomarFoto(){
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
    }

    public tomarVideo(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this._camera.DestinationType.DATA_URL,
            encodingType: this._camera.EncodingType.JPEG,
            mediaType: this._camera.MediaType.VIDEO
        }
        
        this._camera.getPicture(options).then((videoData) => {
            
        }, (err) => {
            console.log(err);
        });
    }

}

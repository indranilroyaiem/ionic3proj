import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController, NavParams,
  ViewController
} from "ionic-angular";
import {JiraProvider} from "../../providers/jira/jira";
@IonicPage()
@Component({
  selector: 'page-file-upload',
  templateUrl: 'file-upload.html',
})
export class FileUploadPage {
  lastImage: string = null;
  loading: Loading;
  uploadingSpinner = this.loadingCtrl.create({ content: 'Uploading images...' });

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private viewCtrl:ViewController,
              public jira:JiraProvider,
              public params:NavParams,
              public loadingCtrl: LoadingController) {
  }
 // public upload(){
 //    console.log('Key Recieved: ',this.params.get('Key'));
 //    let key=this.params.get('Key');
 //    let command="curl -u Driviz:driviz123 -X POST -H \"X-Atlassian-Token: nocheck\" -F \"file=@/home/ec2-user/apple-touch-icon-144x144-precomposed.png\" http://cc633ca7.ngrok.io/rest/api/latest/issue/"+key+"/attachments";
 //    let formData = new FormData();
 //    formData.append('command',command);
 //    this.jira.test(formData);
 //    let alert = this.alertCtrl.create({
 //      title: "Success!!!",
 //      subTitle: "JIRA issue "+key+" Created",
 //      buttons: ['OK']
 //    });
 //    alert.present();
 //    this.closeModal();
 //  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  async uploadWebFile(event) {
    const formData = new FormData();
    Array.from(event.target.files).forEach((file: File) => formData.append('file', file, file.name));
    this.uploadingSpinner.present();
    await this.jira.uploadImages(formData,this.params.get('Key'));
    this.uploadingSpinner.dismiss();
    let alert = this.alertCtrl.create({
      title: "Success!!!",
      subTitle: "JIRA issue "+this.params.get('Key')+" Created",
      buttons: ['OK']
    });
    alert.present();
    this.closeModal();
  }
}


import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {JiraProvider} from "../../providers/jira/jira";
import {FileUploadPage} from "../file-upload/file-upload";

/**
 * Generated class for the AddModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-modal',
  templateUrl: 'add-modal.html',
})
export class AddModalPage {
  issue={
    "fields":{
      "project":{
        "key":"AF"
      },
      "summary":"",
      "issuetype":{
        "name":"Task"
      }
    }
  };
  key:string;
  constructor(private modalCtrl: ModalController,private alertCtrl: AlertController,public jira:JiraProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddModalPage');
  }

  postIssue() {
    this.jira.postIssue(this.issue).subscribe((result) => {
      this.key=result.key;
      // let alert = this.alertCtrl.create({
      //   title: "Success!!!",
      //   subTitle: "JIRA issue "+this.key+" Created",
      //   buttons: ['OK']
      // });
      // alert.present();
      this.closeModal();
      console.log("Key Sent="+this.key);
      this.openModal(this.key);
    }, (err) => {
      console.log("Error",JSON.stringify(err));

    });

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  public openModal(key){
    let myModal=this.modalCtrl.create(FileUploadPage,{Key: key});
    myModal.present();
  }
}

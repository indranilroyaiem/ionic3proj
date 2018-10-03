import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import {IonicPage, Platform, NavController, AlertController, ModalController} from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Dialogs } from '@ionic-native/dialogs';

import { AuthProvider } from '../../providers/auth/auth';
import { JiraProvider } from '../../providers/jira/jira';

import { AssetPage } from '../asset/asset';
import { User } from '../../models/user';
import {AddModalPage} from "../add-modal/add-modal";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private form : FormGroup;
  data: any;
  user: User;
  private issues:Array<any>;


  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    private auth: AuthProvider,
    private jira: JiraProvider,
    private barcodeScanner: BarcodeScanner,
    private dialogs: Dialogs,
    private modalCtrl: ModalController
  ) {
    this.form = this.formBuilder.group({
      assetNum: ['AF-', Validators.required]
    });
    this.user = this.auth.getUser();
  }

  ionViewDidLoad() {
    this.jira.getAllIssue().subscribe(issues => {
      this.issues = issues.issues;
      console.log(this.issues);
    })
  }

  public changepage(key){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.jira.getIssue(key).subscribe(
      (issue) => {
        let issueDetails = issue;
        loading.dismiss();
        this.navCtrl.push(AssetPage, {
          issueDetails: issueDetails
        });
      }, (err) => {
        this.data = err.status;
        loading.dismiss();
      });
  }

  public openModal(){
    let myModal=this.modalCtrl.create(AddModalPage);
    myModal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
    myModal.present();
  }

  doRefresh(refresher){
    console.log("Begin async operation",refresher);
    this.ionViewDidLoad();
    refresher.complete();
  }

  // Activate the scanner to scan the asset tag.
  public activateScanner(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      let scan = this.parseUrl(barcodeData.text);
      if (scan != 'NA') {
        this.form.patchValue({'assetNum': scan});
        this.submitSearch();
      } else {
        // Show a native dialog
        this.dialogs.alert('You scanned an invalid Jira QR Code', 'Error');
      }
    }, (err) => {
         this.data = err;
    });
  }

  // Parse the asset number from the URL of a Jira URL
  // Format is https://support.mvnu.edu/browse/AF-374
  public parseUrl(url: string): string {
    let urlArray = url.split('/');
    let prefix = urlArray[urlArray.length -1].substring(0, 4);
    if (prefix != 'AF' || prefix == null) {
      return 'NA';
    } else {
      return urlArray[urlArray.length -1];
    }
  }

  // Verify using regex if the tag is valid.
  public verifyTag(tag: string): boolean {
    let tagSplit = tag.split('-');
    let reg = new RegExp('^[1-9][0-9]*'); // Make sure the asset number is a number starting with 1.
    if (tagSplit[0] == 'AF' && reg.test(tagSplit[1]) ) {
      return true;
    } else {
      return false;
    }
  }

  // Call Jira's API to get the asset information and load the asset view page.
  public submitSearch(): void {
    this.data = '';
    let loading = this.loadingCtrl.create();
    loading.present();
    let assetNumber = this.form.get('assetNum').value;
    if (this.verifyTag(assetNumber)) {
      this.jira.getIssue(assetNumber).subscribe(
        (issue) => {
          let issueDetails = issue;
          loading.dismiss();
          this.navCtrl.push(AssetPage, {
            issueDetails: issueDetails
          });
      }, (err) => {
        this.data = err.status;
        loading.dismiss();
      });
    } else {
      loading.dismiss();
      loading.onDidDismiss(() => {
        if (this.platform.is('cordova')) {
          this.dialogs.alert('You entered an invalid asset number', 'Error');
        } else {
          this.alertCtrl.create({title: 'Error', subTitle: 'You entered an invalid asset number', buttons: ['OK']}).present();
        }
      });
    }
  };
}

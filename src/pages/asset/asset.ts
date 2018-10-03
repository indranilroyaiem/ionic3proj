import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Issue } from '../../models/issue';

@IonicPage()
@Component({
  selector: 'page-asset',
  templateUrl: 'asset.html',
})
export class AssetPage {

  issue: Issue;
  issueType: string;
  issueDetails: string;
  lozengeColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.issue = navParams.get('issueDetails');
    this.issueType = this.issue.fields.issuetype.name;
    this.issueDetails = 'basics';
    this.lozengeColor = this.getLozengeColor(this.issue.fields.status.name.toLowerCase())
  }

  ionViewDidLoad() {}

  // This retrieves the color of the status lozenge (the little pill)
  public getLozengeColor(status: string): string {
    if (status == 'deployed') {
      return 'jira-green'
    } else {
      return 'jira-yellow'
    }
  }

  // Parse Jira's date string to something more readable
  public parseDate(dateString: string): string {
    return new Date(dateString).toDateString();
  }
}

# Jira Asset Companion
JAC is a hybrid app aimed at helping members of MVNU's IT department discover details about assets they've deployed out into the field. Each asset tag has a QR code on it, which the app will be able to scan and pull details from to identify the asset. It utilizes Jira's REST API to retrieve details about the asset.

## Technologies used
* Ionic 3
* Angular
* Jira REST API

## How to setup
1. Make sure Ionic and Cordova are installed with `npm install -g ionic cordova`

2. Run `npm install` to update node dependencies for the project

3. Run `ionic build` to build the web assets

4. Run `ionic serve` to start the test server to see the app run in the browser.

You can also test the app with [Ionic DevApp](https://ionicframework.com/docs/pro/devapp/), or natively on a device with Cordova. Refer to the [Ionic 3 Documentation](https://ionicframework.com/docs/intro/deploying/) for more info on Cordova deployments.
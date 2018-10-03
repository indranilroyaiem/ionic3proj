import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HeaderColor } from '@ionic-native/header-color';
import { Dialogs } from '@ionic-native/dialogs'
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { App } from './app.component';

// Pages and their modules
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { SearchPageModule } from '../pages/search/search.module';
import { AssetPage } from '../pages/asset/asset';
import { AssetPageModule } from '../pages/asset/asset.module';

// Providers
import { JiraProvider } from '../providers/jira/jira';
import { AuthProvider } from '../providers/auth/auth';
import {AddModalPageModule} from "../pages/add-modal/add-modal.module";
import {AddModalPage} from "../pages/add-modal/add-modal";
import {FileUploadPage} from "../pages/file-upload/file-upload";
import {FileUploadPageModule} from "../pages/file-upload/file-upload.module";
import {ImagePicker} from "@ionic-native/image-picker";
import {Base64} from "@ionic-native/base64";
import {FTP} from "@ionic-native/ftp";
import { FileLoaderProvider } from '../providers/file-loader/file-loader';

@NgModule({
  declarations: [
    App,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SearchPageModule,
    AssetPageModule,
    AddModalPageModule,
    FileUploadPageModule,
    IonicModule.forRoot(App),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    SearchPage,
    AssetPage,
    AddModalPage,
    FileUploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HeaderColor,
    File,
    Transfer,
    XMLHttpRequestUpload,
    Camera,
    FilePath,
    ImagePicker,
    Base64,
    Dialogs,
    FTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JiraProvider,
    AuthProvider,
    FileLoaderProvider,
  ]
})
export class AppModule {}

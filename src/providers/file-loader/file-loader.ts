import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File as IonicFileService, FileEntry, IFile } from '@ionic-native/file';

@Injectable()
export class FileLoaderProvider {

  constructor(public http: HttpClient,private ionicFileService: IonicFileService) {
    console.log('Hello FileLoaderProvider Provider');
  }

  async getSingleFile(filePath: string): Promise<File> {
    // Get FileEntry from image path
    const fileEntry: FileEntry = await this.ionicFileService.resolveLocalFilesystemUrl(filePath) as FileEntry;

    // Get File from FileEntry. Again note that this file does not contain the actual file data yet.
    const cordovaFile: IFile = await this.convertFileEntryToCordovaFile(fileEntry);

    // Use FileReader on each object to populate it with the true file contents.
    return this.convertCordovaFileToJavascriptFile(cordovaFile);
  }

  private convertFileEntryToCordovaFile(fileEntry: FileEntry): Promise<IFile> {
    return new Promise<IFile>((resolve, reject) => {
      fileEntry.file(resolve, reject);
    })
  }

  private convertCordovaFileToJavascriptFile(cordovaFile: IFile): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.error) {
          reject(reader.error);
        } else {
          const blob: any = new Blob([reader.result], { type: cordovaFile.type });
          blob.lastModifiedDate = new Date();
          blob.name = cordovaFile.name;
          resolve(blob as File);
        }
      };
      reader.readAsArrayBuffer(cordovaFile);
    });
  }
}

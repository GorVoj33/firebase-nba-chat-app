import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/classes/user.interface.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit,OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  private subsubscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  downloadUrl: string | null = null;

  constructor(
    private auth: AuthService,
    //private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore
   // private alertService: AlertService
  ) {
   // this.loadingService.isLoading.next(true);
   }

  ngOnInit() {
    this.subsubscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
       // this.loadingService.isLoading.next(false);
      })
    );

    this.subsubscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }
  // const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
  // const imageSrc = await fileData.ref.getDownloadURL()
  public uploadFile(event) {
    // const 
    // var storageRef = firebase.storage().ref();
    // const filePath = `${file.name}_${this.currentUser.id}.jpg`;
    // var imgRef = storageRef.child(filePath);
    

    var file = event.target.files[0];
    var storageRef = firebase.storage().ref();
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
    
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      // switch (error.code) {
      //   case 'storage/unauthorized':
      //     // User doesn't have permission to access the object
      //     break;
    
      //   case 'storage/canceled':
      //     // User canceled the upload
      //     break;
    
      //   ...
    
      //   case 'storage/unknown':
      //     // Unknown error occurred, inspect error.serverResponse
      //     break;
      // }
      console.log('error --- Upload image ---')
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        this.downloadUrl = downloadURL;
        this.currentUser.photoUrl=downloadURL;
        //this.downloadUrl = downloadURL;
      });
    });
  }

  public save(): void {
    // let photo;
    // console.log('ovo je url slike koje je uploadovana : ', this.downloadUrl)
    // if (this.downloadUrl) {
    //   photo = this.downloadUrl;
    // } else {
    //   photo = this.currentUser.photoUrl;
    // }
    //console.log('Ovo je url slike: ',photo)
    //const user = Object.assign({}, this.currentUser, {photoUrl: photo});
    //this.currentUser.photoUrl = photo;
    const user = Object.assign({}, this.currentUser);
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user)
      .then(() => {
        console.log('uspesan upload')
       // this.alertService.alerts.next(new Alert('Your profile was successfully updated!', AlertType.Success));
      })
      .catch(error => {
        console.log('neuspesan upload')
        //this.alertService.alerts.next(new Alert(error.message, AlertType.Danger));
      });
    //this.location.back();
  }

  ngOnDestroy() {
    this.subsubscriptions.forEach(sub => sub.unsubscribe());
  }

}

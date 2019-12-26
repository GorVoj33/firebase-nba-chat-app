import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
import { User } from '../classes/user.interface.model';
import { from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UserClass } from '../classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  
  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;
  
  constructor(private router: Router,
    //private auth: AngularFirestore,
    //private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private http:HttpClient) {
      this.loadLoggedUser();
     }
  ngOnInit(): void {
    console.log('auth service initialization . . . ')
      
  }   
  loadLoggedUser(){
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));

    this.setCurrentUserSnapshot();
    
  }
  loginRegular(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
      user => {
        // this.currentUserSnapshot.email = user.user.email;
        // this.currentUserSnapshot.photoUrl = user.user.photoURL;
        //this.currentUserSnapshot=user.user;
        this.loadLoggedUser();
      }
    );
  }
  
  loginGoogle(){
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const credential = await this.afAuth.auth.signInWithPopup(provider);
    // console.log('Logged by google: ', credential)
    // return this.updateUserData(credential.user);
    // return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then (user => {
    //   console.log('Logged by google ', user.user.email, ' img:',user.user.photoURL, ' ime: ')
    //   this.loadLoggedUser();
    // });

    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential;
      console.log('Token FB: '+token)
      // The signed-in user info.
      var user = result.user;
      console.log('User FB: '+user)
  // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    
    
  }

  async loginFacebook(){
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log('Logged by google: ', credential)
    return this.updateUserData(credential.user);
    // return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then (user => {
    //   console.log('Logged by google ', user.user.email, ' img:',user.user.photoURL, ' ime: ')
    //   this.loadLoggedUser();
    // });
    
  }

  async logout(){
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }
  updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    var first_name = user.displayName.split(' ')[0];
    var last_name = user.displayName.split(' ')[1];
    const data = {
      id: user.uid,
      firstName: first_name,
      lastName: last_name,
      photoUrl: user.photoURL,
      email: user.email,
      quote: 'NBA lover',
      bio: 'Bio is under construction',
      isAdmin:false
    };
    return userRef.set(data, {merge:true});
  }
  // getContent(){
  //   return this.http.get(this.URL);
  // }
  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'gs://nba-app-5b3c8.appspot.com/output.png?alt=media&token=3b1f2bc3-fb13-494f-82b2-d36a8c6c1c8c',
            quote: 'NBA lover!',
            bio: 'Bio is under construction...',
            isAdmin: false
          }

          userRef.set(updatedUser);
          return true;
        })
        .catch((err) => false)
    );
  }
  // this.currentUser.subscribe(user => {
  //   if(user===null) {
  //     this.currentUserSnapshot = null;
  //   }
  //   else {
  //     this.currentUserSnapshot = user;
  //     //console.log('ulogovani setovan: ',this.currentUserSnapshot);
  //   }
  // }
  setCurrentUserSnapshot(){
    this.currentUser.subscribe(
      user => {
        if(user){
        this.currentUserSnapshot = user;
        console.log('ulogovani setovan: ',this.currentUserSnapshot);
        }
      }
    )
  }
}  
  


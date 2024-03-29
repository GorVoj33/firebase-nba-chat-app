import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/classes/user.interface.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy {

  public currentUser: any = null;
  public user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    //private loadingService: LoadingService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {
    //this.loadingService.isLoading.next(true);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user;
        //this.loadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe( params => {
        const userId = params.get('userId');
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${userId}`);
        userRef.valueChanges().subscribe(user => this.user = user);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment';

@Injectable()
export class MainAngularFirestore extends AngularFirestore { }

@Injectable()
export class LoggingAngularFirestore extends AngularFirestore { }

export function MainAngularFirestoreFactory(platformId: Object, zone: NgZone): MainAngularFirestore {
  return new MainAngularFirestore(environment.firebase, 'main', true, {}, platformId, zone, {})
}
export function LoggingAngularFirestoreFactory(platformId: Object, zone: NgZone): LoggingAngularFirestore {
  return new LoggingAngularFirestore(environment.firebaseLogs, 'logging', true, {}, platformId, zone, {})
}
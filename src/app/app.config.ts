import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-a5a62',
        appId: '1:406569020696:web:27ef1c6db6efe235c9026d',
        storageBucket: 'simple-crm-a5a62.firebasestorage.app',
        apiKey: 'AIzaSyBD6mGUeZtrrRFPvjdfomxoGGaluGg4-zc',
        authDomain: 'simple-crm-a5a62.firebaseapp.com',
        messagingSenderId: '406569020696',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};

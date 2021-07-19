import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'transaction',
        loadChildren: () => import( './features/transaction/transaction.module' ).then( module => module.TransactionModule )
    },
    {
        path: '',
        redirectTo: 'transaction',
        pathMatch: 'full'
    },
    {
        path: '*',
        redirectTo: 'transaction'
    }
];

@NgModule( {
  imports: [
      RouterModule.forRoot( routes )
    ],
  exports: [
      RouterModule
    ]
} )
export class AppRoutingModule { }

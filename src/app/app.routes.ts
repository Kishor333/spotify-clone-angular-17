import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from 'express';
import { authorizeGuardGuard } from '../../libraries/auth/src/lib/guard/authorize-guard.guard';

export const appRoutes: Route[] = [
    {path:'',
     loadComponent: () => import('../../libraries/auth/src/lib/auth/auth.component').then(component => component.AuthComponent),
    //  canActivate: [() => inject(CheckAuthorizeGuardGuard).canActivate()]
    canActivate: [authorizeGuardGuard]
    },
    { path:'login',
     loadComponent: () => import('../../libraries/auth/src/lib/login/login.component').then(component => component.LoginComponent)
     
    },
    { path:'album',
     loadComponent: () => import('../../libraries/album/src/lib/album/album.component').then(component => component.AlbumComponent)
    },
  { path:'album/:id',
    loadComponent: () => import('../../libraries/album/src/lib/album/album.component').then(component => component.AlbumComponent)
  },
    // {
    //     path: 'quotes',
    //     children: [{
    //         path: '123',
    //         loadComponent: () => import('../../libraries/quotes/src/lib/quotes/quotes.component').then(component => component.QuotesComponent)
    //     }]
    // }
];

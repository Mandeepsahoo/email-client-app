import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PlaceholderComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}

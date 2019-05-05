import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatroomPage } from './chatroom';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ChatroomPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ChatroomPage),
  ],
})
export class ChatroomPageModule {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'chat',
    styleUrls: ['./app/components/chat/chat.component.css'],
    templateUrl: './app/components/chat/chat.component.html',
    providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy {
    messages = [];
    connection;
    message = '';

    constructor(private chatService: ChatService) { }

    sendMessage(messageInput) {
        if (this.message != '') {
            this.chatService.sendMessage(this.message);
            this.message = ''; 
        }
        messageInput.focus();
    }

    ngOnInit() {
        this.connection = this.chatService.getMessages().subscribe(message => {
            this.messages.push(message);
        })
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}

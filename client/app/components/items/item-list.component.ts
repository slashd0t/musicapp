import {Component} from '@angular/core';

@Component({
    selector: 'item-list',
    styleUrls: ['./app/components/items/item-list.component.css'],
    templateUrl: './app/components/items/item-list.component.html',
    inputs: ["items"]
})
export class ListItemComponent {
    public items;


}

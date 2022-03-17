import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
// to make it to listen from parent component
    @Output() featureSelected = new EventEmitter<string>();

    onSelect( feature: string ) {
        // when we click the button after that it will emit and we will receive the strings - recipe or shopping-list
        this.featureSelected.emit( feature );
    }
}

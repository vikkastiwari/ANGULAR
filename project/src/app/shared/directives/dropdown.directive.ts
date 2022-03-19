import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

    // when it is true it will be attached and when it is false it is removed
    @HostBinding('class.open') isOpen = false;

    constructor () { }
    
    @HostListener( 'click' ) toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}

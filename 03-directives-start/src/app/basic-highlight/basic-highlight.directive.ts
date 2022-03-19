import { Directive, ElementRef } from '@angular/core';

@Directive({
    // we added square braces as when we initialize it, it directly gets recognized without square braces to an element.
    selector:'[appBasicHighlight]'
})
export class BasicHighlightDirective {
    constructor ( private elementRef: ElementRef ) { }
    
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    private firstObsSubscription!: Subscription;

  constructor() { }

  ngOnInit(){
    //   creating observable using utility function
    //   this.firstObsSubscription = interval( 1000 ).subscribe( count => {
    //     console.log(count);
    //   });
      
    // creating custom observable
    const customIntervalObservable = new Observable(observer=>{
        let count = 0;
        setInterval( () => {
            observer.next( count );
            count++;
        },1000);
    } );
    
    this.firstObsSubscription = customIntervalObservable.pipe( map((data)=>{return 'Round:' + (data);}) ).subscribe( data => {
        console.log(data);
    })
      
      
    // this.firstObsSubscription = customIntervalObservable.subscribe( data => {
    //     console.log(data);
    // })
  }
    
  ngOnDestroy(){
      this.firstObsSubscription.unsubscribe();
  }  
}

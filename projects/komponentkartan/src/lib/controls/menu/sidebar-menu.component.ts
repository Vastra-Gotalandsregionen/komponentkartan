import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements AfterViewInit{
    // @Input() height = '1045px';

    @HostListener('window:resize', ['$event'])
      onResize() {
        console.log('resize: ', this.elementRef.nativeElement.clientHeight)
      }
// isVerticallyScrollable = this.viewport!.scrollHeight > this.viewport!.clientHeight;

      //   ngOnInit() {
    //     this.onLoad();
    //   }

    resizeObservable$: Observable<Event>
    resizeSubscription$: Subscription
    constructor(private ref: ChangeDetectorRef, private elementRef: ElementRef) {

    }
    ngAfterViewInit() {
        console.log('ngAfterViewInit: ', this.elementRef.nativeElement.clientHeight)

//     this.resizeObservable$ = fromEvent(window, 'load')
// this.height = '1046px';
//     this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
//       console.log('event: ', evt)
//       this.height = '1046px';
//     })

    this.ref.detectChanges()
}

      ngOnDestroy() {
        this.resizeSubscription$.unsubscribe()
    }

    // height = '100px';

    // ngOnInit() {
    //   this.height = this.getHeight();
    // }

    // ngAfterViewInit() {
    //     this.height = this.getHeight();
    // }

    // ngOnChanges() {
    //     this.height = this.getHeight();
    //     console.log('onchange')
    // }

    // getHeight() {

    //     // 264px Is the size of the viewport that's available.
    //     let _1vh = Math.round(window.innerHeight / 100);
    //     console.log((_1vh*100) + 80 + 'px');
    //     // return (Math.round(window.innerHeight) + 80 + 'px');
    //     return '1048px';
    //   }
}

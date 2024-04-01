import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;
    is_loading = true;

    constructor(private router: Router) {
        // clear on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear spinner
                    this.clear();
                }
            }
        });
    }

    getSpinner(): Observable<any> {
        return this.subject.asObservable();
    }

    view(keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.is_loading = false
        this.subject.next({ boolean: true });
    }

    clear() {
        this.is_loading = true
        this.subject.next(false);
    }

    getLoading(){
        return this.is_loading
    }

}
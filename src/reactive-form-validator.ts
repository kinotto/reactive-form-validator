import {Observable} from 'rxjs';
import {Observer} from 'rxjs/Observer';

/**
 * utility to handle form input validation with a reactive approach (rxjs)
 */
export default class ReactiveFormValidator {
  config: any;

  constructor(config: any) {
    let defaultConfig = {
      'debounce': 300
    };
    this.config = (<any>Object).assign({}, defaultConfig, config);
  }

/**
 * validate a dom element 
 * @param domEl 
 * @param errorClasses 
 * @param observer 
 * @param isValid 
 */
  validateElement(domEl: any, errorClasses: string[], observer: Observer<any>, isValid: boolean){
    domEl.isValid = isValid;
    observer.next(domEl);
    if(!isValid){
      domEl.classList.add(...errorClasses);
    } else {
      domEl.classList.remove(...errorClasses);
    }
  }

   /**
   * 
   * @param domEl 
   * @param validator 
   * @param params
   * @returns a validator stream that resolve each time an event of the type specified is triggered 
   */
  createEmitter(domEl: HTMLElement, validator: any, ...params: any[]) :any {
    let evtType = params[0] || 'blur';
    let errorClasses = params[1] || [];
    let debounce = params[2];

   return new Observable((observer: any) => {
     
      // register a dom event
      let event$ = Observable.fromEvent(domEl, evtType)
        .debounceTime(debounce || this.config.debounce || 0)
        .subscribe((evt: any) => {
          let response = validator.fn(evt);

          //if validator is a plain function callback
          if(!response.then && !(response.constructor.name === 'Observable')){
            if (response) {
              this.validateElement(domEl, errorClasses, observer, true);
            } else {
              this.validateElement(domEl, errorClasses, observer, false);
            }
          }
          
          //if validator is a promise or an observable
          else if(response.then || response.constructor.name === 'Observable'){
              let observable = response.then ? Observable.fromPromise(response) : response;
              observable.subscribe(
                (data: any) => {
                  this.validateElement(domEl, errorClasses, observer, true);
                },
                (err: any) => {
                  this.validateElement(domEl, errorClasses, observer, false);
                },
                (complete: any) => {
                  this.validateElement(domEl, errorClasses, observer, true);
                },
              );

          }
          else {
            throw new Error('invalid validator');
          }

        },
        error => {
          this.validateElement(domEl, errorClasses, observer, false);
        });

      return event$.unsubscribe;      

    });
  }


  registerValidator(domEl: HTMLElement, validator: any, ...params: any[]) :any {
    return this.createEmitter(domEl, validator, ...params);
  }
}

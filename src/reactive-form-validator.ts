import {Observable} from 'rxjs';

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
      let event$ =Observable.fromEvent(domEl, evtType)
        .debounceTime(debounce || this.config.debounce || 0)
        .subscribe((evt: any) => {
          if (validator.fn(evt)) {
            observer.next({'isValid': true, 'domEl': domEl});
            domEl.classList.remove(...errorClasses);
          } else {
            observer.next({'isValid': false, 'domEl': domEl});
            domEl.classList.add(...errorClasses);
          }
        });
      
      // return original unsubscription fn
      return event$.unsubscribe;
    });
  }


  registerValidator(domEl: HTMLElement, validator: any, ...params: any[]) :any {
    return this.createEmitter(domEl, validator, ...params);
  }
}

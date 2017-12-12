# Reactive form validator

Simple library to handle form input validation following a reactive approach (rxjs 5), built with typescript can be used with any client side framework like react or angular

The idea behind the library is to have an Observable validator coupled with a specific dom element and to subscribe to this observable to check if the element is is valid and modify the dom accordingly (eg. add some error classes etc.)

# Install with npm or yarn

- `npm install --save reactive-form-validator`
- `yarn add --save reactive-form-validator`


# API
 there are two api , one to instantiate the library and one to register a validator for a specific dom element
 
```javascript
let config = {
  'debounce': 300, //default debounce
  'evtType': 'blur' //default event handled
}
this.validator = new ReactiveFormValidator(config);
```
```javascript

//returns an Observable
let validator$ = this.validator.registerValidator(
  'domEl', //dom element
  'validator': {
    'fn': evt => evt.target.value, //validator check if field is empty
    'msg': 'name cannot be empty'
  }, 
  'blur', // specific event handled for this element
  ['input_err'], //classes to be added in case of error
  100 //specific debounce time (override the default one)
);
```

# React simple form example (client side validation)

  ```javascript
import ReactiveFormValidator from 'reactive-form-validator';

class MyForm extends Component {
  constructor() {
    super();
    this.inputs = []; // collection of inputs / validators
    this.validator = new ReactiveFormValidator({
      'debounce': 300,
      'evtType': 'blur'
     });
  }
  componentDidMount() {
    this.inputs.forEach(input => {
      let validator$ = this.validator.registerValidator(
        input.dom,
        input.validator,
        'blur', 
        ['input_err'],
        100
      );

      validator$
        .subscribe(el => {
          if (el.isValid) {
            //dom element is valid
          } else {
            //dom element is not valid, change dom accordingly
            //here you can access the input.validator.msg that you previously passed to the validator
          }
        });
    });
  }
  
  render() {
    return (
      <div>
        <form>
          Name <input 
                type="text" 
                ref={el => (this.inputs.push({
                  'dom': el, 
                  'validator': {
                    'fn': evt => evt.target.value, 
                    'msg': 'surname cannot be empty'
                  }
                  }))}
                /><br/>
                
          Surname <input 
                    type="text"
                    ref={el => (this.inputs.push({
                      'dom': el, 
                       'validator': {
                          'fn': evt => evt.target.value, 
                          'msg': 'name cannot be empty'
                        }
                       }))}
                  /><br/>
        </form>
     </div>  
   ```

# Advanced usage with server side validation
the validator function can return either a primitive value or a Promise/Observable, in this case it is possible
to perform a server side validation, if for example the input is not valid then you should reject the promise or throw an error if you're using an Observable.

  ```javascript
//Promise
<input
  type="text"
  ref={el => this.inputs.push({
    'dom': el,
    'validator': {
      'fn': evt => new Promise((resolve, reject) => evt.target.value ? resolve() : reject()),
      'msg': 'field cannot be empty'
    }
  })}
/>

//Observable
<input
  type="text"
  ref={el => this.inputs.push({
    'dom': el,
    'validator': {
      'fn': evt => new Observable(observer => evt.target.value ? observer.complete() : observer.error()),
      'msg': 'field cannot be empty'
    }
  })}
/>
 ```

# Working Examples (with function, Promise and Observable)
- <a href="https://kinotto.github.io/reactive-form-validator/examples/react/">React example</a>
# Reactive form validator

Based on rxjs following a reactive approach

this simple library help to handle form input (client side) validation, built with typescript can be used with any client side framework like react or angular

the compiled file is just 48kb and has no dependency a part from rxjs 5

The idea behind the library is to have an Observable validator coupled with a specific dom element and to subscribe to this observable to check its validity and modify the dom accordingly (eg. add some error classes etc.)

# Install

- npm install --save reactive-form-validator
or
- yarn add --save reactive-form-validator


# React simple form example

  ```javascript
import ReactiveFormValidator from 'reactive-form-validator';

class MyForm extends Component {
  constructor() {
    super();
    this.inputs = []; // collection of inputs / validators
    this.validator = new ReactiveFormValidator({
      'debounce': 300, //default debounce
      'evtType': 'blur' //default event handled
     });
  }
  componentDidMount() {
    this.inputs.forEach(input => {
      let validator$ = this.validator.registerValidator(
        input.dom, //dom el
        input.validator, //validator
        'blur', // specific event handled
        ['input_err'], //classes to be added in case of error
        100 //specific debounce time (override the default one)
      );

      validator$
        .subscribe((el) => {
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
                    'fn': (evt) => evt.target.value, 
                    'msg': 'surname cannot be empty'
                  }
                  }))}
                /><br/>
                
          Surname <input 
                    type="text"
                    ref={el => (this.inputs.push({
                      'dom': el, 
                       'validator': {
                          'fn': (evt) => evt.target.value, 
                          'msg': 'name cannot be empty'
                        }
                       }))}
                  /><br/>
        </form>
     </div>  
   ```

# Working Examples
- <a href="https://kinotto.github.io/reactive-form-validator/examples/react/">React example</a>
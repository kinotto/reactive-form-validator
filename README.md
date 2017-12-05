# Reactive form validator

based on rxjs following a reactive approach

this simple library help to handle form input (client side) validation, built with typescript can be used with any client side framework like react or angular

the compiled file is just 48kb and has no dependency a part from rxjs 5

# API
```javascript
    //create instance with default config
    this.validator = new ReactiveFormValidator({
      'debounce': 300, //default debounce
      'evtType': 'blur' //default event handled
     });
     //register a validator

     let validator$ = this.validator.registerValidator(
        input.dom, //dom el
        'validator': {
            'fn': (evt) => evt.target.value, //validate if element is not empty
            'msg': 'surname cannot be empty'
        },
        'blur', // specific event handled
        ['input_err'], //classes to be added in case of error
        100 //specific debounce time (override the default one)
      );

```


# Example

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
        100 //specific debounce time
      );

      validator$
        .subscribe((el) => {
          if (el.isValid) {
            //dom element is valid
          } else {
            //dom element is not valid, change dom accordingly
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

import React, {Component} from 'react';
import ReactiveFormValidator from 'reactive-form-validator';

export default class ReactiveForm extends Component {
  constructor() {
    super();
    this.inputs = [];
    // new instance of validator
    this.validator = new ReactiveFormValidator({
      'debounce': 300,
      'evtType': 'blur'
    });
  }

  componentDidMount() {
    this.inputs.forEach(input => {
      let validator$ = this.validator.registerValidator(
        input.dom, // dom element
        input.validator, // validation
        'blur',
        [], // error classes
        100 // new debounce
      );

      validator$
        .subscribe(el => {
          if (el.isValid) {
            console.log('is valid');
          } else {
            console.log('is NOT valid');
          }
        });
    });
  }
  render() {
    return (
      <div>
        <h2>example form react + reactive form validation</h2>
        <form action="">
            Name
          <input
            type="text"
            ref={el => this.inputs.push({
              'dom': el,
              'validator': {
                'fn': evt => evt.target.value,
                'msg': 'name cannot be empty'
              }
            })}
          /><br/>
            Surname
          <input
            type="text"
            ref={el => this.inputs.push({
              'dom': el,
              'validator': {
                'fn': evt => evt.target.value,
                'msg': 'surname cannot be empty'
              }
            })}
          />
          <br/>
        </form>
      </div>
    );
  }
}

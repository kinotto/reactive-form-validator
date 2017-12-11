import React, {Component} from 'react';
import ReactiveFormValidator from 'reactive-form-validator';
import $ from 'jquery';

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
        ['input_err'], // error classes
        100 // new debounce
      );

      let error = $(`
        <div class="input_err_text">
          ${input.validator.msg}
        </div>`);

      validator$
        .subscribe(el => {
          if (el.isValid) {
            console.log('is valid');
            error.remove();
          } else {
            console.log('is NOT valid, change dom accordingly');
            $(input.dom).parent().append(error);
          }
        });
    });
  }
  render() {
    return (
      <div>
        <h2>example form react + reactive form validation</h2>
        <form action="">
          <div className="input_cont">
            <input
              type="text"
              ref={el => this.inputs.push({
                'dom': el,
                'validator': {
                  'fn': evt => evt.target.value,
                  'msg': 'name cannot be empty'
                }
              })}
              placeholder="Name"
            />
          </div>

          <div className="input_cont">
            <input
              type="text"
              placeholder="Surname"
              ref={el => this.inputs.push({
                'dom': el,
                'validator': {
                  'fn': evt => evt.target.value,
                  'msg': 'surname cannot be empty'
                }
              })}
            />
          </div>
        </form>
      </div>
    );
  }
}

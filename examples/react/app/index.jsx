import React from 'react';
import ReactDOM from 'react-dom';
import '../style/main.scss';
const ReactiveFormValidator = require('reactive-form-validator');

const getForm = () => {
  return (
    <div>
      <h2>example form react + reactive form validation</h2>
      <form action="">
            Name<input type="text" /><br/>
            Surname <input type="text" /><br/>
      </form>
    </div>
  );
};
ReactDOM.render(
  getForm()
  , document.querySelector('.output'));

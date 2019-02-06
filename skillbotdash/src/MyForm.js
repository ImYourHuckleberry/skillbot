import React from "react";
import { Field, FieldArray, reduxForm } from 'redux-form'

const makePost = values => {
console.log(values)
console.log(JSON.stringify(values))
  fetch("/notes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values
    })
  }).then((res) => {
    console.log("this is res", res)
  }).catch((err) => {
    console.log(err)
  });
};


// const MyForm = ({ handleSubmit }) => (
//   <form onSubmit={handleSubmit}>
//     <Field name="name" component="input" placeholder="Name" />
//     <Field name="email" component="input" placeholder="Email" />
//     <Field name="engagements" component="input" placeholder="Engagements" />
//     <Field name="skills" component="input" placeholder="Skills" />

//     <button type="submit">Submit</button>
//   </form>
// );


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
  
  
  
  const renderSkills = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Skill
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((skill, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Skill"
            onClick={() => fields.remove(index)}
          >remove skill</button>
          <h4>Skill #{index + 1}</h4>
          <Field
            name={`${skill}.skill`}
            type="text"
            component={renderField}
            label="Skill"
          />
          
          
        </li>
      ))}
    </ul>
  )
  
  const FieldArraysForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Name"
        />
        <FieldArray name="skills" component={renderSkills} />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
  


export default reduxForm({
  form: "UserForm",
  onSubmit: values => {
    makePost(values);
    window.alert("Submited: \n" + JSON.stringify(values, null, 2));
  }
})(FieldArraysForm);

//onSubmit fire up a file that does all this shit
//check ifExistingMongoUser
//if not there enterMongoData
//if already there updateMongoData
//use getMongoSkills to do this

//skills
//addSkills
//current engagement
//pastengagements
//notes

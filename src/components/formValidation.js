import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { parse, isDate } from "date-fns";

import "./formValidation.css";

function parseDateString(value, originalValue) {
	const parsedDate = isDate(originalValue)
		? originalValue
		: parse(originalValue, "yyyy-MM-dd", new Date());

	return parsedDate;
}

const today = new Date();

const SignupSchema = yup.object().shape({
	salutation: yup
		.mixed()
		.oneOf(["Mr", "Mrs", "Ms"]),
	firstName: yup
		.string()
		.required(),
	lastName: yup
		.string()
		.required(),
		gender: yup
			.mixed()
			.oneOf(["male", "female"]),
	birthday: yup
		.date()
		.transform(parseDateString)
		.max(today)
		.required(),
	email: yup
		.email()
		.url()
});

function formValidation() {

	const { register, handleSubmit, errors, reset, getValues } = useForm({
		defaultValues: {
			salutation: "",
			firstName: "",
			lastName: "",
			birthday: "",
			email: "",
			password: "",
			passwordConfirmation: ""
		},
		mode: "onChange", // "onBlur"
		validationSchema: SignupSchema
	});

	const onSubmit = (data, e) => {
		console.log(JSON.stringify(data));
		e.target.reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="salutation">Salutation</label>
				<select name="Salutation" ref={register({ required: true })}>
					<option value="Mr">Mr</option>
					<option value="Mrs">Mrs</option>
					<option value="Ms">Ms</option>
				</select>
				{errors.salutation && <p>{errors.salutation.message}</p>}
			</div>
			<div>
				<label htmlFor="firstName">First Name</label>
				<input type="text" name="firstName" placeholder="First Name" ref={register({ required: true })} />
				{errors.firstName && <p>{errors.firstName.message}</p>}
			</div>
			<div style={{ marginBottom: 10 }}>
				<label htmlFor="lastName">Last Name</label>
				<input type="text" name="lastName" placeholder="Last Name" ref={register({ required: true })} />
				{errors.lastName && <p>{errors.lastName.message}</p>}
			</div>
			<div>
				<label htmlFor="gender">Gender</label>
				<input type="radio" name="gender" ref={register({ required: true })} value="male" checked/>
				<input type="radio" name="gender" ref={register({ required: true })} value="female" />
				{errors.gender && <p>{errors.gender.message}</p>}
			</div>
			<div>
				<label htmlFor="birthday">Birthday</label>
				<input type="date" name="birthday" placeholder="Birthday" ref={register({ required: true })} />
				{errors.birthday && <p>{errors.birthday.message}</p>}
			</div>
			<div>
				<label htmlFor="email">E-Mail</label>
				<input type="text" name="email" placeholder="E-Mail" ref={register({
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })} />
				{errors.email && <p>{errors.email.message}</p>}
			</div>
			<div>
				<label htmlFor="password">Password</label>
        <input
					type="password"
          name="password"
          ref={register({ required: "Password is required!" })}
        />
        {errors.password && (<p>{errors.password.message}</p>)}
			</div>
			<div>
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
					type="password"
          name="passwordConfirmation"
          ref={register({
            required: "Please confirm password!",
            validate: {
              matchesPreviousPassword: value => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              }
            }
          })}
        />
        {errors.passwordConfirmation && (<p>{errors.passwordConfirmation.message}</p>)}
			</div>
			<button
        type="button"
        onClick={() => {
          setValue("salutation", "Mr");
          setValue("firstName", "John");
          setValue("lastName", "Doe");
          setValue("gender", "male");
          setValue("birthday", "1900-01-01");
          setValue("email", "john.doe@admin.com");
          setValue("password", "Test1234");
          setValue("passwordConfirmation", "Test1234");
        }}
      >
        Set default values
      </button>
			<input
				style={{ display: "block", marginTop: 20 }}
				type="button"
				onClick={() => reset()}
				value="Custom Reset"
			/>
			<input type="submit" />
		</form>
	);

}

export default formValidation;

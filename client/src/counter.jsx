import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./example.css";

export default function FormWithValidation() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
    },
  });

  useEffect(() => {
    let data = {
      firstName: "Homer",
      lastName: "Simpson",
      age: 42,
    };

    // set the values of each form field to match "data"
    for (const prop in data) {
      setValue(prop, data[prop]);
    }
  }, []);

  function submitForm(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      First Name: <br />
      <input
        {...register("firstName", { required: true, maxLength: 20 })}
        className={errors.firstName && "inputError"}
      />
      {errors.firstName?.type === "required" && (
        <span>
          <br />
          First Name is required
        </span>
      )}
      {errors.firstName?.type === "maxLength" && (
        <span>
          <br />
          First Name Cannot contain more than 20 characters
        </span>
      )}
      <br />
      <br />
      Last Name: <br />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <br />
      <br />
      Age: <br />
      <input
        type="number"
        {...register("age", {
          min: 18,
          max: 99,
          validate: { onlyEven: (v) => v % 2 == 0 },
        })}
      />
      <br />
      <br />
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Update User
      </button>
    </form>
  );
}

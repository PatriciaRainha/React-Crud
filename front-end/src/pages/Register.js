import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Nome de usuário muito curto!")
      .max(15, "Nome de usuário muito longo!")
      .required("O nome de usuário é obrigatório!"),
    password: Yup.string()
      .min(3, "Senha muito curta!")
      .max(20, "Senha muito longa!")
      .required("A senha é obrigatória!"),
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post(`https://api-crud-node-js.herokuapp.com/auth`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate("/");
          alert(response.data);
        }
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <h1 className="h3 mb-3 mt-3 fw-normal">Cadastre-se</h1>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Usuário:</label>
            <ErrorMessage name="username" component="span" className="px-1" />
            <Field
              type="text"
              name="username"
              autoComplete="off"
              className="form-control"
            />
          </div>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Senha:</label>
            <ErrorMessage component="span" name="password" className="px-1" />
            <Field
              name="password"
              autoComplete="off"
              type="password"
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="w-30 btn btn-lg btn-primary col-sm-3"
          >
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;

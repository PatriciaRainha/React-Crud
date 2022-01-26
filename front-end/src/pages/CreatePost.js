import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  let navigate = useNavigate();

  const obj = JSON.parse(localStorage.getItem("user"));

  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("O título é obrigatório!"),
    postText: yup.string().required("O conteúdo do post é obrigatório!"),
  });

  const onSubmit = (data) => {
    data.username = obj?.username
    axios
      .post(`https://api-crud-node-js.herokuapp.com/posts`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert("Você não está logado!");
          navigate("/login");
        } else {
          navigate("/");
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
          <h1 className="h3 mb-3 mt-3 fw-normal">Criar Post</h1>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Título: </label>
            <ErrorMessage name="title" component="span" className="px-1" />
            <Field
              name="title"
              placeholder="Título do Post"
              className="form-control"
            />
          </div>
          <div className="col-sm-5 mx-auto mb-3">
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" className="px-1" />
            <Field
              name="postText"
              placeholder="Conteúdo do Post"
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="w-25 btn btn-lg btn-primary col-sm-3"
          >
            Criar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;

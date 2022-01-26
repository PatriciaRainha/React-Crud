import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Comments() {
  let { id } = useParams();
  const navigate = useNavigate();

  const obj = JSON.parse(localStorage.getItem("user"));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://api-crud-node-js.herokuapp.com/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, [id]);

  const addComment = () => {
    if (newComment === "") {
      alert("Comentário não pode ser nulo!");
    } else {
      axios
        .post(
          `https://api-crud-node-js.herokuapp.com/comments`,
          {
            commentBody: newComment,
            PostId: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          if (response.data.error) {
            navigate("/login");
            return window.alert("Você não está logado");
          } else {
            const commentToAdd = {
              commentBody: newComment,
              username: response.data.username,
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    }
  };

  const deleteComment = (id) => {
    if (window.confirm("Tem certeza que deseja deletar esse comentário?")) {
      axios
        .delete(`https://api-crud-node-js.herokuapp.com/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id !== id;
            })
          );
        });
    } else {
      alert("O comentário não foi deletado");
    }
  };

  return (
    <div>
      <div className="col-sm-5 mx-auto mb-3">
        <input
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          value={newComment}
          className="form-control"
          placeholder="Envie um comentário!"
        />
        <button onClick={addComment} className="btn btn-primary mt-2">
          Comentar
        </button>
      </div>
      <div>
        <h1>Comentários:</h1>
        {comments.map((comment, id) => {
          return (
            <div className="card col-sm-5" key={id}>
              <div className="card-body d-flex justify-content-around align-items-center">
                <blockquote className="blockquote mb-0">
                  <p>{comment.commentBody}</p>
                  <label className="blockquote-footer">
                    {comment.username}
                  </label>
                </blockquote>
                {comment.username === obj?.username && (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;

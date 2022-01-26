import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [busca, setBusca] = useState("");

  let navigate = useNavigate();

  const filter = listOfPosts.filter((letters) => {
    return Object.values(letters)
      .join("")
      .toLowerCase()
      .includes(busca.toLowerCase());
  });

  useEffect(() => {
    axios
      .get(`https://api-crud-node-js.herokuapp.com/posts`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, [busca]);

  return (
    <div className="App">
      <div>
        <div className="col-sm-5 mx-auto mb-3 mt-3">
          <input
            onChange={(e) => {
              setBusca(e.target.value);
            }}
            value={busca}
            className="form-control"
            placeholder="Filtro de Posts"
          />
        </div>
      </div>
      {filter.map((value, keyName) => {
        return (
          <div
            // onClick={() => {
            //   navigate(`/readpost/${value.id}`);
            // }}
            key={keyName}
          >
            <Card
              title={value.title}
              text={value.postText}
              footer={value.username}
              onClick={() => navigate(`/readpost/${value.id}`)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Home;

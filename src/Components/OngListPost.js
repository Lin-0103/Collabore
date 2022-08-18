import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

import "./Css/OngList.css";

const firebaseConfig = {
  apiKey: "AIzaSyDsapget0E3ymksVP57iiVLuPSbvtmONHo",
  authDomain: "collabore-7594f.firebaseapp.com",
  databaseURL: "https://collabore-7594f-default-rtdb.firebaseio.com",
  projectId: "collabore-7594f",
  storageBucket: "collabore-7594f.appspot.com",
  messagingSenderId: "23740548144",
  appId: "1:23740548144:web:23ee03ae59b1f7e3e319f5",
};

// Initialize Firebase
initializeApp(firebaseConfig);

class OngList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      ongs: [],
    };
    this.renderOngs = this.renderOngs.bind(this);
  }

  //---- System Functions
  loadDB() {
    const dbref = ref(getDatabase());
    get(dbref, `ONGs`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const OngsData = snapshot.val();

          this.setState({ ongs: OngsData.ONGs });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //-----------------

  renderOngs() {
    let ongs = this.state.ongs;
    return ongs.map((index) => {
      if (index.id > 0) {
        return (
          <Link
            key={index.id}
            className="OngsValue"
            to={{ pathname: "/FormPosts:" + index.id }}
          >
            <p>{index.nome}</p>
            <p>{index.telefone}</p>
            <p>{index.endereco}</p>
            <p>{index.cidade}</p>
            <p>{index.bairro}</p>
          </Link>
        );
      } else {
        return null;
      }
    });
  }

  //----------------

  //----------------

  componentDidMount() {
    this.loadDB();
  }

  //---------------------

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div>
          <div className="Head">
            <p>Nome</p>
            <p>Telefone</p>
            <p>Endereço</p>
            <p>Cidade</p>
            <p>Bairro</p>
          </div>
          {this.renderOngs()}
        </div>
      </React.Fragment>
    );
  }
}
export default OngList;

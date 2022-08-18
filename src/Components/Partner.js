import React, { Component } from "react";
import NavBar from "./NavBar";
import "./Css/Partner.css"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      parceiros: [],
    };
  }
  loadPartnersDB() {
    const dbref = ref(getDatabase());
    get(dbref, `Parceiros`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const PartnersData = snapshot.val();
          this.setState({ parceiros: PartnersData.Parceiros });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RenderPartners() {
    let Partners = this.state.parceiros;

    if (Partners.length > 1) {
      return Partners.map((index) => {
        if (index.id > 0) {
          return (
            <div key={index.id} className="Parceiro">
              <h2>{index.nome}</h2>
              {index.descricao}
              <button style={{ width: "70%" }}>
                <a id="link" href={index.link}>
                  Conheça {index.nome}
                </a>
              </button>
            </div>
          );
        } else {
          return null;
        }
      });
    } else return <h2>Não Possuimos Parceiros Ainda</h2>;
  }

  componentDidMount() {
    this.loadPartnersDB();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <div className="Parceiros">{this.RenderPartners()}</div>
      </React.Fragment>
    );
  }
}

export default Partners;

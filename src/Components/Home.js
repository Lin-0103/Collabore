import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Css/Home.css";
import NavBar from "./NavBar";
import "./Css/OngList.css";
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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ongs: [],
      parceiros: [],
    };
  }
  /* ---------------- SYSTEM FUNCIONS ----------------------- */
  loadONGDB() {
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

  componentDidMount() {
    this.loadONGDB();
    this.loadPartnersDB();
  }

  RenderOngs() {
    let Ongs = this.state.ongs;

    if (Ongs.length > 1) {
      return Ongs.map((index) => {
        if (index.id > 0 && index.id <= 3) {
          return (
            <div key={index.id} className="Ong">
              <h2>{index.nome}</h2>
              {index.descricao}
              <button style={{ width: "70%" }}>
                <Link id="link" to={{ pathname: "/OngPage:" + index.id }}>
                  Conheça {index.nome}
                </Link>
              </button>
            </div>
          );
        } else {
          return null;
        }
      });
    } else return <h2>Não Há ONGs Disponiveis no Momento</h2>;
  }

  RenderPartners() {
    let Partners = this.state.parceiros;

    if (Partners.length > 1) {
      return Partners.map((index) => {
        if (index.id > 0 && index.id <= 3) {
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
  /* --------------------------- RENDER FUNCTION------------------------------ */
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <div id="mainDiv">
          <div id="Home">
            <div id="HomeText">
              <h1>Collabore</h1>
              <h4> Uma Iniciativa para Reduzir</h4>
              <h4> a Fome e o Desperdicio </h4>
              <button>
                <Link id="link" to="/OngList">
                  Doar Agora
                </Link>
              </button>
            </div>
          </div>
          <div id="FomeNoMundo">
            <h1> Sobre a Fome no Mundo </h1>A Fome é um dos Maiores Problemas no
            Mundo Atualmente e agrava <br />
            diveros problmeas de Saude principalmente em regioes de extrema
            probreza
          </div>
          <div className="OngsDiv">
            <h1>Veja Algumas ONG's Cadastradas</h1>
            <div className="Ongs">{this.RenderOngs()}</div>
          </div>
          <div id="SobreOProjeto">
            <h1>Projeto Colabore</h1>
            O Projeto Colabore tem o objetivo de conectar ONGs e Pessoas <br />
            Dessa Forma auxiliamos na Doação de alimentos ajudando no combate a
            fome e ao despedicio de alimentos
          </div>
          <div className="DivParceiros">
            <h1>Conheça Nossos Parceiros</h1>
            <div className="Parceiros">{this.RenderPartners()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

import React, { Component } from "react";
import "./Css/Form.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { Link } from "react-router-dom";

// DataBase Import Config
const firebaseConfig = {
  apiKey: "AIzaSyDsapget0E3ymksVP57iiVLuPSbvtmONHo",
  authDomain: "collabore-7594f.firebaseapp.com",
  databaseURL: "https://collabore-7594f-default-rtdb.firebaseio.com",
  projectId: "collabore-7594f",
  storageBucket: "collabore-7594f.appspot.com",
  messagingSenderId: "23740548144",
  appId: "1:23740548144:web:23ee03ae59b1f7e3e319f5",
};

// Iniialize database
initializeApp(firebaseConfig);

//----------- COMPONENT CLASS ----------------//
class Form extends Component {
  constructor(props) {
    super(props);

    // component States
    this.state = {
      id: 0,
      nome: "",
      descricao: "",
      PartnerLink: "",
      pass: "",
    };
  }

  // load DB when component mount
  componentDidMount() {
    this.loadindexDB();
  }

  // Function that insert ong values on dtabase
  insertPartner() {
    let values = this.state;

    // Verify if there is any empty value
    if (
      values.nome !== "" &&
      values.descricao !== "" &&
      values.partnerLink !== ""
    ) {
      // if there isn't any empty value create an object that contain all parameters
      let OngtoAdd = this.state;

      let PartnerInfo = {
        id: this.state.id + 1,
        nome: OngtoAdd.nome,
        descricao: OngtoAdd.descricao,
        link: OngtoAdd.PartnerLink,
      };

      // Call function writePartnerData to insert the values on Database using OngInfo Object
      this.writeParnerData(
        PartnerInfo.id,
        PartnerInfo.nome,
        PartnerInfo.descricao,
        PartnerInfo.link
      );
      alert("Registrado com Sucesso!"); //show a sucess message if registered with sucess
      this.cleanInputs();
    } else {
      alert("Falha ao Cadastrar"); // Show  fail message if there is any fail
    }
  }

  // fucntion that writes Data on database
  writeParnerData(
    id,
    nome,
    descricao,
    link // the parameters contan info to be registered
  ) {
    // Getting DataBase to register Data
    const db = getDatabase();
    //white the values on db
    set(ref(db, `Parceiros/${this.state.id + 1}`), {
      id: id,
      nome: nome,
      descricao: descricao,
      link: link,
    });
  }

  // Get index of the last element registered
  loadindexDB() {
    const dbref = ref(getDatabase());
    get(dbref, `Parceiros/`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const PartnersData = snapshot.val();
          this.setState({
            id: PartnersData.Parceiros[PartnersData.Parceiros.length - 1].id,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //  Verify if the password is correct
  validpass() {
    return this.state.pass === "CollaboreParceiro";
  }

  // Get the input values of parameters
  inputvalues(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  cleanInputs() {
    this.setState({ nome: "" });
    this.setState({ descricao: "" });
    this.setState({ PartnerLink: "" });
    this.setState({ pass: "" });
  }

  render() {
    return (
      <form id="formCadastro" className="form-col">
        <h1>Ficha De Cadastro</h1>
        <div id="btn">
          <button id="btn">
            <Link id="link" to="/CadastroOng">
              Cadastrar Nova Ong
            </Link>
          </button>
        </div>
        <div className="form-group">
          {/* Nome */}
          <label htmlFor="nome">Nome</label>
          <input
            type="Text"
            className="form-control"
            id="nome"
            placeholder="Nome"
            value={this.state.nome}
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="form-group">
          {/* Descrição */}
          <label htmlFor="descricao">Descrição</label>
          <input
            type="Text"
            className="form-control"
            id="descricao"
            placeholder="Um Pouco Sobre o Parceiro"
            value={this.state.descricao}
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="form-group">
          {/* Link */}
          <label htmlFor="PartnerLink">Descrição</label>
          <input
            type="Text"
            className="form-control"
            id="PartnerLink"
            placeholder="Link para o Site"
            value={this.state.PartnerLink}
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="col-md-6" id="pass-group">
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Senha"
            required
            value={this.state.pass}
            onInput={(event) => {
              this.inputvalues(event);
            }}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={!this.validpass()}
            onClick={() => this.insertPartner()}
          >
            Cadastrar!
          </button>
        </div>
      </form>
    );
  }
}

export default Form;

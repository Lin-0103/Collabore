import React, { Component, createRef } from "react";
import "./Css/Form.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { Link } from "react-router-dom";

//DataBase import config
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

//----------- COMPONENT CLASS ----------------//
class Form extends Component {
  constructor(props) {
    super(props);

    // component States
    this.state = {
      id: 0,
      nome: "",
      tel: "",
      email: "",
      endereco: "",
      cidade: "",
      descricao: "",
      MapsLink: "",
      pass: "",
      senha: "",
    };
    this.DepoimentRef = createRef();
    this.insertOng = this.insertOng.bind(this);
  }

  // load DB when component mount
  componentDidMount() {
    this.loadindexDB();
  }

  // Function that insert ong values on dtabase
  insertOng() {
    let values = this.state;

    // Verify if there is any empty value
    if (
      values.nome !== "" &&
      values.tel !== "" &&
      values.endereco !== "" &&
      values.cidade !== "" &&
      values.email !== "" &&
      values.bairro !== "" &&
      values.descricao !== "" &&
      values.senha !== ""
    ) {
      // if there isn't any empty value create an object that contain all parameters
      let OngtoAdd = this.state;

      let OngInfo = {
        id: this.state.id + 1,
        nome: OngtoAdd.nome,
        telefone: OngtoAdd.tel,
        endereco: OngtoAdd.endereco,
        cidade: OngtoAdd.cidade,
        descricao: OngtoAdd.descricao,
        MapsLink: OngtoAdd.MapsLink,
        email: OngtoAdd.email,
        senha: OngtoAdd.senha,
      };

      // Call function writeOngData to insert the values on Database using OngInfo Object
      this.writeOngData(
        OngInfo.id,
        OngInfo.nome,
        OngInfo.telefone,
        OngInfo.endereco,
        OngInfo.cidade,
        OngInfo.email,
        OngInfo.descricao,
        OngInfo.MapsLink,
        OngInfo.senha
      );
      alert("Registrado com Sucesso!"); //show a sucess message if registered with sucess
      this.cleanInputs();
    } else {
      alert("Falha ao Cadastrar"); // Show  fail message if there is any fail
    }
  }

  // fucntion that writes Data on database
  writeOngData( // the parameters contan info to be registered
    id,
    nome,
    telefone,
    endereco,
    cidade,
    email,
    descricao,
    MapsLink,
    senha
  ) {
    // Getting DataBase to register Data
    const db = getDatabase();
    //white the values on db
    set(ref(db, `ONGs/${this.state.id + 1}`), {
      id: id,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      cidade: cidade,
      email: email,
      descricao: descricao,
      MapsLink: MapsLink,
      Senha: senha,
    });
  }

  // Get index of the last element registered
  loadindexDB() {
    const dbref = ref(getDatabase());
    get(dbref, `ONGs/`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const OngsData = snapshot.val();
          this.setState({
            id: OngsData.ONGs[OngsData.ONGs.length - 1].id,
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
    return this.state.pass === "CollaboreOng";
  }

  // Get the input values of parameters
  inputvalues(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  cleanInputs() {
    this.setState({ nome: "" });
    this.setState({ tel: "" });
    this.setState({ email: "" });
    this.setState({ endereco: "" });
    this.setState({ cidade: "" });
    this.setState({ descricao: "" });
    this.setState({ MapsLink: "" });
    this.setState({ senha: "" });
    this.setState({ pass: "" });
  }

  render() {
    return (
      <form id="formCadastro" className="form-col">
        <h1>Ficha De Cadastro</h1>
        <div id="btn">
          <button id="btn">
            <Link id="link" to="/CadastroParceiro">
              Cadastrar Novo Parceiro
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
        <div className="row">
          {/* E-Mail */}
          <div className="form-group col-md-6">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="E-Mail"
              value={this.state.email}
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
          {/* Telefone */}
          <div className="form-group col-md-6">
            <label htmlFor="tel">Telefone</label>
            <input
              type="number"
              className="form-control"
              id="tel"
              placeholder="Telefone"
              value={this.state.tel}
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            {/* Endereço */}
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              className="form-control"
              id="endereco"
              placeholder="Endereço"
              value={this.state.endereco}
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
          {/* Cidade */}
          <div className="form-group col-md-6">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Cidade"
              value={this.state.cidade}
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        <div className="form-group">
          {/* Link do Mapa */}
          <label htmlFor="MapsLink">Link do Mapa</label>
          <input
            type="Text"
            className="form-control"
            id="MapsLink"
            placeholder="Cole o Endereço do Mapa da ONG"
            value={this.state.MapsLink}
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
            placeholder="Comente um pouco sobre a Ong"
            value={this.state.descricao}
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        {/* Senha */}
        <div className="form-group">
          {/* Senha */}
          <label htmlFor="senha">Senha da ONG</label>
          <input
            type="password"
            className="form-control"
            id="senha"
            placeholder="Configure uma senha para a ONG"
            value={this.state.senha}
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
            onClick={() => this.insertOng()}
          >
            Cadastrar!
          </button>
        </div>
      </form>
    );
  }
}

export default Form;

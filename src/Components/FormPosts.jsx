import React, { Component } from "react";
import "./Css/Form.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

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
      Descricao: "",
      Image: "",
      pass: "",
      Ong: {},
      OngPost: "",
    };
  }

  // load DB when component mount
  componentDidMount() {
    this.loadindexDB();
  }

  // Get the Ong id from URL (using it to filter Ong DATA from DataBase)
  OngId() {
    const id = window.location.pathname;
    const indexofId = id.indexOf(":");
    return id.substring(indexofId + 1, id.length);
  }

  // Function that insert ong values on dtabase
  insertPost() {
    let values = this.state;

    // Verify if there is any empty value
    if (values.Descricao !== "" && values.Image !== "") {
      // if there isn't any empty value create an object that contain all parameters
      let posttoadd = this.state;

      let PostInfo = {
        id: this.state.id + 1,
        OngPost: this.OngId(),
        descricao: posttoadd.Descricao,
        link: posttoadd.Image,
      };

      // Call function writePartnerData to insert the values on Database using OngInfo Object
      this.writePostData(
        PostInfo.id,
        PostInfo.OngPost,
        PostInfo.descricao,
        PostInfo.link
      );
      alert("Registrado com Sucesso!"); //show a sucess message if registered with sucess
      this.cleanInputs();
    } else {
      alert("Falha ao Cadastrar"); // Show  fail message if there is any fail
    }
  }

  // fucntion that writes Data on database
  writePostData(
    id,
    OngPost,
    descricao,
    link // the parameters contan info to be registered
  ) {
    // Getting DataBase to register Data
    const db = getDatabase();
    //white the values on db
    set(ref(db, `Posts/${this.state.id + 1}`), {
      id: id,
      OngPost: OngPost,
      descricao: descricao,
      link: link,
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
    return this.state.pass === "Ong1";
  }

  // Get the input values of parameters
  inputvalues(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  cleanInputs() {
    this.setState({ Descricao: "" });
    this.setState({ Image: "" });
    this.setState({ pass: "" });
  }

  render() {
    return (
      <form id="formCadastro" className="form-col">
        <h1>Ficha De Postagem</h1>
        <div className="form-group">
          {/* Descrição */}
          <label htmlFor="descricao">Descrição</label>
          <input
            type="Text"
            className="form-control"
            id="Descricao"
            placeholder="Descrição do Post"
            value={this.state.Descricao}
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="form-group">
          {/* Link */}
          <label htmlFor="imgLink">Link de Imagem</label>
          <input
            type="Text"
            className="form-control"
            id="Image"
            placeholder="Link para o Site"
            value={this.state.Image}
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
            onClick={() => this.insertPost()}
          >
            Cadastrar!
          </button>
        </div>
      </form>
    );
  }
}

export default Form;

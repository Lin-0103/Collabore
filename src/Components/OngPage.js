import React, { Component, createRef } from "react";
import "./Css/OngPage.css";
import NavBar from "./NavBar";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";

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
// Initialize emailjs
init("user_fLniizC4woiz62hqLUK8f");

//----------- COMPONENT CLASS ----------------//
class OngPage extends Component {
  constructor(props) {
    super(props);
    this.ScollToDonateForm = createRef();
    // component States
    this.state = {
      Name: "",
      Tel: "",
      Endereco: "",
      Food: "",
      // Conponent to receive User Data
      Ong: {},
      Posts: [],
    };
  }

  // load DB when component mount
  componentDidMount() {
    this.loadONGDB();
    this.loadPostDB();
  }
  // Get the Ong id from URL (using it to filter Ong DATA from DataBase)
  OngId() {
    const id = window.location.pathname;
    const indexofId = id.indexOf(":");
    return id.substring(indexofId + 1, id.length);
  }
  // getting DB ong reference
  loadONGDB() {
    const dbref = ref(getDatabase());
    get(dbref, `ONGs`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const OngsData = snapshot.val();
          for (const index of OngsData.ONGs) {
            if (index.id > 0 && index.id === parseInt(this.OngId())) {
              this.setState({ Ong: index });
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // getting DB Posts reference
  loadPostDB() {
    const dbref = ref(getDatabase());
    get(dbref, `Posts`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const PostsData = snapshot.val();
          console.log(PostsData.Posts);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // change state form Values
  ChageState(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  // Check empty form Values
  ValidInputs() {
    if (
      this.state.Tel !== "" &&
      this.state.Name !== "" &&
      this.state.Food !== "" &&
      this.state.Endereco !== ""
    ) {
      return true;
    }
    return false;
  }

  // Send Mail after user press button
  HandleSubmit(e) {
    e.preventDefault();
    const TemplateID = "template_o9v4vkg";
    // set params for mail tmeplate
    if (this.ValidInputs()) {
      let templateparams = {
        //User Data
        nome: this.state.Name,
        Telefone: this.state.Tel,
        Endereco: this.state.Endereco,
        //Ong Data
        ong_mail: this.state.Ong.email,
        ong: this.state.Ong.nome,
        //food Data
        alimento: this.state.Food,
      };
      // Send mail funtion
      emailjs.send("CollaboreGmail", TemplateID, templateparams);
      alert(this.state.Food + " " + "Doado com Sucesso");
      this.setState({ Name: "" });
      this.setState({ Food: "" });
      this.setState({ Endereco: "" });
      this.setState({ Tel: "" });
    } else {
      alert(
        "Falha Ao Realizar Doação \n Verifique se todos os Campos foram preenchidos Corretamente"
      );
    }
  }

  renderPosts() {
    let Posts = this.state.Posts;
    if (Posts.length > 0) {
      return Posts.map((index) => {
        return (
          <div key={index.id} id="Post">
            <p>{index.Descricao}</p>
            <img src={index.Image} alt={index.id}></img>
          </div>
        );
      });
    } else {
      return <h3 id="NonePost">Nenhum Post no Momento</h3>;
    }
  }

  GotoDonateForm(e) {
    this.ScollToDonateForm.current.scrollIntoView();
  }

  // --------------- RENDER FUNCTION -------------------------//
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/* Main Div of the page */}
        <div id="Main">
          {/* Ong Name and Donate Button */}
          <div id="Ong">
            <h1>{this.state.Ong.nome}</h1>
            <button onClick={() => this.GotoDonateForm()}>
              {" "}
              {/* On click Function to redirect user t Donate form */}
              Faça Uma Doação
            </button>
            {/* Div that contain the Ong Story (state.descricao) */}
            <div id="History">
              <p>{this.state.Ong.descricao}</p>
            </div>
          </div>
          {/* Posts Section */}
          <div id="postsdiv">
            <h1>Posts</h1>
            {this.renderPosts()}
          </div>
          {/* Donate Section (this section Contain a map, Ong Contacts and Adress, Donate Form) */}
          <div id="DonateSec">
            <h1>Doar para {this.state.Ong.nome}</h1>
            <div id="formDiv">
              {/* Map */}
              <div
                dangerouslySetInnerHTML={{ __html: this.state.Ong.MapsLink }}
              ></div>
              {/* this div contain Ong Contacts, Adress, Donate Form */}
              <div id="DonateDiv">
                {/* this div contain Ong Contact and Adress */}
                <div id="contact">
                  <p>Tel: {this.state.Ong.telefone}</p>
                  <p>E-mail: {this.state.Ong.email}</p>
                  <p>
                    Endereço: {this.state.Ong.endereco} -{" "}
                    {this.state.Ong.cidade}
                  </p>
                </div>
                <h1>Formulario de Doação</h1>
                {/* this div contain Donate Form */}
                <div id="form">
                  <form
                    className="form"
                    id="Donateform"
                    ref={this.ScollToDonateForm}
                  >
                    <div className="row">
                      <div className="form-group col-md-6">
                        {/* Donate Name */}
                        <label htmlFor="Name">Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          placeholder="Nome"
                          onInput={(e) => {
                            this.ChageState(e);
                          }}
                          value={this.state.Name}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        {/* Donate Phone (onl accepts number imputs) */}
                        <label htmlFor="Tel">Telefone</label>
                        <input
                          type="number"
                          className="form-control"
                          id="Tel"
                          placeholder="Telefone"
                          onChange={(e) => {
                            this.ChageState(e);
                          }}
                          value={this.state.Tel}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      {/* Adress */}
                      <label htmlFor="Endereco">Endereço</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Endereco"
                        placeholder="Endereço"
                        onChange={(e) => {
                          this.ChageState(e);
                        }}
                        required
                        value={this.state.Endereco}
                      />
                      {/* Food */}
                      <label htmlFor="Food">Alimento Doado</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Food"
                        placeholder="Informe o Alimento que Deseja Doar"
                        onChange={(e) => {
                          this.ChageState(e);
                        }}
                        value={this.state.Food}
                        required
                      />
                    </div>
                    <div className="form-outline"></div>
                    {/* Donate Button (calls send mail finction only if all inputs are valid) */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => {
                        this.HandleSubmit(e);
                      }}
                    >
                      Doar !!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OngPage;

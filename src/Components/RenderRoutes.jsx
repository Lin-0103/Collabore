import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import OngList from "./OngList";
import OngPage from "./OngPage";
import FormOng from "./FormOng";
import FormPartner from "./FormPartner";
import Partners from "./Partner";
import ListaPost from "./OngListPost";
import FormPosts from "./FormPosts";

class RenderRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/OngList" element={<OngList />}></Route>
          <Route path="/OngPage:id" element={<OngPage />}></Route>
          <Route path="/CadastroOng" element={<FormOng />}></Route>
          <Route path="/CadastroParceiro" element={<FormPartner />}></Route>
          <Route path="/Parceiros" element={<Partners />}></Route>
          <Route path="/PostsList" element={<ListaPost />}></Route>
          <Route path="/FormPosts:id" element={<FormPosts />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default RenderRouter;

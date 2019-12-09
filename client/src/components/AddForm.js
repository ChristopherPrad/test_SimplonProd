import React, { Component } from "react";
import { addContact } from "./AdminFunction";
// Class permettant d'afficher la page pour ajouter un contact
class Contact extends Component {
  constructor() {
    super();
    this.state = {
      nom: "",
      prenom: "",
      numero: "",
      email: "",
      fonction: "",
      id: ""
    };
    // faire circuler les données facilement avec la méthode .bind
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // Fonction qui permet de récupérer ce que rentre l'utilisateur tout au long de l'action
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // Fonction qui permet de créer le contact au clic
  onSubmit(e) {
    e.preventDefault();
    const contact = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      numero: this.state.numero,
      email: this.state.email,
      fonction: this.state.fonction
    };
    addContact(contact)
      .then(res => {
        this.props.history.push("/allcontact");
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Entrer votre contact
              </h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  placeholder="Nom"
                  value={this.state.nom}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="prenom"
                  placeholder="Prénom"
                  value={this.state.prenom}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="numero"
                  placeholder="Numéro"
                  value={this.state.numero}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="fonction"
                  placeholder="Poste"
                  value={this.state.poste}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;

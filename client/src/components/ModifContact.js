import React, { Component } from "react";
import axios from "axios";

// Class qui permet de modifier les informations des contacts
export class ModifContact extends Component {
  state = {
    isClicked: false,
    valueInput: "",
    nom: this.props.nom,
    prenom: this.props.prenom,
    email: this.props.email,
    numero: this.props.numero,
    fonction: this.props.fonction,
    id: this.props.id
  };

  componentDidUpdate(prevProps) {
    /**
     * Vérifier si les valeurs entrée sont différentes
     */
    if (this.props.nom !== prevProps.nom) {
      this.setState({
        nom: this.props.nom,
        prenom: this.props.prenom,
        email: this.props.email,
        numero: this.props.numero,
        fonction: this.props.fonction
      });
    }
  }

  componentDidMount() {}
  /**
   * Permet de modifier en front puis dans la BDD les informations du contact
   * @param value
   * @return contact modifié
   */
  onChangeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.key === "Enter") {
      console.log(this);
      this.setState({ isClicked: false });
      axios
        .put("http://localhost:3006/contacts/modify/" + this.state.id, {
          nom: this.state.nom,
          prenom: this.state.prenom,
          email: this.state.email,
          numero: this.state.numero,
          fonction: this.state.fonction
        })
        .then(response => {
          console.log(response.data);
          this.setState({ data: response.data, loading: false });
        })
        .catch(err => console.log(err));
    }
  };
  // Permet de changer l'état de isClicked instentanément
  handleClick = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    return (
      <div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr className="tableau-tr">
              <td>Nom</td>
              {this.state.isClicked ? (
                <td>
                  <input
                    onKeyPress={this.onChangeValue}
                    onChange={this.onChangeValue}
                    name="nom"
                    type="text"
                    value={this.state.nom}
                  />
                </td>
              ) : (
                <td onClick={this.handleClick}>{this.state.nom}</td>
              )}
            </tr>
            <tr className="tableau-tr">
              <td>Prénom</td>
              {this.state.isClicked ? (
                <td>
                  <input
                    onKeyPress={this.onChangeValue}
                    onChange={this.onChangeValue}
                    name="prenom"
                    type="text"
                    value={this.state.prenom}
                  />
                </td>
              ) : (
                <td onClick={this.handleClick}>{this.state.prenom}</td>
              )}
            </tr>

            <tr className="tableau-tr">
              <td>Email</td>

              {this.state.isClicked ? (
                <td>
                  <input
                    onKeyPress={this.onChangeValue}
                    onChange={this.onChangeValue}
                    name="email"
                    type="text"
                    value={this.state.email}
                  />
                </td>
              ) : (
                <td onClick={this.handleClick}>{this.state.email}</td>
              )}
            </tr>
            <tr className="tableau-tr">
              <td>Numero</td>

              {this.state.isClicked ? (
                <td>
                  <input
                    onKeyPress={this.onChangeValue}
                    onChange={this.onChangeValue}
                    name="numero"
                    type="text"
                    value={this.state.numero}
                  />
                </td>
              ) : (
                <td onClick={this.handleClick}>{this.state.numero}</td>
              )}
            </tr>
            <tr className="tableau-tr">
              <td>Poste</td>
              {this.state.isClicked ? (
                <td>
                  <input
                    onKeyPress={this.onChangeValue}
                    onChange={this.onChangeValue}
                    name="fonction"
                    type="text"
                    value={this.state.fonction}
                  />
                </td>
              ) : (
                <td onClick={this.handleClick}>{this.state.fonction}</td>
              )}
            </tr>
          </tbody>
        </table>
        <button
          className="button"
          onClick={() => this.props.handleClickBtn(this.props.id)}
        >
          X
        </button>
      </div>
    );
  }
}

export default ModifContact;

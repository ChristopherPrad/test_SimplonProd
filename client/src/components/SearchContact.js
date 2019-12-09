import React, { Component } from "react";
import axios from "axios";
// Class qui permet de chercher les contacts par lettre et par input
class searchContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCliked: false,
      data: [],
      loading: true
    };
  }
  // A chaque chargement de page execute la fonction GET requete
  componentDidMount() {
    this.fetchData();
  }
  /**
   * AXIOS pour récupérer tous les contacts de la BDD
   * @param "GET METHOD"
   * @return tous les contacts
   */
  fetchData = () => {
    axios
      .get("http://localhost:3006/contacts/all")
      .then(response => {
        this.setState({
          data: response.data,

          loading: false
        });
      })
      .catch(err => console.log(err));
  };
  /**
   * Supprimer un contact
   * @param id
   * @return contact supprimé du front et ensuite de la BDD
   */
  handleClickBtn = id => {
    console.log("ok");
    axios
      .delete("http://localhost:3006/contacts/del/" + id)
      .then(res => this.fetchData())
      .catch(err => console.log("error"));
  };

  render() {
    <div></div>;
  }
}

export default searchContact;

import React, { Component } from "react";
import axios from "axios";
import ModifContact from "./ModifContact";
import gsap from "gsap";

// Class qui permet d'afficher tous les contacts
class allContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCliked: false,
      data: [],
      loading: true,
      value: "",
      valueSearch: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  // Récupérer les data au chargement de la page
  componentDidMount() {
    this.fetchData();
  }
  // Animation test (A rectifier car il y a un délai au chargement de page qui empeche de mettre gsap dans didMount)
  componentDidUpdate() {
    gsap
      .timeline()
      .from(".text-center", { duration: 1, y: -100, opacity: 0 }, "start")
      // .from(".example_d", { duration: 1, y: -100, opacity: 0 }, "start")
      // .from(".search", { duration: 1, y: -100, opacity: 0 }, "start")
      .from(".alphabet-sort span", {
        duration: 0.2,
        stagger: { amount: 0.4 },
        x: -100,
        opacity: 0
      });
  }
  // Récupérer tous les contacts dans la BBD pour les afficher en front
  fetchData = () => {
    axios
      .get("http://localhost:3006/contacts/all")
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  handleClick(value) {
    console.log(value);
    this.setState({
      isCliked: !this.state.isCliked
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClickBtn = id => {
    console.log("ok");
    axios
      .delete("http://localhost:3006/contacts/del/" + id)
      .then(res => this.fetchData())
      .catch(err => console.log("error"));
  };

  sortNom = letter => {
    console.log(letter);
    axios
      .get(`http://localhost:3006/contacts/search-letter/${letter}`)
      .then(({ data }) => {
        this.setState({
          data
        });
      })
      .catch(err => console.log("error"));
  };
  /**
   * Input qui permet de rechercher un contact en fonction des lettres entrés
   * @param valueSearch
   * @return data
   */
  searchInput = e => {
    console.log();
    this.setState({ valueSearch: e.target.value }, () => {
      // si input vide alors ne pas faire la requete axios
      if (this.state.valueSearch.length === 0) {
        axios
          .get("http://localhost:3006/contacts/all")
          .then(response => {
            console.log(response.data);
            this.setState({
              data: response.data,
              loading: false
            });
          })
          .catch(err => console.log(err));
      } else {
        axios
          .get(
            `http://localhost:3006/contacts/input-search/${this.state.valueSearch}`
          )
          .then(({ data }) => {
            console.log("data: ", data);
            this.setState({
              data
            });
          })
          .catch(err => console.log("error"));
      }
    });
  };

  render() {
    /**
     *Ce que l'ont voit affiché à l'écran de la page allcontact
     */
    if (this.state.loading === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="container">
          <h1 className="text-center">Annuaire Simplon</h1>
          <br />
          <div className="button_cont" align="center">
            <a className="example_d" href="/addcontact">
              Ajouter un contact
            </a>
          </div>
          <br />
          <div className="search">
            <input
              className="input"
              onChange={e => this.searchInput(e)}
              value={this.state.valueSearch}
              placeholder="Rechercher un contact"
              type="text"
            />
          </div>
          <p className="alphabet-sort">
            <a className="example_e" href="/allcontact" rel="nofollow noopener">
              Tous les contacts
            </a>
            <span onClick={() => this.sortNom("a")}>A</span>
            <span onClick={() => this.sortNom("b")}>B</span>
            <span onClick={() => this.sortNom("c")}>C</span>
            <span onClick={() => this.sortNom("d")}>D</span>
            <span onClick={() => this.sortNom("e")}>E</span>
            <span onClick={() => this.sortNom("f")}>F</span>
            <span onClick={() => this.sortNom("g")}>G</span>
            <span onClick={() => this.sortNom("h")}>H</span>
            <span onClick={() => this.sortNom("i")}>I</span>
            <span onClick={() => this.sortNom("j")}>J</span>
            <span onClick={() => this.sortNom("q")}>Q</span>
            <span onClick={() => this.sortNom("l")}>L</span>
            <span onClick={() => this.sortNom("m")}>M</span>
            <span onClick={() => this.sortNom("n")}>N</span>
            <span onClick={() => this.sortNom("o")}>O</span>
            <span onClick={() => this.sortNom("p")}>P</span>
            <span onClick={() => this.sortNom("q")}>Q</span>
            <span onClick={() => this.sortNom("r")}>R</span>
            <span onClick={() => this.sortNom("s")}>S</span>
            <span onClick={() => this.sortNom("t")}>T</span>
            <span onClick={() => this.sortNom("u")}>U</span>
            <span onClick={() => this.sortNom("v")}>V</span>
            <span onClick={() => this.sortNom("w")}>W</span>
            <span onClick={() => this.sortNom("x")}>X</span>
            <span onClick={() => this.sortNom("y")}>Y</span>
            <span onClick={() => this.sortNom("z")}>Z</span>
          </p>
          {this.state.data.length <= 0 ? (
            <div>Aucun resultat</div>
          ) : (
            this.state.data.map((value, index) => {
              return (
                <div className="container" key={index}>
                  <ModifContact
                    nom={value.nom}
                    prenom={value.prenom}
                    // image={value.image}
                    email={value.email}
                    numero={value.numero}
                    fonction={value.fonction}
                    date={value.date}
                    id={value._id}
                    handleClickBtn={this.handleClickBtn}
                  />
                  <br />
                  <br />
                </div>
              );
            })
          )}
        </div>
      );
    }
  }
}

export default allContact;

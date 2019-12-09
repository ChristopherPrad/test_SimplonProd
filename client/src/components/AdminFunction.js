import axios from "axios";
/**
 * POST Requête pour enregistrer le contact dans la BDD
 * @param {*} newContact
 * @return
 */
export const addContact = newContact => {
  return axios
    .post("http://localhost:3006/contacts/create", {
      nom: newContact.nom,
      prenom: newContact.prenom,
      email: newContact.email,
      numero: newContact.numero,
      fonction: newContact.fonction
    })
    .then(res => {
      console.log("Contact Add");
    });
};

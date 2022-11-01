import React, { Component } from 'react';
import '../index.scss'

//*      Libraries      //
import { nanoid } from 'nanoid';
// import styled from 'styled-components'
// import { color } from 'styled-system'




//*      Components      //
import ContactList from 'components/ContactList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import Container from 'components/Container';
import Section from 'components/Section/Section';


//*      Root      //
class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  //*  удаляем контакт из  списка  фильтра   //
  deleteContactItem = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  // //*                              //
  // formSubmitHandler = e => {
  //   e.preventDefault();
  //   console.log(e);
  // }
  

  //*  берем  данные по сабмиту  кнопки  //
  addContact = ({ name, number }) => {
    const normalizedFilter = name.toLowerCase();
    
    const checkByName = this.state.contacts.find(contact => contact.name.toLowerCase() === normalizedFilter);
    if (checkByName) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name, number,
        completed: false,
      };
    
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    };
  }

 //*  фильтруем по имени  //
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }
    // //*  прописываем  внутри инпута   //
  handleChange = evt => {
    // const { name, value } = evt.currentTarget;
    // this.setState({ [name]: [value] });
    this.setState({ filter: evt.currentTarget.value });
  };
//*                              //
  

  render() {
    const { filter } = this.state;
    const visibleContacts =  this.getVisibleContacts();
    return (
      <>
        <Section >
        <Container >
        <h1 className = "title">Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </Container>
        <Container >
          <h2 className = "title">Contacts</h2>
        <Filter value={filter}
            onChange={this.handleChange}/>
          <ContactList
            contacts={visibleContacts}
            onDeleteContactItem={this.deleteContactItem}
          />
          </Container>
          </Section>
      </>
    );
  }
}

export default App;
// onChange={this.changeFilter} 
//<div>
//  <h1>Phonebook</h1>
//  <ContactForm ... />
//
// <h2>Contacts</h2>
//  <Filter ... />
//  <ContactList ... />
//</div>


//   handleInputName = evt => {
//     console.log(evt.currentTarget.name);
//     this.setState({ name: evt.currentTarget.name });
//   };
// handleInputNumber = evt => {
//     console.log(evt.currentTarget.number);
//     this.setState({ number: evt.currentTarget.number });
// };
//   handleInputFilter = evt => {
//     console.log(evt.currentTarget.filter);
//     this.setState({ filter: evt.currentTarget.filter });
//   };


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [alertMsg, setAlertMsg] = useState({
    status: false,
    msg: "",
  });
  const [contact, setContact] = useState({
    name: "",
    email: "",
    city: "",
    message: "",
  });
  const [enteredContact, setEnterContact] = useState([]);

  useEffect(() => {
    let storedContact = localStorage.getItem("Contacts");
    storedContact = JSON.parse(storedContact);
    if (enteredContact != null) {
      setEnterContact(storedContact);
    }
  }, [contact]);

  const handleForm = (e) => {
    e.preventDefault();

    let newContact = {
      ...contact,
      id: Math.random(),
    };
    enteredContact.push(newContact);
    localStorage.setItem("Contacts", JSON.stringify(enteredContact));
    setAlertMsg({
      status: true,
      msg: "Data has been Successfully added!",
    });
    setContact({
      name: "",
      email: "",
      city: "",
      message: "",
    });
  };

  //this function will delete contact from list. return all those contacts with the deleted contacts using filter method.
  const deleteContact = (id) => {
    const allContacts = JSON.parse(localStorage.getItem("Contacts"));
    const filteredContacts = allContacts.filter((item) => item.id != id);
    localStorage.setItem("Contacts", JSON.stringify(filteredContacts));
    setEnterContact(filteredContacts);
  };

  //this function will short the description
  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <div className="container">
      {alertMsg.status ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> {alertMsg.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-md-5">
          <h2 className="mt-4">Add New Contact</h2>
          <form className="row w-75 my-5 col-md-4" onSubmit={handleForm}>
            <div className="col-md-12">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
                value={contact.name}
                className="form-control"
                name="name"
                id="name"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                value={contact.email}
                className="form-control"
                id="email"
              />
            </div>
            <div className="col-md-12 mt-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setContact({ ...contact, city: e.target.value })
                }
                value={contact.city}
                name="city"
                id="city"
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                name="message"
                id="message"
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                value={contact.message}
                rows="3"
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary px-4 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-7">
          <h1 className="mt-3 contact-list-heading">Contact List</h1>
          <table className="table my-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Message</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enteredContact.length < 1 ? (
                <tr>
                  <td>
                    <h4>No Data Found</h4>
                  </td>
                </tr>
              ) : (
                enteredContact.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.name}</th>
                      <td>{item.email}</td>
                      <td>{item.city}</td>
                      <td>{truncateString(item.message, 10)}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteContact(item.id);
                          }}
                          className="btn"
                        >
                          <i className="bi bi-trash3 text-danger"></i>
                        </button>
                        <Link to={`/update-contact/${item.id}`}>
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;

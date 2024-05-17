import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateContact() {
  const { id } = useParams();
  const route = useNavigate();
  const [contact, setContact] = useState({});
  useEffect(() => {
    let contacts = JSON.parse(localStorage.getItem("Contacts"));
    let finditem = contacts.find((contact) => contact.id == id);
    setContact(finditem);
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let storedContacts = JSON.parse(localStorage.getItem("Contacts"));
    let filteredArray = storedContacts.filter((contact) => contact.id != id);
    let updatedArray = [...filteredArray, contact];
    localStorage.setItem("Contacts", JSON.stringify(updatedArray));
    route("/");
  };

  return (
    <div className="container">
      <form className="row w-75 my-5 col-md-4" onSubmit={handleUpdate}>
        <div className="col-md-12">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
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
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
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
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
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
  );
}

export default UpdateContact;

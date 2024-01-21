import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddContactMutation,useContactQuery,useUpdateContactMutation } from "../services/contactApi";


const initialState = {
  name: "",
  email: "",
  contact: "",
};


const AddEditUser = () => {
  
  const [addContact] = useAddContactMutation();
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, contact } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();
  const {data}=useContactQuery(id)
  const [updateContact]=useUpdateContactMutation()

  useEffect(() => {
    setEditMode(!!id); // Use !! to convert id to a boolean
    if(data){
      setFormValue({...data})
    }
  }, [id,data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please provide a value for each input field");
    } else {
      try {
        if (!editMode) {
          await addContact(formValue);
          toast.success("Contact Added Successfully");
        } else {
          await updateContact(formValue)
          navigate("/")
          setEditMode(false)
          toast.success("Contact Updated Successfully");
        }

        navigate("/");
      } catch (error) {
        console.error("Error adding/updating contact:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={editMode ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditUser;

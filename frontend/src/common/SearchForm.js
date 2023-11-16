import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ search }) => {
  const [formData, setFormData] = useState({ company: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
    search(formData.company.trim() || undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(formData.company.trim() || undefined);
    setFormData((formData) => ({ company: `${formData.company.trim()}` }));
  };

  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <input
        type="text"
        name="company"
        placeholder="Company"
        className="SearchForm-company"
        onChange={handleChange}
      />
      <button onSubmit={handleSubmit}>Search</button>
    </form>
  );
};

export default SearchForm;

import React, { useState } from "react";
import { CollectUserProfile } from "../../firebase/auth";
// import { CollectUserProfile } from "../../firebase/auth";

function Adminpage() {
  const [formValue, setFormData] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {}
  return (
    <section>
      <div>
        <div className="mb-10">
          <h1>Pelumi</h1>Welcome to the Admin dashboard. You can manage your
          store from this page.
        </div>
        <form onSubmit={handleSubmit} className="mb-10">
          <div>
            <h1>Upload items from here</h1>
            <h6>Item name:</h6>
            <input
              type="text"
              name="Item"
              value={formValue?.email}
              placeholder="Give a descriptive name"
              onChange={handleChange}
            />
          </div>

          <div>
            <h6>description:</h6>
            <input
              type="text"
              name="description"
              value={formValue?.password}
              onChange={handleChange}
              placeholder="Give a description of the item you want to upload"
            />
          </div>

          <div className="flex gap-10">
            <button type="submit">Upload info</button>
          </div>
        </form>
        <button
          onClick={CollectUserProfile}
          className="p-1 rounded  bg-[purple]"
        >
          Get user name
        </button>
        <div>
          <h2 className="font-semibold">OUR NEWSSELLER</h2>
          <p className="text-sm">
            Subcribe to get more useful information about us and to get you
            <span className="text-[red]">15% discount </span>off your next
            purchase
          </p>
        </div>
      </div>
    </section>
  );
}

export default Adminpage;

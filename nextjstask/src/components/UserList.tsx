"use client";

import React, { useReducer, useState, ChangeEvent, FormEvent } from "react";
import { User } from "../app/types";
import UserCard from "./UserCard";

interface State {
  users: User[];
  searchQuery: string;
  sortType: "name" | "company";
}

type Action =
  | { type: "ADD_USERS"; payload: User }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SORT_TYPE"; payload: "name" | "company" };

const initialState: State = {
  users: [],
  searchQuery: "",
  sortType: "name",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SORT_TYPE":
      return { ...state, sortType: action.payload };
    case "ADD_USERS":
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

const UserList: React.FC<{ initialUsers: User[] }> = ({ initialUsers }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    users: initialUsers,
  });

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    company: { name: "", catchPhrase: "", bs: "" },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("company.")) {
      setNewUser((prev) => ({
        ...prev,
        company: { ...prev.company, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("address.")) {
      setNewUser((prev) => ({
        ...prev,
        address: { ...prev.address, [name.split(".")[1]]: value },
      }));
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    const userToAdd: User = {
      ...newUser,
      id: state.users.length + 1,
    };
    dispatch({ type: "ADD_USERS", payload: userToAdd });
    setNewUser({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
      company: { name: "", catchPhrase: "", bs: "" },
    });
  };

  const filteredUsers = state.users?.filter((user) => {
    const lowerCaseQuery = state.searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.company.name.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const sortedUsers = filteredUsers?.sort((a, b) => {
    if (state.sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    if (state.sortType === "company") {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  return (
    <div>
      <form onSubmit={handleAddUser} className="mb-8 px-20">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newUser.phone}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={newUser.website}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            value={newUser.address.street}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="address.suite"
            placeholder="Suite"
            value={newUser.address.suite}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={newUser.address.city}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="address.zipcode"
            placeholder="Zipcode"
            value={newUser.address.zipcode}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="company.name"
            placeholder="Company Name"
            value={newUser.company.name}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="company.catchPhrase"
            placeholder="Catchphrase"
            value={newUser.company.catchPhrase}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            name="company.bs"
            placeholder="Business Specialty (bs)"
            value={newUser.company.bs}
            onChange={handleInputChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 rounded text-white"
        >
          Add User
        </button>
      </form>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="search by name or company"
          value={state.searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
          }
          className="p-2 bg-gray-700 text-white rounded max-w-md mx-auto w-full text-center"
        />
      </div>

      <div className="mb-4 text-center">
        <label htmlFor="sort" className="mr-2 text-lg">
          Sort by:
        </label>
        <select
          id="sort"
          value={state.sortType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch({
              type: "SET_SORT_TYPE",
              payload: e.target.value as "name" | "company",
            })
          }
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="name">Name</option>
          <option value="company">Company</option>
        </select>
      </div>

      {sortedUsers?.length === 0 ? (
        <div className="text-center text-gray-400">No users found...</div>
      ) : (
        <UserCard users={sortedUsers} />
      )}
    </div>
  );
};

export default UserList;

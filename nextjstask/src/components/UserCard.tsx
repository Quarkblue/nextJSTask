import React from "react";
import { User } from "../app/types";
import Link from "next/link";

export default function UserCard(props: { users: User[] }) {
  const { users } = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto px-6">
      {users?.map((user) => (
        <div
          key={user.id}
          className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-3xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-400 mb-4">@{user.username}</p>
          <div className="text-left">
            <p className="text-gray-200 mb-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-200 mb-1">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-200 mb-1">
              <span className="font-semibold">Website:</span>
              <a
                href={`http://${user.website}`}
                className="text-blue-400 underline"
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </p>
            <p className="text-gray-200 mb-1">
              <span className="font-semibold">Address:</span>
              {" " +
                user.address.street +
                ", " +
                user.address.suite +
                ", " +
                user.address.city +
                ", " +
                user.address.zipcode}
            </p>
            <div className="my-4">
              <h3 className="text-xl font-semibold">Company</h3>
              <p className="text-gray-400">{user.company.name}</p>
              <p className="text-gray-500 italic">
                "{user.company.catchPhrase}"
              </p>
              <p className="text-gray-400">{user.company.bs}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

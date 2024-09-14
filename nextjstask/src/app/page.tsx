import { User } from "./types";
import UserList from "@/components/UserList";

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

const Home = async () => {
  const users = await fetchUsers();
  return (
    <div className="min-h-screen bg-grey-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Cards</h1>
      <UserList initialUsers={users} />
    </div>
  );
};

export default Home;

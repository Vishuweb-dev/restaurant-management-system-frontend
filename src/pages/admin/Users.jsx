import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${deleteTarget._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't delete that user.");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <p className="text-sm font-medium text-rust mb-1">Accounts</p>
      <h1 className="font-display text-3xl text-ink mb-8">Guests &amp; users</h1>

      {error && (
        <p className="bg-rust/10 text-rust-dark text-sm px-4 py-2.5 rounded-xl mb-5">{error}</p>
      )}

      <div className="bg-white rounded-2xl border border-ink/10 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="text-left text-ink/40 border-b border-ink/10">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Registered</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-4 text-ink">{u.name}</td>
                <td className="px-6 py-4 text-ink/60">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      u.role === "admin" ? "bg-rust/10 text-rust-dark" : "bg-ink/8 text-ink/60"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-ink/50">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setDeleteTarget(u)}
                    className="text-sm font-medium text-rust hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-ink/40 py-12">No users yet.</p>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete user"
        message={`This removes ${deleteTarget?.name}'s account for good. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Users;

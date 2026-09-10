import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const StatBlock = ({ label, value, accent }) => (
  <div className="bg-white rounded-2xl border border-ink/10 p-7">
    <p className="text-sm text-ink/50">{label}</p>
    <p className={`font-display text-5xl mt-3 ${accent}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load the dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-rust">{error}</p>;

  return (
    <div>
      <p className="text-sm font-medium text-rust mb-1">Kitchen overview</p>
      <h1 className="font-display text-3xl text-ink mb-8">How today's running</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatBlock label="Menu items live" value={stats.totalMenuItems} accent="text-ink" />
        <StatBlock label="Registered guests" value={stats.totalUsers} accent="text-rust" />
        <StatBlock label="Orders placed" value={stats.totalOrders} accent="text-sage-dark" />
      </div>

      <p className="text-xs text-ink/35 mt-5">
        Orders is a placeholder until an order-taking module is built — it isn't wired to real data yet.
      </p>
    </div>
  );
};

export default Dashboard;

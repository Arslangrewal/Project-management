export default function UserStats({
  users,
}) {
  const superAdmins = users.filter(
  (u) => u.role === "SUPER_ADMIN"
).length;

const admins = users.filter(
  (u) => u.role === "ADMIN"
).length;

const editors = users.filter(
  (u) => u.role === "EDITOR"
).length;

  

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h3>Total Users</h3>
        <p className="text-3xl font-bold">
          {users.length}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h3>Super Admins</h3>
        <p className="text-3xl font-bold">
          {superAdmins}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h3>Admins</h3>
        <p className="text-3xl font-bold">
          {admins}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h3>Editors</h3>
        <p className="text-3xl font-bold">
          {editors}
        </p>
      </div>
    </div>
  );
}
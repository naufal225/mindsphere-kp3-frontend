export default function Page() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0F172A]">Kelola Data User</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="px-3 py-2">Nama</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { n: "Admin Utama", e: "admin@example.com", r: "Admin", s: "Aktif" },
              { n: "Sinta", e: "sinta@demo.com", r: "Editor", s: "Aktif" },
              { n: "Bima", e: "bima@demo.com", r: "Viewer", s: "Nonaktif" },
            ].map((u) => (
              <tr key={u.e} className="text-[#0F172A]">
                <td className="px-3 py-2">{u.n}</td>
                <td className="px-3 py-2">{u.e}</td>
                <td className="px-3 py-2">{u.r}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    u.s === "Aktif" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {u.s}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

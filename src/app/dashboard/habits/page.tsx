export default function Page() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0F172A]">Kelola Data Habits</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="px-3 py-2">Nama Habit</th>
              <th className="px-3 py-2">Kategori</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { n: "Baca 10 menit", k: "Belajar", t: "Harian", s: "Aktif" },
              { n: "Jogging", k: "Kesehatan", t: "Harian", s: "Aktif" },
              { n: "Meditasi", k: "Mindfulness", t: "Harian", s: "Draft" },
            ].map((h) => (
              <tr key={h.n} className="text-[#0F172A]">
                <td className="px-3 py-2">{h.n}</td>
                <td className="px-3 py-2">{h.k}</td>
                <td className="px-3 py-2">{h.t}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    h.s === "Aktif" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {h.s}
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

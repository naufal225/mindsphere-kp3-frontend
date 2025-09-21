export default function Page() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Jumlah Siswa", v: "1.240", accent: "bg-primary-gradient" },
          { t: "Jumlah Guru", v: "58", accent: "bg-secondary-gradient" },
          { t: "Jumlah Orang Tua", v: "730", accent: "bg-accent-gradient" },
        ].map((m) => (
          <div
            key={m.t}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-sm text-slate-500">{m.t}</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-3xl font-semibold text-[#0F172A]">{m.v}</div>
              <div className={`h-10 w-10 rounded-xl ${m.accent} opacity-80`} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0F172A]">Ringkasan Aktivitas</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "10 siswa baru mendaftar",
            "2 guru ditambahkan ke kelas",
            "5 orang tua aktif di minggu ini",
          ].map((t) => (
            <li key={t} className="rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <div className="font-semibold text-[#0F172A]">{t}</div>
              <div className="text-xs text-slate-500">baru saja</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

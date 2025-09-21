export default function Page() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Total User</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-3xl font-semibold text-[#0F172A]">1,284</div>
            <div className="h-10 w-10 rounded-xl bg-primary-gradient opacity-80" />
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">+3% mingguan</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Total Challenges</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-3xl font-semibold text-[#0F172A]">76</div>
            <div className="h-10 w-10 rounded-xl bg-secondary-gradient opacity-80" />
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">+11% bulanan</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Kebiasaan Aktif</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-3xl font-semibold text-[#0F172A]">532</div>
            <div className="h-10 w-10 rounded-xl bg-accent-gradient opacity-80" />
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">+7% mingguan</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Kelas Berjalan</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-3xl font-semibold text-[#0F172A]">12</div>
            <div className="h-10 w-10 rounded-xl bg-primary-gradient opacity-80" />
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">stabil</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0F172A]">Performa Umum</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">Baik</span>
          </div>
          <div className="mt-6 space-y-5">
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-2/3 bg-secondary-gradient" />
            </div>
            <p className="text-sm text-slate-500">Rata-rata penyelesaian challenges meningkat dibanding periode sebelumnya.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0F172A]">Aktivitas Terbaru</h2>
          <ul className="mt-5 space-y-4">
            {["User baru terdaftar", "Challenge baru dipublikasikan", "Laporan agregat diekspor"].map((t) => (
              <li key={t} className="rounded-xl bg-slate-50 px-4 py-3">
                <div className="text-sm font-semibold text-[#0F172A]">{t}</div>
                <div className="text-xs text-indigo-500">barusan</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

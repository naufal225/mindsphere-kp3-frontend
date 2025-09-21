export default function Page() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#0F172A]">Kelola Data Challenges</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-slate-100 p-4">
            <div className="text-sm font-semibold text-[#0F172A]">Challenge #{i}</div>
            <div className="mt-1 text-xs text-slate-500">Durasi 7 hari • Poin 100</div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-indigo-200 hover:text-indigo-600">Edit</button>
              <button className="rounded-lg bg-primary-gradient px-3 py-1 text-xs font-semibold text-white">Publikasi</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Background Blur Effects */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-teal-100 opacity-30 blur-3xl" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32">
        {/* Left Content */}
        <div className="flex-1">
    
          <h1 className="max-w-3xl text-6xl font-bold leading-tight tracking-tight text-slate-900">
            Report civic issues.
            <br />
            Track resolution.
            <br />
            <span className="text-teal-600">Improve your city.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Submit municipal complaints in minutes and help local
            authorities respond faster. From potholes and drainage
            issues to streetlights and waste management, Civic
            Intelligence keeps citizens informed throughout the
            resolution process.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/report"
              className="rounded-xl bg-teal-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-teal-700"
            >
              Report an Issue
            </a>

            <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium shadow-sm transition hover:bg-slate-50">
              How It Works
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-300" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-400" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-500" />
              <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-600" />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                10,000+
              </p>
              <p className="text-sm text-slate-500">
                Citizens improving their communities
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Dashboard Preview */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                Civic Dashboard
              </h3>

              <p className="text-sm text-slate-500">
                Live complaint intelligence
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">
                  Road Damage
                </div>

                <div className="text-3xl font-bold text-slate-900">
                  124
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">
                  Water Supply
                </div>

                <div className="text-3xl font-bold text-slate-900">
                  87
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">
                  Street Lighting
                </div>

                <div className="text-3xl font-bold text-slate-900">
                  42
                </div>
              </div>

              <div className="rounded-xl border-l-4 border-teal-600 bg-teal-50 p-4">
                <div className="text-sm text-slate-600">
                  Active Issues
                </div>

                <div className="text-4xl font-bold text-teal-700">
                  253
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-900 p-4 text-white">
              <div className="text-sm text-slate-300">
                Resolution Rate
              </div>

              <div className="mt-1 text-2xl font-bold">
                92%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
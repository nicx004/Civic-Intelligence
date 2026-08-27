import Link from "next/link";
import { auth } from "@/auth";

export default async function TrackPage() {
  const session = await auth();

  return (
    <main className="app-shell py-16">
      <div className="mx-auto max-w-4xl px-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            Track a Report
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Follow your complaint from submission to resolution.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Sign in to view the complaints you have submitted, their current
            status, department assignment, and available resolution details.
          </p>

          {session?.user ? (
            <Link
              href="/my-reports"
              className="mt-8 inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
            >
              View My Reports
            </Link>
          ) : (
            <Link
              href="/api/auth/signin?callbackUrl=/track"
              className="mt-8 inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
            >
              Sign In to Track Reports
            </Link>
          )}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">01</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Submitted
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your complaint has been recorded and assigned a reference
              number.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">02</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Routed
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The complaint is analyzed and routed toward the responsible
              department.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">03</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Resolution
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow the status of the complaint as it moves through the
              resolution process.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
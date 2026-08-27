import Link from "next/link";
import { auth, signIn } from "@/auth";

export default async function TrackPage() {
  const session = await auth();

  async function handleSignIn() {
    "use server";

    await signIn("google", {
      redirectTo: "/track",
    });
  }

  return (
    <main className="app-shell flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl">
        {session?.user ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                Track a Report
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Follow your complaint from submission to resolution.
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                View your submitted complaints, current status, department
                assignment, and available resolution information.
              </p>

              <Link
                href="/my-reports"
                className="mt-8 inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
              >
                View My Reports
              </Link>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
              <svg
                className="h-8 w-8 text-teal-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.5 4.5L15 19"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.5H9a5 5 0 01-5-5V7"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3l-3 4 3 4"
                />
              </svg>
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-600">
              Track Your Complaint
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Sign in to view your reports.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600">
              Your complaint analysis and resolution progress are available
              securely through your account. Please sign in to view the
              complaints you have submitted.
            </p>

            <form action={handleSignIn}>
              <button
                type="submit"
                className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-teal-700"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 01-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 21.96c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0012 21.96z"
                  />
                  <path
                    fill="currentColor"
                    d="M6.54 14.05A5.84 5.84 0 016.24 12c0-.71.12-1.4.3-2.05V7.42H3.3A9.96 9.96 0 002.04 12c0 1.65.4 3.21 1.26 4.58l3.24-2.53z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.92c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 2.99 14.63 2.04 12 2.04A9.74 9.74 0 003.3 7.42l3.24 2.53C7.31 7.64 9.46 5.92 12 5.92z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            <p className="mt-5 text-xs text-slate-400">
              Your reports are only visible to your authenticated account.
            </p>
          </section>
        )}

        <section className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">01</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Submitted
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your complaint is recorded and assigned a unique reference
              number.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">02</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Analyzed & Routed
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The complaint is analyzed and routed toward the responsible
              municipal department.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-teal-600">03</p>
            <h2 className="mt-2 font-semibold text-slate-900">
              Resolution
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Monitor the complaint as it progresses through the resolution
              process.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
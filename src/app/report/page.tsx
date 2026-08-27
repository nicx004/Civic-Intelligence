import { auth, signIn } from "@/auth";
import ComplaintForm from "@/components/complaint/ComplaintForm";

export default async function ReportPage() {
  const session = await auth();

  if (!session?.user) {
    async function handleSignIn() {
      "use server";

      await signIn("google", {
        redirectTo: "/report",
      });
    }

    return (
      <main className="app-shell flex min-h-[calc(100vh-6rem)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50">
              <svg
                className="h-8 w-8 text-teal-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 17l5-5-5-5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H3"
                />
              </svg>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
              Sign in to report an issue
            </h1>

            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Please sign in before submitting a civic complaint. Your account
              allows us to securely associate your report with you and lets you
              track its progress later.
            </p>

            <form action={handleSignIn} className="mt-8">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-teal-700"
              >
                Continue with Google
              </button>
            </form>

            <p className="mt-5 text-xs text-slate-500">
              After signing in, you will be returned to the report form.
            </p>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <ComplaintForm />
    </main>
  );
}
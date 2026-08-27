import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="app-shell py-16">
      <div className="mx-auto max-w-5xl px-6">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            About Civic Intelligence
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Making civic complaint routing more intelligent.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Civic Intelligence is a civic complaint management platform
            designed to connect citizens with the municipal departments
            responsible for their issues.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              For citizens
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Submit civic complaints, receive a reference number, and follow
              their progress through the resolution process.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              For authorities
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Review complaints through a centralized dashboard with routing
              information, department assignments, and complaint analytics.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Intelligent routing
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Combine semantic complaint understanding with structured civic
              knowledge to identify responsible departments.
            </p>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Built around a clear separation of responsibilities
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Complaint data is maintained in PostgreSQL as the platform's
            central source of truth. The GraphRAG processing layer enriches
            complaints using entity extraction, ontology normalization,
            knowledge-graph routing, and semantic retrieval. The resulting
            routing information is persisted back into the database for the
            citizen and administrative interfaces.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {["Next.js", "PostgreSQL", "GraphRAG", "Neo4j", "Qdrant"].map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </section>

        <div className="mt-10">
          <Link
            href="/report"
            className="inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
          >
            Report an Issue
          </Link>
        </div>
      </div>
    </main>
  );
}
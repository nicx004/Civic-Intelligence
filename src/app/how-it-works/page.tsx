import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Submit your complaint",
    description:
      "Describe the civic issue, provide its location, select the issue category, and optionally attach supporting evidence.",
  },
  {
    number: "02",
    title: "Complaint is securely recorded",
    description:
      "Your complaint is stored in the civic platform and assigned a unique reference number so its progress can be tracked.",
  },
  {
    number: "03",
    title: "Issue is understood",
    description:
      "The system extracts important entities such as assets, issue types, locations, and keywords from the complaint.",
  },
  {
    number: "04",
    title: "Civic knowledge is matched",
    description:
      "Extracted information is normalized against a structured civic ontology representing Chandigarh's departments, assets, responsibilities, and issue types.",
  },
  {
    number: "05",
    title: "Responsible department is identified",
    description:
      "The knowledge graph determines which municipal department is responsible for the reported issue.",
  },
  {
    number: "06",
    title: "Similar complaints provide context",
    description:
      "Semantic retrieval finds related complaints that can provide additional context for municipal review.",
  },
  {
    number: "07",
    title: "You track the resolution",
    description:
      "The resulting routing information and complaint status are stored in the platform so progress can be monitored.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="app-shell py-16">
      <div className="mx-auto max-w-6xl px-6">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            How Civic Intelligence Works
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            From complaint to the right department.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Civic Intelligence combines structured civic knowledge with
            semantic understanding to help route complaints to the department
            responsible for resolving them.
          </p>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                  {step.number}
                </span>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h2>

                  <p className="mt-2 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-3xl bg-slate-900 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">
            The principle
          </p>

          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            The language model understands the complaint.
            <br />
            The civic knowledge graph determines responsibility.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            This separation keeps complaint understanding and departmental
            responsibility distinct, making the routing process more
            explainable and grounded in structured civic knowledge.
          </p>

          <Link
            href="/report"
            className="mt-7 inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            Report an Issue
          </Link>
        </section>
      </div>
    </main>
  );
}
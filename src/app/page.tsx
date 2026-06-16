import ComplaintForm from "@/components/complaint/ComplaintForm";

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="portal-header">
        <h1 className="portal-header__brand">Civic Intelligence</h1>
        <p className="portal-header__description">
          Official complaint intake for municipal services
        </p>
      </section>

      <ComplaintForm />
    </main>
  );
}

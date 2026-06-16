import ComplaintForm from "@/components/complaint/ComplaintForm";

export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="portal-header" aria-label="Civic Intelligence header">
        <div className="portal-header__emblem" aria-hidden="true">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="National emblem of India"
          />
        </div>

        <div className="portal-header__copy">
          <h1 className="portal-header__brand">Civic Intelligence</h1>
          <p className="portal-header__description">
            Official complaint intake for municipal services
          </p>
        </div>
      </section>

      <ComplaintForm />
    </main>
  );
}

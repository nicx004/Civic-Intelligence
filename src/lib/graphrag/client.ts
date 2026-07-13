const GRAPHRAG_URL =
  process.env.GRAPHRAG_API_URL ?? "http://localhost:8000";

export async function getOntologyDepartments() {
  const response = await fetch(
    `${GRAPHRAG_URL}/ontology/departments`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ontology departments.");
  }

  const data = await response.json();

  return data.departments;
}
export interface OntologyDepartment {
  id: string;
  name: string;
  assets: string[];
  issue_types: string[];
}

const GRAPHRAG_URL =
  process.env.GRAPHRAG_API_URL ?? "http://localhost:8000";

export async function getOntologyDepartments(): Promise<OntologyDepartment[]> {
  const response = await fetch(
    `${GRAPHRAG_URL}/ontology/departments`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ontology departments.");
  }

  const data: { departments: OntologyDepartment[] } =
    await response.json();

  return data.departments;
}
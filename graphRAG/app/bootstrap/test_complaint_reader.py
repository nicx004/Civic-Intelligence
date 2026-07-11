from pprint import pprint

from app.ingestion.complaint_reader import ComplaintReader


def main():
    reader = ComplaintReader()

    complaint_id = "cmqrp1kxz0001qgtqhpxfd0c2"

    complaint = reader.get_by_id(complaint_id)

    if complaint is None:
        print(f"No complaint found with ID: {complaint_id}")
        return

    print("\nComplaint successfully loaded from PostgreSQL:\n")
    pprint(complaint.model_dump())


if __name__ == "__main__":
    main()
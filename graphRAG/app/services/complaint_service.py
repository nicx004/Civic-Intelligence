from sqlalchemy import text

from app.database.postgres import SessionLocal
from app.models.complaint import Complaint


class ComplaintService:

    @staticmethod
    def get_complaint(report_id: str) -> Complaint | None:

        with SessionLocal() as session:

            result = session.execute(
                text(
                    """
                    SELECT
                        id,
                        title,
                        description,
                        category,
                        status,
                        ward,
                        locality,
                        landmark,
                        phone,
                        latitude,
                        longitude,
                        "userId",
                        "createdAt",
                        "updatedAt"
                    FROM "Report"
                    WHERE id = :report_id
                    """
                ),
                {"report_id": report_id},
            ).mappings().first()

            if result is None:
                return None

            return Complaint(
                id=result["id"],
                title=result["title"],
                description=result["description"],
                category=result["category"],
                status=result["status"],
                ward=result["ward"],
                locality=result["locality"],
                landmark=result["landmark"],
                phone=result["phone"],
                latitude=result["latitude"],
                longitude=result["longitude"],
                user_id=result["userId"],
                created_at=result["createdAt"],
                updated_at=result["updatedAt"],
            )
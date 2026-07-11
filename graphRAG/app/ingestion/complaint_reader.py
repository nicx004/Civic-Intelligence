from typing import Optional

from sqlalchemy import text

from app.database.postgres import SessionLocal
from app.models.complaint import Complaint


class ComplaintReader:
    def get_by_id(self, complaint_id: str) -> Optional[Complaint]:
        with SessionLocal() as session:
            row = session.execute(
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
                    WHERE id = :complaint_id
                    """
                ),
                {"complaint_id": complaint_id},
            ).mappings().first()

        if row is None:
            return None

        return Complaint(
            id=row["id"],
            title=row["title"],
            description=row["description"],
            category=row["category"],
            status=row["status"],
            ward=row["ward"],
            locality=row["locality"],
            landmark=row["landmark"],
            phone=row["phone"],
            latitude=row["latitude"],
            longitude=row["longitude"],
            user_id=row["userId"],
            created_at=row["createdAt"],
            updated_at=row["updatedAt"],
        )
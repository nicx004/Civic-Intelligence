from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Complaint(BaseModel):
    id: str

    title: str
    description: str

    category: str
    status: str

    ward: str
    locality: str
    landmark: str

    phone: Optional[str] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    user_id: str

    created_at: datetime
    updated_at: datetime
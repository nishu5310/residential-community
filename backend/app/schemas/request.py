from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ServiceRequestCreate(BaseModel):
    resident_id: Optional[UUID] = None
    service_id: UUID
    flat_number: str = Field(..., min_length=1, max_length=80)
    tower: str = Field(..., min_length=1, max_length=80)
    description: str = Field(..., min_length=1)
    preferred_date: Optional[date] = None
    preferred_time: Optional[str] = None
    urgency: str = "NORMAL"
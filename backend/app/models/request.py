import uuid
from datetime import date, datetime

from sqlalchemy import Column, Date, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID

from app.db.session import Base


class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    request_number = Column(
        String(40),
        unique=True,
        nullable=True
    )

    resident_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True
    )

    service_id = Column(
        UUID(as_uuid=True),
        ForeignKey("services.id"),
        nullable=True
    )

    assigned_provider_id = Column(
        UUID(as_uuid=True),
        ForeignKey("providers.id"),
        nullable=True
    )

    flat_number = Column(String(80))
    tower = Column(String(80))
    description = Column(Text)
    preferred_date = Column(Date)
    preferred_time = Column(String(50))
    urgency = Column(String(30))

    status = Column(
        String(40),
        nullable=False,
        default="SUBMITTED"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
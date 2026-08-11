from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.request import ServiceRequest
from app.schemas.request import ServiceRequestCreate

router = APIRouter(
    prefix="/service-requests",
    tags=["service requests"]
)


@router.post("")
def create_request(
    request: ServiceRequestCreate,
    db: Session = Depends(get_db)
):
    # Generate next MI PASS request number
    last_request = (
        db.query(ServiceRequest)
        .order_by(ServiceRequest.created_at.desc())
        .first()
    )

    if last_request and last_request.request_number:
        try:
            last_number = int(
                last_request.request_number.split("-")[-1]
            )
        except ValueError:
            last_number = 0
    else:
        last_number = 0

    request_number = f"MIPASS-2026-{last_number + 1:06d}"

    # Create database record
    service_request = ServiceRequest(
        request_number=request_number,
        resident_id=request.resident_id,
        service_id=request.service_id,
        flat_number=request.flat_number,
        tower=request.tower,
        description=request.description,
        preferred_date=request.preferred_date,
        preferred_time=request.preferred_time,
        urgency=request.urgency,
        status="SUBMITTED"
    )

    db.add(service_request)
    db.commit()
    db.refresh(service_request)

    return {
        "request_id": service_request.request_number,
        "status": service_request.status,
        "message": "Service request submitted successfully"
    }
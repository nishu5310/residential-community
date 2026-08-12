from fastapi import APIRouter, Depends
from app.api.deps import get_current_user, CurrentUser

router = APIRouter(prefix="/notices", tags=["notices"])

NOTICES_DATA = [
    {
        "id": "not-1",
        "title": "Scheduled Overhead Water Tank Cleaning",
        "category": "WATER",
        "priority": "URGENT",
        "date": "12 Aug 2026",
        "description": "Overhead tank flushing scheduled for Tomorrow · 13 Aug 2026 · 09:00 AM – 02:00 PM. Supply will remain paused.",
        "issuer": "RWA Maintenance Office"
    },
    {
        "id": "not-2",
        "title": "New Automated Boom Barrier RFID Tags Available",
        "category": "SECURITY",
        "priority": "IMPORTANT",
        "date": "08 Aug 2026",
        "description": "High-speed vehicle RFID tags are available at Gate 1 office. Cost ₹250 per vehicle tag.",
        "issuer": "Estate Security Desk"
    }
]

@router.get("")
def list_notices(current_user: CurrentUser = Depends(get_current_user)):
    return {
        "society_id": current_user.society_id,
        "notices": NOTICES_DATA
    }

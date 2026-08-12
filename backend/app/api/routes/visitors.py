from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import random
import string
from app.api.deps import get_current_user, CurrentUser

router = APIRouter(prefix="/visitors", tags=["visitors"])

VISITOR_DB = {}

class CreateVisitorPassRequest(BaseModel):
    visitorName: str
    type: str
    vehicleNumber: Optional[str] = "N/A"

@router.get("")
def list_visitor_passes(current_user: CurrentUser = Depends(get_current_user)):
    user_passes = VISITOR_DB.get(f"{current_user.society_id}:{current_user.unit_id}", [])
    return {
        "society_id": current_user.society_id,
        "unit_id": current_user.unit_id,
        "passes": user_passes
    }

@router.post("")
def create_visitor_pass(payload: CreateVisitorPassRequest, current_user: CurrentUser = Depends(get_current_user)):
    chars = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    pass_code = f"PASS-2026-{chars}"
    
    new_pass = {
        "id": f"vis-{random.randint(100,999)}",
        "visitorName": payload.visitorName,
        "type": payload.type,
        "vehicleNumber": payload.vehicleNumber or "N/A",
        "entryPassCode": pass_code,
        "status": "Pre-Approved",
        "society_id": current_user.society_id,
        "unit_id": current_user.unit_id
    }
    
    key = f"{current_user.society_id}:{current_user.unit_id}"
    if key not in VISITOR_DB:
        VISITOR_DB[key] = []
    VISITOR_DB[key].append(new_pass)

    return {"status": "created", "pass": new_pass}

@router.post("/verify")
def verify_gate_pass(pass_code: str, current_user: CurrentUser = Depends(get_current_user)):
    # Gatekeeper verification
    for key, passes in VISITOR_DB.items():
        for p in passes:
            if p["entryPassCode"].upper() == pass_code.upper() and p["status"] == "Pre-Approved":
                return {
                    "valid": True,
                    "visitorName": p["visitorName"],
                    "unit": p["unit_id"],
                    "status": "Pre-Approved"
                }
    return {"valid": False, "message": "Invalid or expired pass code"}

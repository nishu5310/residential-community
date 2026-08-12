from fastapi import Header, HTTPException, status, Depends
from typing import Optional

class CurrentUser:
    def __init__(self, user_id: str, society_id: str, unit_id: str, role: str):
        self.user_id = user_id
        self.society_id = society_id
        self.unit_id = unit_id
        self.role = role

def get_current_user(
    x_society_id: Optional[str] = Header("grand-estate", alias="X-Society-ID"),
    x_user_role: Optional[str] = Header("resident", alias="X-User-Role"),
    x_user_id: Optional[str] = Header("usr-204", alias="X-User-ID"),
    x_unit_id: Optional[str] = Header("Apt 204", alias="X-Unit-ID")
) -> CurrentUser:
    if not x_society_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="X-Society-ID header is required for multi-tenant isolation."
        )
    return CurrentUser(
        user_id=x_user_id or "usr-204",
        society_id=x_society_id,
        unit_id=x_unit_id or "Apt 204",
        role=x_user_role or "resident"
    )

def require_role(allowed_roles: list[str]):
    def role_checker(current_user: CurrentUser = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User with role '{current_user.role}' is not authorized. Allowed: {allowed_roles}"
            )
        return current_user
    return role_checker

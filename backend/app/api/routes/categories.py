from fastapi import APIRouter
router=APIRouter(prefix="/categories",tags=["categories"])
@router.get("")
def categories():
    return {"categories":["Home Services","Healthcare","Automotive","Professional","Emergency","Technology","Education","Food & Dining","Shopping","Entertainment","Hotels & Stay","Lifestyle"]}

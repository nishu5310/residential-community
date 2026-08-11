from fastapi import APIRouter
router=APIRouter(prefix="/providers",tags=["providers"])
@router.get("")
def providers():
    return {"providers":[],"rule":"Only AUTHORIZED providers can receive service requests."}

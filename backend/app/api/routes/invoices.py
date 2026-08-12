from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user, CurrentUser

router = APIRouter(prefix="/invoices", tags=["invoices"])

# In-memory invoice store scoped by society_id
INVOICE_DB = {
    "grand-estate": [
        {
            "id": "INV-2026-0801",
            "title": "August 2026 Society Maintenance Dues",
            "amount": 3400,
            "billingPeriod": "August 2026",
            "dueDate": "15 Aug 2026",
            "status": "Pending",
            "breakdown": {
                "baseAmount": 3200,
                "dgBackup": 300,
                "discount": -100
            }
        },
        {
            "id": "INV-2026-0701",
            "title": "July 2026 Society Maintenance Dues",
            "amount": 3200,
            "billingPeriod": "July 2026",
            "dueDate": "15 Jul 2026",
            "status": "Paid",
            "breakdown": {
                "baseAmount": 3200,
                "dgBackup": 0,
                "discount": 0
            }
        }
    ]
}

@router.get("")
def list_invoices(current_user: CurrentUser = Depends(get_current_user)):
    user_invoices = INVOICE_DB.get(current_user.society_id, [])
    return {
        "society_id": current_user.society_id,
        "unit_id": current_user.unit_id,
        "invoices": user_invoices
    }

@router.post("/{invoice_id}/pay")
def pay_invoice(invoice_id: str, current_user: CurrentUser = Depends(get_current_user)):
    user_invoices = INVOICE_DB.get(current_user.society_id, [])
    for inv in user_invoices:
        if inv["id"] == invoice_id:
            inv["status"] = "Paid"
            receipt_no = f"RCP-{invoice_id.replace('INV-', '')}"
            return {
                "status": "success",
                "message": "Payment verified and recorded on ledger.",
                "receipt_number": receipt_no,
                "paid_amount": inv["amount"],
                "unit": current_user.unit_id
            }
    raise HTTPException(status_code=404, detail="Invoice not found")

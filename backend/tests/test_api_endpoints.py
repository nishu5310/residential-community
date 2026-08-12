import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200

def test_list_invoices_multi_tenant():
    response = client.get(
        "/api/invoices",
        headers={
            "X-Society-ID": "grand-estate",
            "X-User-Role": "resident",
            "X-User-ID": "usr-204"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["society_id"] == "grand-estate"
    assert len(data["invoices"]) > 0

def test_pay_invoice():
    response = client.post(
        "/api/invoices/INV-2026-0801/pay",
        headers={
            "X-Society-ID": "grand-estate",
            "X-User-Role": "resident"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "receipt_number" in data

def test_create_and_verify_visitor_pass():
    # Create pass
    create_res = client.post(
        "/api/visitors",
        json={"visitorName": "Rohit Verma", "type": "Guest", "vehicleNumber": "DL 02 CD 5678"},
        headers={"X-Society-ID": "grand-estate", "X-User-ID": "usr-204", "X-Unit-ID": "Apt 204"}
    )
    assert create_res.status_code == 200
    pass_data = create_res.json()["pass"]
    token = pass_data["entryPassCode"]

    # Verify pass
    verify_res = client.post(
        f"/api/visitors/verify?pass_code={token}",
        headers={"X-Society-ID": "grand-estate", "X-User-Role": "security"}
    )
    assert verify_res.status_code == 200
    assert verify_res.json()["valid"] == True

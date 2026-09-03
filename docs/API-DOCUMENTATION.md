# API Documentation — Reset Men Salon

## 1. REST Endpoints

### `GET /api/health`
Checks server uptime, CMS connectivity status, and environment readiness.
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-09-03T17:35:00.000Z",
    "version": "1.0.0",
    "cms": "mock"
  }
  ```

---

### `POST /api/contact`
Receives customer inquiries and consultation requests.
- **Payload**:
  ```json
  {
    "name": "Alex Carter",
    "email": "alex@example.com",
    "phone": "+971500000000",
    "service": "japanese-head-spa",
    "message": "Inquiry regarding signature scalp therapy."
  }
  ```
- **Responses**:
  - `200 OK`: `{"success": true, "message": "Inquiry received. Concierge will contact you shortly."}`
  - `400 Bad Request`: Validation error object.
  - `429 Too Many Requests`: Rate limit exceeded.

---

### `POST /api/booking`
Dispatches structured booking intent to the salon concierge.
- **Payload**:
  ```json
  {
    "serviceSlug": "signature-haircut",
    "preferredDate": "2026-09-10",
    "preferredTime": "14:00",
    "customerName": "James Miller",
    "customerPhone": "+971501234567",
    "channel": "whatsapp"
  }
  ```
- **Responses**:
  - `200 OK`: `{"success": true, "redirectUrl": "https://wa.me/971581021540?text=..."}`

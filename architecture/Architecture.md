# System Architecture

## Version 1 Architecture

Citizen
↓
Complaint Intake
↓
Validation Agent
↓
Complaint Structuring Agent
↓
Routing Engine
↓
Jurisdiction Resolution
↓
Ticket Generator
↓
Citizen Response

---

## Stage 1: Complaint Intake

Input:

- Complaint Text
- Photo (Optional)
- GPS Location (Optional)
- Ward / Zone (Optional if GPS is captured)

Example:

"Road flooded near Whitefield Metro Station. Streetlights are not working."

---

## Stage 2: Validation Agent

Purpose:

Determine whether complaint contains sufficient information.

Checks:

- Location Available?
- Issue Described?
- Supporting Evidence Available?
- If ward is unknown, can GPS be used to resolve the complaint location?

Output:

{
  "is_complete": false,
  "missing": [
    "location"
  ]
}

---

## Stage 3: Complaint Structuring

Input:

Unstructured Complaint

Output:

{
  "issues": [
    "Flooding",
    "Streetlight Failure"
  ],
  "location": "Whitefield Metro Station",
  "severity": "High"
}

---

## Stage 4: Routing Engine

Issue → Department Mapping

Examples:

Flooding → Drainage

Streetlight Failure → Electrical

Garbage Overflow → Sanitation

Traffic Congestion → Traffic

---

## Stage 5: Jurisdiction Resolution

Location:

Whitefield Metro Station

If the citizen does not know the ward or zone:

- They tap the GPS icon inside the ward / zone field
- The browser requests location permission
- The app captures coordinates for the complaint site
- The backend or routing service reverse-geocodes the coordinates into the correct ward / zone

↓

Ward: 84

↓

Responsible Department Units

---

## Stage 6: Ticket Generation

Output:

{
  "ticket_id": "CI-001",
  "departments": [
    "Drainage",
    "Electrical"
  ],
  "priority": "High"
}

---

## Stage 7: Citizen Response

Citizen receives:

- Ticket ID
- Assigned Departments
- Priority
- Expected Resolution TimeA
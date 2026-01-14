#!/usr/bin/env python3
import os
import json
from datetime import datetime
from linkedin_api import Linkedin

# ✅ PON AQUÍ tu PUBLIC_ID real (la parte después de /in/ en tu URL)
# Ejemplo: https://www.linkedin.com/in/cesar-reyes-123456789/  -> "cesar-reyes-123456789"
PUBLIC_ID = "cesar-reyes-8a60622b2"


def safe_str(x):
    return "" if x is None else str(x)

def main():
    user = os.getenv("LINKEDIN_USERNAME")
    pwd = os.getenv("LINKEDIN_PASSWORD")

    if not user or not pwd:
        raise SystemExit("Missing LINKEDIN_USERNAME / LINKEDIN_PASSWORD env vars")

    api = Linkedin(user, pwd)

    profile = api.get_profile(PUBLIC_ID)

    try:
        skills = api.get_profile_skills(PUBLIC_ID) or []
    except Exception:
        skills = []

    try:
        certifications = api.get_profile_certifications(PUBLIC_ID) or []
    except Exception:
        certifications = []

    out = {
        "firstName": safe_str(profile.get("firstName")),
        "lastName": safe_str(profile.get("lastName")),
        "headline": safe_str(profile.get("headline")),
        "location": safe_str(profile.get("geoLocationName") or profile.get("locationName") or ""),
        "summary": safe_str(profile.get("summary")),
        "publicProfileUrl": safe_str(profile.get("public_id") and f"https://www.linkedin.com/in/{profile.get('public_id')}/"),
        "skills": [{"name": safe_str(s.get("name") if isinstance(s, dict) else s)} for s in skills if s],
        "certifications": certifications,
        "_meta": {
            "updatedAt": datetime.utcnow().isoformat() + "Z",
            "source": "linkedin_api"
        }
    }

    with open("linkedin-data.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print("Wrote linkedin-data.json")

if __name__ == "__main__":
    main()

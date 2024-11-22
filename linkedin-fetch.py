import os
from linkedin_api import Linkedin
import json

# Autenticación con LinkedIn
username = os.getenv("LINKEDIN_USERNAME")
password = os.getenv("LINKEDIN_PASSWORD")
linkedin = Linkedin(username, password)

# Obtén los datos del perfil
profile = linkedin.get_profile("tu-nombre-de-usuario-en-linkedin")  # Reemplaza con tu nombre público de LinkedIn

# Extrae información relevante
data = {
    "firstName": profile["firstName"],
    "lastName": profile["lastName"],
    "headline": profile.get("headline", ""),
    "location": profile.get("geoLocationName", ""),
    "summary": profile.get("summary", ""),
    "skills": profile.get("skills", [])
}

# Guarda los datos en un archivo JSON
with open("linkedin-data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

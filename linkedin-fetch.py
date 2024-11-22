import json
from linkedin_api import Linkedin
from config import LINKEDIN_USERNAME, LINKEDIN_PASSWORD  # Importar credenciales desde config.py

try:
    # Validar que las credenciales no estén vacías
    if not LINKEDIN_USERNAME or not LINKEDIN_PASSWORD:
        print("Error: Las credenciales de LinkedIn no están configuradas correctamente en config.py.")
        exit(1)

    # Autenticación con LinkedIn
    linkedin = Linkedin(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)
    print("Autenticación exitosa con LinkedIn.")

    # Obtén los datos del perfil
    profile = linkedin.get_profile("caesar-dat-com")  # Reemplaza con tu nombre público de LinkedIn
    print("Datos del perfil obtenidos exitosamente.")

    # Extrae información relevante
    data = {
        "firstName": profile.get("firstName", ""),
        "lastName": profile.get("lastName", ""),
        "headline": profile.get("headline", ""),
        "location": profile.get("geoLocationName", ""),
        "summary": profile.get("summary", ""),
        "skills": profile.get("skills", [])
    }

    # Guarda los datos en un archivo JSON
    with open("linkedin-data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Datos guardados correctamente en linkedin-data.json.")

except KeyError as ke:
    print(f"Error al procesar los datos del perfil: {ke}")
except Exception as e:
    print(f"Error inesperado: {e}")
    exit(1)

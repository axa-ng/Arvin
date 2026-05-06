import requests

BASE_URL = "https://YOUR_SCHOOL.instructure.com/api/v1"

def get_assignments(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }

    res = requests.get(f"{BASE_URL}/courses", headers=headers)

    return res.json()
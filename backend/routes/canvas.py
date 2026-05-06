from fastapi import APIRouter
from services.canvas_service import get_assignments

router = APIRouter()

@router.get("/assignments")
def fetch_assignments(token: str):
    return get_assignments(token)
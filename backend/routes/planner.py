from fastapi import APIRouter
from pydantic import BaseModel
from services.planner_service import create_study_plan

router = APIRouter()


class PlanRequest(BaseModel):
    assignments: list[dict]


@router.post("/plan")
def generate_plan(payload: PlanRequest):
    return create_study_plan(payload.assignments)
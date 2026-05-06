from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import canvas, planner

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(canvas.router, prefix="/canvas")
app.include_router(planner.router, prefix="/planner")

@app.get("/")
def root():
    return {"message": "Backend working"}
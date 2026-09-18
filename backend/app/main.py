from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.health import router as health_router
from app.routers.boards import router as boards_router
from app.routers.tasks import router as task_router

app = FastAPI(title="Sticky Situation API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(boards_router)
app.include_router(task_router)

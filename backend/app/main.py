from fastapi import FastAPI

from app.routers.health import router as health_router
from app.routers.boards import router as boards_router

app = FastAPI(title="Sticky Situation API")

app.include_router(health_router)
app.include_router(boards_router)

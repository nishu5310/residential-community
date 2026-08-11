from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.health import router as health_router
from app.api.routes.categories import router as categories_router
from app.api.routes.providers import router as providers_router
from app.api.routes.requests import router as requests_router

app=FastAPI(title="MI PASS API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(health_router,prefix="/api")
app.include_router(categories_router,prefix="/api")
app.include_router(providers_router,prefix="/api")
app.include_router(requests_router,prefix="/api")

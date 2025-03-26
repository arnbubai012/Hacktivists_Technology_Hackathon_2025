from fastapi import FastAPI
from src.api.routes import api_router
from fastapi.middleware.cors import CORSMiddleware  
version="v1"
app= FastAPI(
    version=version
)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=f"/api/{version}")
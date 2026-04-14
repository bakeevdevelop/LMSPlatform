from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db
from app.schemas.auth import (
    AuthFeatures,
    AuthSessionResponse,
    IdentityDirectoryResponse,
    LoginRequest,
    LoginResponse,
    UserProfile,
)
from app.services.identity import get_identity_directory as get_identity_directory_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/session", response_model=AuthSessionResponse)
def get_session_bootstrap() -> AuthSessionResponse:
    return AuthSessionResponse(
        status="anonymous",
        auth_provider=settings.auth_provider,
        access_token_ttl_minutes=settings.access_token_ttl_minutes,
        refresh_token_ttl_days=settings.refresh_token_ttl_days,
        features=AuthFeatures(
            native_login=True,
            gosuslugi_login=True,
            leader_id_login=True,
            native_webinars=True,
        ),
    )


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    user = UserProfile(
        id="demo-student",
        email=payload.email,
        full_name="Demo Student",
        role="student",
    )
    return LoginResponse(
        access_token="demo-access-token",
        refresh_token="demo-refresh-token",
        token_type="bearer",
        expires_in=settings.access_token_ttl_minutes * 60,
        user=user,
    )


@router.get("/directory", response_model=IdentityDirectoryResponse)
def get_identity_directory(db: Session = Depends(get_db)) -> IdentityDirectoryResponse:
    return get_identity_directory_service(db)
from fastapi import APIRouter
from pydantic import BaseModel


class ModuleSummary(BaseModel):
    name: str
    status: str
    description: str


class OverviewResponse(BaseModel):
    platform: str
    architecture: str
    webinar_mode: str
    modules: list[ModuleSummary]


router = APIRouter(prefix="/overview", tags=["overview"])


@router.get("", response_model=OverviewResponse)
def get_overview() -> OverviewResponse:
    return OverviewResponse(
        platform="LSM Platform",
        architecture="modular-monolith",
        webinar_mode="native",
        modules=[
            ModuleSummary(
                name="Identity & Access",
                status="planned",
                description="Аутентификация, роли и базовая безопасность.",
            ),
            ModuleSummary(
                name="Learning Content",
                status="planned",
                description="Курсы, модули, уроки и материалы.",
            ),
            ModuleSummary(
                name="Webinars",
                status="planned",
                description="Встроенные вебинары, присутствие, чат и запись.",
            ),
            ModuleSummary(
                name="Auth Foundation",
                status="in-progress",
                description="Login, session bootstrap and role-aware identity foundation.",
            ),
            ModuleSummary(
                name="Users & Roles Foundation",
                status="in-progress",
                description="Directory endpoint for initial users, roles and access model bootstrap.",
            ),
            ModuleSummary(
                name="Course Catalog Foundation",
                status="in-progress",
                description="Каталог стартовых курсов и программа следующего этапа learning core.",
            ),
            ModuleSummary(
                name="Learning Core",
                status="in-progress",
                description="Модули курсов, структура контента и основа для трекинга прогресса.",
            ),
        ],
    )

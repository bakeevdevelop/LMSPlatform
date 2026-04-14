from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.catalog import (
    CourseCatalogResponse,
    EnrollmentCreateRequest,
    EnrollmentCreateResponse,
    EnrollmentDirectoryResponse,
    LearningLessonCatalogResponse,
    LearningModuleCatalogResponse,
)
from app.services.catalog import (
    create_enrollment,
    get_course_catalog,
    get_enrollment_directory,
    get_learning_lesson_catalog,
    get_learning_module_catalog,
)

router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.get("/courses", response_model=CourseCatalogResponse)
def list_courses(db: Session = Depends(get_db)) -> CourseCatalogResponse:
    return get_course_catalog(db)


@router.get("/enrollments", response_model=EnrollmentDirectoryResponse)
def list_enrollments(db: Session = Depends(get_db)) -> EnrollmentDirectoryResponse:
    return get_enrollment_directory(db)


@router.get("/modules", response_model=LearningModuleCatalogResponse)
def list_learning_modules(db: Session = Depends(get_db)) -> LearningModuleCatalogResponse:
    return get_learning_module_catalog(db)


@router.get("/lessons", response_model=LearningLessonCatalogResponse)
def list_learning_lessons(db: Session = Depends(get_db)) -> LearningLessonCatalogResponse:
    return get_learning_lesson_catalog(db)


@router.post("/enroll", response_model=EnrollmentCreateResponse, status_code=status.HTTP_201_CREATED)
def enroll_to_cohort(payload: EnrollmentCreateRequest, db: Session = Depends(get_db)) -> EnrollmentCreateResponse:
    try:
        return create_enrollment(db, payload)
    except ValueError as exc:
        error_code = str(exc)
        status_code = status.HTTP_400_BAD_REQUEST
        if error_code in {"cohort_not_found", "user_not_found"}:
            status_code = status.HTTP_404_NOT_FOUND
        raise HTTPException(status_code=status_code, detail=error_code) from exc
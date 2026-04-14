from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import engine
from app.models.catalog import Cohort, Course, Enrollment, LearningModule
from app.models.identity import User
from app.services.identity import seed_identity_data
from app.schemas.catalog import (
    CohortSummary,
    CourseCatalogResponse,
    CourseSummary,
    EnrollmentCreateRequest,
    EnrollmentCreateResponse,
    EnrollmentDirectoryResponse,
    EnrollmentSummary,
    LearningModuleCatalogResponse,
    LearningModuleSummary,
)


def seed_courses(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    if db.scalar(select(Course.id).limit(1)):
        return

    courses = [
        Course(
            id="python-basic",
            title="Python: базовый трек",
            level="beginner",
            format="blended",
            status="published",
            description="Введение в Python, базовый синтаксис, функции и работа с данными.",
            webinar_hours=24,
        ),
        Course(
            id="web-typescript",
            title="Веб-разработка на TypeScript",
            level="intermediate",
            format="webinar-intensive",
            status="published",
            description="Frontend-основа, компоненты, типизация и клиент-серверное взаимодействие.",
            webinar_hours=32,
        ),
        Course(
            id="data-analytics",
            title="Основы анализа данных",
            level="beginner",
            format="blended",
            status="pilot",
            description="Таблицы, визуализация, базовая статистика и работа с учебными датасетами.",
            webinar_hours=20,
        ),
    ]

    db.add_all(courses)
    db.commit()


def seed_enrollment_data(db: Session) -> None:
    seed_identity_data(db)
    seed_courses(db)

    if not db.scalar(select(Cohort.id).limit(1)):
        cohorts = [
            Cohort(
                id="python-basic-2026-spring",
                course_id="python-basic",
                title="Python: весенний поток 2026",
                starts_at="2026-05-05",
                ends_at="2026-08-15",
                capacity=120,
                enrolled_count=2,
                status="open",
            ),
            Cohort(
                id="web-typescript-2026-spring",
                course_id="web-typescript",
                title="TypeScript: интенсив май 2026",
                starts_at="2026-05-12",
                ends_at="2026-08-30",
                capacity=90,
                enrolled_count=1,
                status="open",
            ),
            Cohort(
                id="data-analytics-2026-pilot",
                course_id="data-analytics",
                title="Аналитика данных: pilot cohort",
                starts_at="2026-06-01",
                ends_at="2026-09-01",
                capacity=40,
                enrolled_count=0,
                status="planned",
            ),
        ]
        db.add_all(cohorts)
        db.commit()

    if db.scalar(select(Enrollment.id).limit(1)):
        return

    enrollments = [
        Enrollment(
            id="enrollment-demo-student-python-spring",
            user_id="demo-student",
            course_id="python-basic",
            cohort_id="python-basic-2026-spring",
            status="enrolled",
            progress_percent=15,
            enrolled_at="2026-04-10T09:00:00Z",
        ),
        Enrollment(
            id="enrollment-demo-admin-python-spring",
            user_id="demo-admin",
            course_id="python-basic",
            cohort_id="python-basic-2026-spring",
            status="enrolled",
            progress_percent=0,
            enrolled_at="2026-04-11T10:30:00Z",
        ),
        Enrollment(
            id="enrollment-demo-teacher-web-spring",
            user_id="demo-teacher",
            course_id="web-typescript",
            cohort_id="web-typescript-2026-spring",
            status="enrolled",
            progress_percent=5,
            enrolled_at="2026-04-12T12:00:00Z",
        ),
    ]

    db.add_all(enrollments)
    db.commit()


def seed_learning_modules(db: Session) -> None:
    seed_courses(db)

    if db.scalar(select(LearningModule.id).limit(1)):
        return

    modules = [
        LearningModule(
            id="python-basic-module-1",
            course_id="python-basic",
            title="Введение в Python",
            description="Синтаксис, переменные, типы данных и базовые конструкции языка.",
            position=1,
            lessons_total=6,
            duration_minutes=180,
            status="published",
        ),
        LearningModule(
            id="python-basic-module-2",
            course_id="python-basic",
            title="Функции и структура кода",
            description="Повторное использование кода, функции, параметры и разбиение программы на блоки.",
            position=2,
            lessons_total=5,
            duration_minutes=160,
            status="published",
        ),
        LearningModule(
            id="web-typescript-module-1",
            course_id="web-typescript",
            title="Типизация и интерфейсы",
            description="Основы типовой системы TypeScript, интерфейсы и типизация компонентов.",
            position=1,
            lessons_total=7,
            duration_minutes=210,
            status="published",
        ),
        LearningModule(
            id="data-analytics-module-1",
            course_id="data-analytics",
            title="Таблицы и визуализация",
            description="Работа с учебными данными, фильтрация, агрегаты и базовые визуальные отчеты.",
            position=1,
            lessons_total=4,
            duration_minutes=140,
            status="planned",
        ),
    ]

    db.add_all(modules)
    db.commit()


def get_course_catalog(db: Session) -> CourseCatalogResponse:
    seed_courses(db)
    courses = db.scalars(select(Course).order_by(Course.title)).all()

    return CourseCatalogResponse(
        total_courses=len(courses),
        courses=[
            CourseSummary(
                id=course.id,
                title=course.title,
                level=course.level,
                format=course.format,
                status=course.status,
                description=course.description,
                webinar_hours=course.webinar_hours,
            )
            for course in courses
        ],
    )


def get_enrollment_directory(db: Session) -> EnrollmentDirectoryResponse:
    seed_enrollment_data(db)
    cohorts = db.scalars(select(Cohort).order_by(Cohort.starts_at, Cohort.id)).all()
    enrollments = db.scalars(select(Enrollment).order_by(Enrollment.enrolled_at, Enrollment.id)).all()

    cohort_items = [
        CohortSummary(
            id=cohort.id,
            course_id=cohort.course_id,
            title=cohort.title,
            starts_at=cohort.starts_at,
            ends_at=cohort.ends_at,
            capacity=cohort.capacity,
            enrolled_count=cohort.enrolled_count,
            available_slots=max(cohort.capacity - cohort.enrolled_count, 0),
            status=cohort.status,
        )
        for cohort in cohorts
    ]

    enrollment_items = [
        EnrollmentSummary(
            id=enrollment.id,
            user_id=enrollment.user_id,
            course_id=enrollment.course_id,
            cohort_id=enrollment.cohort_id,
            status=enrollment.status,
            progress_percent=enrollment.progress_percent,
            enrolled_at=enrollment.enrolled_at,
        )
        for enrollment in enrollments
    ]

    return EnrollmentDirectoryResponse(
        total_cohorts=len(cohort_items),
        open_cohorts=sum(1 for cohort in cohort_items if cohort.status == "open"),
        total_enrollments=len(enrollment_items),
        cohorts=cohort_items,
        enrollments=enrollment_items,
    )


def create_enrollment(db: Session, payload: EnrollmentCreateRequest) -> EnrollmentCreateResponse:
    seed_enrollment_data(db)

    user = db.get(User, payload.userId)
    if user is None:
        raise ValueError("user_not_found")

    cohort = db.get(Cohort, payload.cohortId)
    if cohort is None:
        raise ValueError("cohort_not_found")

    if cohort.status != "open":
        raise ValueError("cohort_closed")

    if cohort.enrolled_count >= cohort.capacity:
        raise ValueError("cohort_full")

    existing = db.scalar(
        select(Enrollment).where(
            Enrollment.user_id == payload.userId,
            Enrollment.cohort_id == payload.cohortId,
        )
    )
    if existing is not None:
        raise ValueError("already_enrolled")

    course = db.get(Course, cohort.course_id)
    if course is None:
        raise ValueError("course_not_found")

    enrolled_at = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    enrollment = Enrollment(
        id=f"enrollment-{payload.userId}-{payload.cohortId}",
        user_id=user.id,
        course_id=cohort.course_id,
        cohort_id=payload.cohortId,
        status="enrolled",
        progress_percent=0,
        enrolled_at=enrolled_at,
    )
    cohort.enrolled_count += 1
    db.add(enrollment)
    db.commit()
    db.refresh(cohort)
    db.refresh(enrollment)

    return EnrollmentCreateResponse(
        enrollment=EnrollmentSummary(
            id=enrollment.id,
            user_id=enrollment.user_id,
            course_id=enrollment.course_id,
            cohort_id=enrollment.cohort_id,
            status=enrollment.status,
            progress_percent=enrollment.progress_percent,
            enrolled_at=enrollment.enrolled_at,
        ),
        cohort=CohortSummary(
            id=cohort.id,
            course_id=cohort.course_id,
            title=cohort.title,
            starts_at=cohort.starts_at,
            ends_at=cohort.ends_at,
            capacity=cohort.capacity,
            enrolled_count=cohort.enrolled_count,
            available_slots=max(cohort.capacity - cohort.enrolled_count, 0),
            status=cohort.status,
        ),
    )


def get_learning_module_catalog(db: Session) -> LearningModuleCatalogResponse:
    seed_learning_modules(db)
    modules = db.scalars(select(LearningModule).order_by(LearningModule.course_id, LearningModule.position)).all()

    return LearningModuleCatalogResponse(
        total_modules=len(modules),
        modules=[
            LearningModuleSummary(
                id=module.id,
                course_id=module.course_id,
                title=module.title,
                description=module.description,
                position=module.position,
                lessons_total=module.lessons_total,
                duration_minutes=module.duration_minutes,
                status=module.status,
            )
            for module in modules
        ],
    )
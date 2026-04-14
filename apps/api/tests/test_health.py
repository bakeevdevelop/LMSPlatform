import pytest
from fastapi.testclient import TestClient
from collections.abc import Generator

from app.db.base import Base
from app.db.session import engine
from app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_database() -> Generator[None, None, None]:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


def test_healthcheck() -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "LSM API"


def test_auth_session_bootstrap() -> None:
    response = client.get("/api/v1/auth/session")

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "anonymous"
    assert data["authProvider"] == "native"
    assert data["features"]["gosuslugiLogin"] is True
    assert data["features"]["leaderIdLogin"] is True


def test_auth_demo_login() -> None:
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "student@example.com", "password": "demo-pass-123"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["tokenType"] == "bearer"
    assert data["user"]["role"] == "student"
    assert data["user"]["fullName"] == "Demo Student"


def test_identity_directory() -> None:
    response = client.get("/api/v1/auth/directory")

    assert response.status_code == 200
    data = response.json()
    assert data["totalUsers"] == 3
    assert data["totalRoles"] == 3
    assert data["users"][0]["id"] == "demo-admin"
    assert data["roles"][0]["code"] == "admin"


def test_student_dashboard() -> None:
    response = client.get("/api/v1/auth/student/dashboard")

    assert response.status_code == 200
    data = response.json()
    assert data["studentId"] == "demo-student"
    assert data["totalActiveCourses"] == 1
    assert data["inProgressCourses"][0]["courseId"] == "python-basic"


def test_course_catalog() -> None:
    response = client.get("/api/v1/catalog/courses")

    assert response.status_code == 200
    data = response.json()
    assert data["totalCourses"] == 3
    course_ids = {course["id"] for course in data["courses"]}
    assert course_ids == {"data-analytics", "python-basic", "web-typescript"}
    python_course = next(course for course in data["courses"] if course["id"] == "python-basic")
    assert python_course["webinarHours"] == 24


def test_enrollment_directory() -> None:
    response = client.get("/api/v1/catalog/enrollments")

    assert response.status_code == 200
    data = response.json()
    assert data["totalCohorts"] == 3
    assert data["openCohorts"] == 2
    assert data["totalEnrollments"] == 3
    assert data["cohorts"][0]["courseId"] == "python-basic"


def test_create_enrollment() -> None:
    response = client.post(
        "/api/v1/catalog/enroll",
        json={"userId": "demo-student", "cohortId": "web-typescript-2026-spring"},
    )

    assert response.status_code == 201
    data = response.json()
    assert data["enrollment"]["userId"] == "demo-student"
    assert data["enrollment"]["courseId"] == "web-typescript"
    assert data["cohort"]["enrolledCount"] == 2
    assert data["cohort"]["availableSlots"] == 88


def test_create_enrollment_duplicate_rejected() -> None:
    response = client.post(
        "/api/v1/catalog/enroll",
        json={"userId": "demo-student", "cohortId": "python-basic-2026-spring"},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "already_enrolled"


def test_create_enrollment_unknown_user_rejected() -> None:
    response = client.post(
        "/api/v1/catalog/enroll",
        json={"userId": "missing-user", "cohortId": "web-typescript-2026-spring"},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "user_not_found"


def test_create_enrollment_closed_cohort_rejected() -> None:
    response = client.post(
        "/api/v1/catalog/enroll",
        json={"userId": "demo-student", "cohortId": "data-analytics-2026-pilot"},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "cohort_closed"


def test_learning_module_catalog() -> None:
    response = client.get("/api/v1/catalog/modules")

    assert response.status_code == 200
    data = response.json()
    assert data["totalModules"] == 4
    assert data["modules"][0]["courseId"] == "data-analytics"
    assert data["modules"][1]["lessonsTotal"] == 6

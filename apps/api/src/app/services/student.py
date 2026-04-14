from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.catalog import Cohort, Course, Enrollment, LearningModule
from app.models.identity import User
from app.schemas.student import StudentCourseProgress, StudentDashboardResponse
from app.services.catalog import seed_enrollment_data, seed_learning_modules


DEMO_STUDENT_ID = "demo-student"


def get_student_dashboard(db: Session) -> StudentDashboardResponse:
    seed_enrollment_data(db)
    seed_learning_modules(db)

    student = db.get(User, DEMO_STUDENT_ID)
    if student is None:
        raise ValueError("student_not_found")

    enrollments = db.scalars(
        select(Enrollment).where(Enrollment.user_id == DEMO_STUDENT_ID).order_by(Enrollment.enrolled_at)
    ).all()

    module_map = {
        module.course_id: module.title
        for module in db.scalars(select(LearningModule).order_by(LearningModule.course_id, LearningModule.position)).all()
    }

    course_items: list[StudentCourseProgress] = []
    for enrollment in enrollments:
        course = db.get(Course, enrollment.course_id)
        cohort = db.get(Cohort, enrollment.cohort_id)
        if course is None or cohort is None:
            continue

        course_items.append(
            StudentCourseProgress(
                course_id=course.id,
                course_title=course.title,
                cohort_title=cohort.title,
                progress_percent=enrollment.progress_percent,
                status=enrollment.status,
                next_module_title=module_map.get(course.id),
            )
        )

    completed_lessons = sum(max(item.progress_percent // 20, 0) for item in course_items)

    return StudentDashboardResponse(
        student_id=student.id,
        full_name=student.full_name,
        total_active_courses=len(course_items),
        total_webinars_this_week=2,
        completed_lessons=completed_lessons,
        in_progress_courses=course_items,
    )

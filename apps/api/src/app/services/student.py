from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.catalog import Cohort, Course, Enrollment, LearningLesson, LearningModule
from app.models.identity import User
from app.schemas.student import StudentCourseProgress, StudentDashboardResponse
from app.services.catalog import seed_enrollment_data, seed_learning_lessons, seed_learning_modules


DEMO_STUDENT_ID = 'demo-student'


def _get_next_lesson_title(db: Session, course_id: str) -> str | None:
    module = db.scalars(
        select(LearningModule).where(LearningModule.course_id == course_id).order_by(LearningModule.position)
    ).first()
    if module is None:
        return None

    lesson = db.scalars(
        select(LearningLesson).where(LearningLesson.module_id == module.id).order_by(LearningLesson.position)
    ).first()
    if lesson is None:
        return None

    return lesson.title


def get_student_dashboard(db: Session) -> StudentDashboardResponse:
    seed_enrollment_data(db)
    seed_learning_modules(db)
    seed_learning_lessons(db)

    student = db.get(User, DEMO_STUDENT_ID)
    if student is None:
        raise ValueError('student_not_found')

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
                next_lesson_title=_get_next_lesson_title(db, course.id),
            )
        )

    completed_lessons = sum(max(item.progress_percent // 20, 0) for item in course_items)
    total_lessons_planned = sum(module.lessons_total for module in db.scalars(select(LearningModule)).all())

    return StudentDashboardResponse(
        student_id=student.id,
        full_name=student.full_name,
        total_active_courses=len(course_items),
        total_webinars_this_week=2,
        completed_lessons=completed_lessons,
        total_lessons_planned=total_lessons_planned,
        in_progress_courses=course_items,
    )

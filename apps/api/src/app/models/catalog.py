from sqlalchemy import ForeignKey, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    level: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    format: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="draft")
    description: Mapped[str] = mapped_column(Text, nullable=False)
    webinar_hours: Mapped[int] = mapped_column(nullable=False, default=0)


class Cohort(Base):
    __tablename__ = "cohorts"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    starts_at: Mapped[str] = mapped_column(String(30), nullable=False)
    ends_at: Mapped[str] = mapped_column(String(30), nullable=False)
    capacity: Mapped[int] = mapped_column(nullable=False, default=0)
    enrolled_count: Mapped[int] = mapped_column(nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="open")


class Enrollment(Base):
    __tablename__ = "enrollments"
    __table_args__ = (UniqueConstraint("user_id", "cohort_id", name="uq_enrollments_user_cohort"),)

    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False, index=True)
    cohort_id: Mapped[str] = mapped_column(ForeignKey("cohorts.id"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="enrolled")
    progress_percent: Mapped[int] = mapped_column(nullable=False, default=0)
    enrolled_at: Mapped[str] = mapped_column(String(30), nullable=False)


class LearningModule(Base):
    __tablename__ = "learning_modules"

    id: Mapped[str] = mapped_column(String(60), primary_key=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    position: Mapped[int] = mapped_column(nullable=False, default=1)
    lessons_total: Mapped[int] = mapped_column(nullable=False, default=0)
    duration_minutes: Mapped[int] = mapped_column(nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="draft")


class LearningLesson(Base):
    __tablename__ = "learning_lessons"

    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    module_id: Mapped[str] = mapped_column(ForeignKey("learning_modules.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    position: Mapped[int] = mapped_column(nullable=False, default=1)
    duration_minutes: Mapped[int] = mapped_column(nullable=False, default=0)
    lesson_type: Mapped[str] = mapped_column(String(40), nullable=False, default="lesson")
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="draft")
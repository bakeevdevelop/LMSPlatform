from pydantic import BaseModel, Field


class StudentCourseProgress(BaseModel):
    course_id: str = Field(serialization_alias="courseId")
    course_title: str = Field(serialization_alias="courseTitle")
    cohort_title: str = Field(serialization_alias="cohortTitle")
    progress_percent: int = Field(serialization_alias="progressPercent")
    status: str
    next_module_title: str | None = Field(default=None, serialization_alias="nextModuleTitle")
    next_lesson_title: str | None = Field(default=None, serialization_alias="nextLessonTitle")


class StudentDashboardResponse(BaseModel):
    student_id: str = Field(serialization_alias="studentId")
    full_name: str = Field(serialization_alias="fullName")
    total_active_courses: int = Field(serialization_alias="totalActiveCourses")
    total_webinars_this_week: int = Field(serialization_alias="totalWebinarsThisWeek")
    completed_lessons: int = Field(serialization_alias="completedLessons")
    total_lessons_planned: int = Field(serialization_alias="totalLessonsPlanned")
    in_progress_courses: list[StudentCourseProgress] = Field(serialization_alias="inProgressCourses")

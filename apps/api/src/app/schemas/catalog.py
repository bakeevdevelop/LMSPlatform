from pydantic import BaseModel, Field


class CourseSummary(BaseModel):
    id: str
    title: str
    level: str
    format: str
    status: str
    description: str
    webinar_hours: int = Field(serialization_alias="webinarHours")


class CourseCatalogResponse(BaseModel):
    total_courses: int = Field(serialization_alias="totalCourses")
    courses: list[CourseSummary]


class CohortSummary(BaseModel):
    id: str
    course_id: str = Field(serialization_alias="courseId")
    title: str
    starts_at: str = Field(serialization_alias="startsAt")
    ends_at: str = Field(serialization_alias="endsAt")
    capacity: int
    enrolled_count: int = Field(serialization_alias="enrolledCount")
    available_slots: int = Field(serialization_alias="availableSlots")
    status: str


class EnrollmentSummary(BaseModel):
    id: str
    user_id: str = Field(serialization_alias="userId")
    course_id: str = Field(serialization_alias="courseId")
    cohort_id: str = Field(serialization_alias="cohortId")
    status: str
    progress_percent: int = Field(serialization_alias="progressPercent")
    enrolled_at: str = Field(serialization_alias="enrolledAt")


class EnrollmentDirectoryResponse(BaseModel):
    total_cohorts: int = Field(serialization_alias="totalCohorts")
    open_cohorts: int = Field(serialization_alias="openCohorts")
    total_enrollments: int = Field(serialization_alias="totalEnrollments")
    cohorts: list[CohortSummary]
    enrollments: list[EnrollmentSummary]


class EnrollmentCreateRequest(BaseModel):
    userId: str
    cohortId: str


class EnrollmentCreateResponse(BaseModel):
    enrollment: EnrollmentSummary
    cohort: CohortSummary


class LearningModuleSummary(BaseModel):
    id: str
    course_id: str = Field(serialization_alias="courseId")
    title: str
    description: str
    position: int
    lessons_total: int = Field(serialization_alias="lessonsTotal")
    duration_minutes: int = Field(serialization_alias="durationMinutes")
    status: str


class LearningModuleCatalogResponse(BaseModel):
    total_modules: int = Field(serialization_alias="totalModules")
    modules: list[LearningModuleSummary]


class LearningLessonSummary(BaseModel):
    id: str
    module_id: str = Field(serialization_alias="moduleId")
    title: str
    position: int
    duration_minutes: int = Field(serialization_alias="durationMinutes")
    lesson_type: str = Field(serialization_alias="lessonType")
    status: str


class LearningLessonCatalogResponse(BaseModel):
    total_lessons: int = Field(serialization_alias="totalLessons")
    lessons: list[LearningLessonSummary]
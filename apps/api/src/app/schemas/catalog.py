from pydantic import BaseModel, ConfigDict, Field


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
    model_config = ConfigDict(populate_by_name=True)

    user_id: str = Field(validation_alias="userId", serialization_alias="userId")
    cohort_id: str = Field(validation_alias="cohortId", serialization_alias="cohortId")


class EnrollmentCreateResponse(BaseModel):
    enrollment: EnrollmentSummary
    cohort: CohortSummary
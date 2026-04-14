from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import engine
from app.models.identity import Role, User
from app.schemas.auth import IdentityDirectoryResponse, RoleSummary, UserSummary


def seed_identity_data(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    if db.scalar(select(Role.code).limit(1)):
        return

    roles = [
        Role(code="student", name="Слушатель", description="Проходит обучение, тесты и вебинары."),
        Role(code="teacher", name="Преподаватель", description="Ведет курсы, проверяет задания и проводит вебинары."),
        Role(code="admin", name="Администратор", description="Управляет пользователями, ролями и доступами."),
    ]

    users = [
        User(id="demo-student", full_name="Demo Student", email="student@example.com", role="student", status="active"),
        User(id="demo-teacher", full_name="Demo Teacher", email="teacher@example.com", role="teacher", status="active"),
        User(id="demo-admin", full_name="Platform Admin", email="admin@example.com", role="admin", status="active"),
    ]

    db.add_all(roles + users)
    db.commit()


def get_identity_directory(db: Session) -> IdentityDirectoryResponse:
    seed_identity_data(db)

    roles = db.scalars(select(Role).order_by(Role.code)).all()
    users = db.scalars(select(User).order_by(User.id)).all()

    return IdentityDirectoryResponse(
        total_users=len(users),
        total_roles=len(roles),
        users=[
            UserSummary(
                id=user.id,
                full_name=user.full_name,
                email=user.email,
                role=user.role,
                status=user.status,
            )
            for user in users
        ],
        roles=[
            RoleSummary(code=role.code, name=role.name, description=role.description)
            for role in roles
        ],
    )
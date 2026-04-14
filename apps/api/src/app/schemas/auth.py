from pydantic import BaseModel, EmailStr, Field


class AuthFeatures(BaseModel):
    native_login: bool = Field(serialization_alias="nativeLogin")
    gosuslugi_login: bool = Field(serialization_alias="gosuslugiLogin")
    leader_id_login: bool = Field(serialization_alias="leaderIdLogin")
    native_webinars: bool = Field(serialization_alias="nativeWebinars")


class AuthSessionResponse(BaseModel):
    status: str
    auth_provider: str = Field(serialization_alias="authProvider")
    access_token_ttl_minutes: int = Field(serialization_alias="accessTokenTtlMinutes")
    refresh_token_ttl_days: int = Field(serialization_alias="refreshTokenTtlDays")
    features: AuthFeatures


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserProfile(BaseModel):
    id: str
    email: EmailStr
    full_name: str = Field(serialization_alias="fullName")
    role: str


class UserSummary(BaseModel):
    id: str
    full_name: str = Field(serialization_alias="fullName")
    email: EmailStr
    role: str
    status: str


class RoleSummary(BaseModel):
    code: str
    name: str
    description: str


class IdentityDirectoryResponse(BaseModel):
    total_users: int = Field(serialization_alias="totalUsers")
    total_roles: int = Field(serialization_alias="totalRoles")
    users: list[UserSummary]
    roles: list[RoleSummary]


class LoginResponse(BaseModel):
    access_token: str = Field(serialization_alias="accessToken")
    refresh_token: str = Field(serialization_alias="refreshToken")
    token_type: str = Field(serialization_alias="tokenType")
    expires_in: int = Field(serialization_alias="expiresIn")
    user: UserProfile
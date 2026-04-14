from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "LSM API"
    app_version: str = "0.1.0"
    api_v1_prefix: str = "/api/v1"
    environment: str = "development"
    database_url: str = "sqlite:///./lsm.db"
    access_token_ttl_minutes: int = 30
    refresh_token_ttl_days: int = 14
    auth_provider: str = "native"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="LSM_")


settings = Settings()

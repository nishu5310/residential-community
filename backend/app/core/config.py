from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    app_env:str="development"
    secret_key:str="change-this"
    database_url:str="postgresql+psycopg://mipass:mipass@localhost:5432/mipass"
    redis_url:str="redis://localhost:6379/0"
settings=Settings()

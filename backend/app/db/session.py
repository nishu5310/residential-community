from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

try:
    engine = create_engine(
        settings.database_url,
        pool_pre_ping=True
    )
    # Test connection creation
    connection = engine.connect()
    connection.close()
except Exception:
    # Fallback to SQLite in-memory or file for test/local execution without Postgres
    engine = create_engine(
        "sqlite:///./test.db",
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
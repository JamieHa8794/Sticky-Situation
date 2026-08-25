from datetime import datetime
from uuid import uuid4

from sqlalchemy import Text, func
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Board(Base):
    __tablename__ = "Board"

    id: Mapped[str] = mapped_column(
        Text, 
        primary_key=True,
        default=lambda: str(uuid4()),
    )
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    icon: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        server_default="rocket",
    )
    created_at: Mapped[datetime] = mapped_column(
        "createdAt",
        TIMESTAMP(precision=3),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        "updatedAt",
        TIMESTAMP(precision=3),
        nullable=False,
        default=func.now(),
        onupdate=func.now(),   
    )
from app.database import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Text, func
from sqlalchemy.dialects.postgresql import TIMESTAMP

from uuid import uuid4
from datetime import datetime

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.board import Board


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        Text,
        primary_key=True,
        default=lambda: str(uuid4()),
    )
    email: Mapped[str] = mapped_column(
        Text,
        unique=True,
        nullable=False,
    )
    password_hash: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(precision=3),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(precision=3),
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
    )

    boards: Mapped[list["Board"]] = relationship(
        back_populates="user",
        cascade="all, delete",
        passive_deletes=True,
    )

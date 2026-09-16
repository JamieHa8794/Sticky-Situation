from datetime import datetime
from uuid import uuid4
from typing import TYPE_CHECKING

from sqlalchemy import Text, func
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.task import Task


class Board(Base):
    __tablename__ = "boards"

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

    tasks: Mapped[list["Task"]] = relationship(
        back_populates="board",
        cascade="all, delete",
        passive_deletes=True,
    )

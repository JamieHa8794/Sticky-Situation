from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict


class BoardCreate(BaseModel):
    title: str
    description: str
    icon: str


class BoardUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    icon: str | None = None


class BoardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    description: str
    icon: str
    created_at: datetime = Field(serialization_alias="createdAt")
    updated_at: datetime = Field(serialization_alias="updatedAt")

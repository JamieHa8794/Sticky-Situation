from pydantic import BaseModel, ConfigDict, Field

from app.models.task import TaskPriority, TaskStatus


class TaskCreate(BaseModel):
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    due_date: str = Field(alias="dueDate")
    tags: list[str]
    board_id: str = Field(alias="boardId")


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    due_date: str | None = Field(default=None, alias="dueDate")
    tags: list[str] | None = None


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    due_date: str = Field(serialization_alias="dueDate")
    tags: list[str]
    board_id: str = Field(serialization_alias="boardId")

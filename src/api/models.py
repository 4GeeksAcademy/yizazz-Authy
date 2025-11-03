from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, timezone
from typing import List

db = SQLAlchemy()


class User(db.Model):

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    salt: Mapped[str] = mapped_column(String(180), nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(
        timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(
        timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    todos: Mapped[List["Todos"]] = db.relationship(back_populates="user")

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }


class Todos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    label: Mapped[str] = mapped_column(String(250), nullable=False)
    is_done: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(
        timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(
        timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    user: Mapped["User"] = db.relationship(back_populates="todos")

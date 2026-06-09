from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, field_validator
from typing import List, Literal, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Berra Durur Hafızlık Davetiyesi API")
api_router = APIRouter(prefix="/api")


# -------- Models --------
class WishCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    status: Literal["katilacagim", "katilamayacagim"]
    people: Optional[int] = Field(default=1, ge=1, le=10)
    message: str = Field(..., min_length=2, max_length=500)

    @field_validator("name", "message")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()


class Wish(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    status: str
    people: int = 1
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WishStats(BaseModel):
    total: int
    attending: int
    not_attending: int
    total_people: int


# -------- Routes --------
@api_router.get("/")
async def root():
    return {"message": "Berra Durur Hafızlık Davetiyesi API"}


@api_router.post("/wishes", response_model=Wish, status_code=status.HTTP_201_CREATED)
async def create_wish(payload: WishCreate):
    wish = Wish(
        name=payload.name,
        status=payload.status,
        people=payload.people if payload.status == "katilacagim" else 0,
        message=payload.message,
    )
    doc = wish.model_dump()
    # store as ISO string for consistent serialization back
    await db.wishes.insert_one(doc)
    return wish


@api_router.get("/wishes", response_model=List[Wish])
async def list_wishes():
    cursor = db.wishes.find({}, {"_id": 0}).sort("created_at", -1).limit(500)
    items = await cursor.to_list(length=500)
    result: List[Wish] = []
    for item in items:
        try:
            result.append(Wish(**item))
        except Exception as e:
            logger.warning("Skipping malformed wish: %s (%s)", item.get("id"), e)
    return result


@api_router.get("/wishes/stats", response_model=WishStats)
async def wishes_stats():
    total = await db.wishes.count_documents({})
    attending = await db.wishes.count_documents({"status": "katilacagim"})
    not_attending = await db.wishes.count_documents({"status": "katilamayacagim"})
    # sum people of attendees
    pipeline = [
        {"$match": {"status": "katilacagim"}},
        {"$group": {"_id": None, "sum": {"$sum": "$people"}}},
    ]
    agg = await db.wishes.aggregate(pipeline).to_list(length=1)
    total_people = agg[0]["sum"] if agg else 0
    return WishStats(
        total=total,
        attending=attending,
        not_attending=not_attending,
        total_people=total_people,
    )


@api_router.delete("/wishes/{wish_id}")
async def delete_wish(wish_id: str):
    res = await db.wishes.delete_one({"id": wish_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Wish not found")
    return {"deleted": True, "id": wish_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

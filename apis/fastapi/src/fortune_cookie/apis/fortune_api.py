# coding: utf-8

from typing import Dict, List  # noqa: F401
import importlib
import pkgutil

import openapi_server.impl
import random
import datetime

from fastapi import (  # noqa: F401
    APIRouter,
    Body,
    Cookie,
    Depends,
    Form,
    Header,
    Path,
    Query,
    Response,
    Security,
    status,
)

from fortune_cookie.models.extra_models import TokenModel  # noqa: F401
from fortune_cookie.models.error import Error
from fortune_cookie.models.fortune_cookie import FortuneCookie

from fortune_cookie.service.load_fortunes import FORTUNES

router = APIRouter()

ns_pkg = openapi_server.impl
for _, name, _ in pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + "."):
    importlib.import_module(name)


@router.get(
    "/random",
    responses={
        200: {"model": FortuneCookie, "description": "A single fortune cookie"},
        500: {"model": Error, "description": "unexpected error"},
    },
    tags=["fortune"],
    summary="Gets a random fortune cookie",
    response_model_by_alias=True,
)
@router.get("/")
async def get_fortune_cookie() -> str:
    return random.choice(FORTUNES).replace("\n", "")


@router.get("/time_until")
async def get_when_is(date_str: str = None):
    now = datetime.datetime.now()
    date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    timediff_seconds = (date_obj - now).total_seconds()
    days = int(timediff_seconds // 86_400)
    days_remainder = timediff_seconds % 86_400
    hours = int(days_remainder // 3600)
    hours_remainder = days_remainder % 3600
    minutes = int(hours_remainder // 60)
    minutes_remainder = hours_remainder % 60
    seconds = int(minutes_remainder)

    return f"{days} days {hours} hours {minutes} minutes and {seconds} seconds"

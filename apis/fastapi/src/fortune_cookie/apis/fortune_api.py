# coding: utf-8

from typing import Dict, List  # noqa: F401
import importlib
import pkgutil

import openapi_server.impl
import random

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

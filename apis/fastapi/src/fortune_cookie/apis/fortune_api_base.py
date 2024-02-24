# coding: utf-8

from typing import ClassVar, Dict, List, Tuple  # noqa: F401

from fortune_cookie.models.error import Error
from fortune_cookie.models.fortune_cookie import FortuneCookie


class BaseFortuneApi:
    subclasses: ClassVar[Tuple] = ()

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        BaseFortuneApi.subclasses = BaseFortuneApi.subclasses + (cls,)
    def get_fortune_cookie(
        self,
    ) -> FortuneCookie:
        ...

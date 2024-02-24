# coding: utf-8

from fastapi.testclient import TestClient


from fortune_cookie.models.error import Error  # noqa: F401
from fortune_cookie.models.fortune_cookie import FortuneCookie  # noqa: F401


def test_get_fortune_cookie(client: TestClient):
    """Test case for get_fortune_cookie

    Gets a random fortune cookie
    """

    headers = {
    }
    # uncomment below to make a request
    #response = client.request(
    #    "GET",
    #    "/random",
    #    headers=headers,
    #)

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


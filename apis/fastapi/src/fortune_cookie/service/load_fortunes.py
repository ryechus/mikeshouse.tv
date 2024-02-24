import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
fortune_file = os.environ.get("FORTUNE_COOKIE_FILE_PATH", os.path.join(__location__, "fortunes.txt"))

with open(fortune_file, "r") as f:
    FORTUNES = f.readlines()

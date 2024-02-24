import requests

from bs4 import BeautifulSoup


def get_page(offset: int = 0):
    url = f"http://www.fortunecookiemessage.com/archive.php?start={offset}"
    print(f"getting url: {url}")
    response = requests.get(url)
    return response


def main():
    page_size = 50
    page = 0
    while True:
        response = get_page(page * page_size)
        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.content)
        table = soup.find("table", {"class": "table1"})
        table_rows = table.find_all("tr")

        if not table_rows[1:]:
            break

        with open("fortunes.txt", "a") as f:
            for row in table_rows[1:]:
                table_data = row.find("td")
                a_tag = table_data.find("a")
                text = a_tag.get_text()
                f.write(f"{text}\n")

        page += 1


if __name__ == "__main__":
    main()

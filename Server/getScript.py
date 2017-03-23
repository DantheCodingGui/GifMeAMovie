from lxml import html
import requests

baseURL = "http://www.imsdb.com/all%20scripts"

query = 'Force Awakens'

page = requests.get(baseURL)
tree = html.fromstring(page.content)
#filmLinks = tree.xpath("//*[starts-with(local-name(), 'p')]")
filmLinks = tree.xpath("//a[contains(., '')]")


#print(filmLinks)

for index, p in enumerate(filmLinks):
    print(index, p.text)

from lxml import html
import requests

def getTree(URL):
    page = requests.get(URL)
    tree = html.fromstring(page.content)
    return tree

baseURL = "http://www.imsdb.com/all%20scripts"

query = 'Force Awakens'

#Goes to the film

tree = getTree(baseURL)
#page = requests.get(baseURL)
#tree = html.fromstring(page.content)
#filmLinks = tree.xpath("//*[starts-with(local-name(), 'p')]")
filmLinks = tree.xpath("//a[contains(., 'Avengers')]/@href")
filmNames = tree.xpath("//a[contains(., 'Avengers')]")

#print(filmLinks)
for index, a in enumerate(filmLinks):
    print(index, a)

for index, a in enumerate(filmNames):
    print(index, a.text)

#for index, a in enumerate(filmLinks):
#    print(index, a)

print(filmLinks[0], filmNames[0].text)


#http://www.imsdb.com/Movie%20Scripts/Avengers,%20The%20(2012)%20Script.html

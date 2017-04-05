from lxml import html
import requests
from unidecode import unidecode

def getTree(URL):
    page = requests.get(URL)
    tree = html.fromstring(page.content)
    return tree

def GetFilmNames(URL, filmArray):
    i = 1
    tree = getTree(URL)
    for i in range (1,51):
        name = tree.xpath("//*[@id='main']/div/div/div[3]/div[" + str(i) + "]/div[3]/h3/a/text()")
        print(name)
        date = tree.xpath("//*[@id='main']/div/div/div[3]/div[" + str(i) + "]/div[3]/h3/span[2]/text()")
        #filmArray.append( (name[0].replace('·','-'),date[0]))
        filmArray.append( ( unidecode(name[0].replace('·','-')),date[0]))
    return filmArray


imdbURL1 = "http://www.imdb.com/search/title?languages=en&title_type=feature&page="
imdbURL2 = "&sort=num_votes,desc"

numPages = 3
Films = []
for i in range (1,numPages):
    URL = imdbURL1 + str(i) + imdbURL2
    Films = GetFilmNames(URL,Films)
#for i in Films:
#    print(i)

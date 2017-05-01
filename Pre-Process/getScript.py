from lxml import html
import requests
from unidecode import unidecode
import re

#Turn webpage into tree
def getTree(URL):
    page = requests.get(URL)
    tree = html.fromstring(page.content)
    return tree

#Get Film names from IMDB tree
def GetFilmNames(URL, filmArray):
    i = 1
    tree = getTree(URL)
    for i in range (1,51):
        name = tree.xpath("//*[@id='main']/div/div/div[3]/div[" + str(i) + "]/div[3]/h3/a/text()")
        date = tree.xpath("//*[@id='main']/div/div/div[3]/div[" + str(i) + "]/div[3]/h3/span[2]/text()")
        filmArray.append( ( unidecode(name[0].replace('·','-')),date[0]))
    return filmArray

#Save the film script to a file
def saveToFile(FilmName, FilmScript):
    f = open("FilmScript/" + str(FilmName) + ".txt", "w")
    f.write(str(FilmScript))
    f.close()

#Get the film script from springfieldspringfield website
def getFilmScript(filmTuple):
    filmName = formatFilmName(filmTuple[0])
    filmDate = formatFilmDate(filmTuple[1])
    URL = "http://www.springfieldspringfield.co.uk/movie_scripts.php?search=" + filmName
    tree = getTree(URL)
    print(filmName + " " + filmDate)

    for i in range (1,18):
        websiteFilmTitle = tree.xpath("//*[@id='content_container']/div[3]/div[2]/a[" + str(i) + "]/text()")

        if websiteFilmTitle == []:
            break;

        if filmDate in websiteFilmTitle[0]:
            filmScriptURL = tree.xpath("//*[@id='content_container']/div[3]/div[2]/a[" + str(i) + "]/@href")
            URL = "http://www.springfieldspringfield.co.uk" + filmScriptURL[0]
            tree = getTree(URL)
            FilmScript = tree.xpath("//*[@id='content_container']/div[3]/div[2]/div[2]/div/text()")
            saveToFile(filmName.replace("+"," ")+ " " + filmDate, FilmScript)
            break;



#Used to format the name for the website search
def formatFilmName(FilmName):
    punctRemove = '''!()[]{};:'"\,<>./?@#$%^&*_~-'''
    FilmNameFormatted = ''

    for char in FilmName:
        if char not in punctRemove:
            FilmNameFormatted = FilmNameFormatted + char

    FilmNameFormatted = FilmNameFormatted.replace(" ","+").replace("++","+").replace("+++","+and+")
    return FilmNameFormatted

def formatFilmDate(FilmDate):
    FilmDate = re.sub("\D","",FilmDate)
    return FilmDate


imdbURL1 = "http://www.imdb.com/search/title?languages=en&title_type=feature&page="
imdbURL2 = "&sort=num_votes,desc"

numPages = 101
Films = []
for i in range (0,numPages):
    URL = imdbURL1 + str(i) + imdbURL2
    Films = GetFilmNames(URL,Films)

for filmTuple in Films:
    getFilmScript(filmTuple)

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
    filmName = formatFilmNameFirst(filmTuple[0])
    filmDate = formatFilmDate(filmTuple[1])

    baseURL = ("http://www.springfieldspringfield.co.uk/movie_script.php?movie=" + str(filmName) + "-" + str(filmDate))
    tree = getTree(baseURL)
    script = tree.xpath("//*[@id='content_container']/div[3]/div[2]/div[2]/div/text()")

    if script == []:
        baseURL = ("http://www.springfieldspringfield.co.uk/movie_script.php?movie=" + str(filmName))
        tree = getTree(baseURL)
        script = tree.xpath("//*[@id='content_container']/div[3]/div[2]/div[2]/div/text()")

    if script == []:
        filmName = formatFilmNameSnd(filmTuple[0])
        baseURL = ("http://www.springfieldspringfield.co.uk/movie_script.php?movie=" + str(filmName) + "-" + str(filmDate))
        tree = getTree(baseURL)
        script = tree.xpath("//*[@id='content_container']/div[3]/div[2]/div[2]/div/text()")

        if script == []:
            baseURL = ("http://www.springfieldspringfield.co.uk/movie_script.php?movie=" + str(filmName))
            tree = getTree(baseURL)
            script = tree.xpath("//*[@id='content_container']/div[3]/div[2]/div[2]/div/text()")

    #if script != []:
    saveToFile((filmName + "-" + filmDate),script)

#Used to format the name for the website search
def formatFilmNameFirst(FilmName):
    punctRemove = '''!()[]{};:'"\,<>./?@#$%^&*_~'''
    FilmNameFormatted = ''

    for char in FilmName:
        if char not in punctRemove:
            FilmNameFormatted = FilmNameFormatted + char

    FilmNameFormatted = FilmNameFormatted.replace(" - ","-").replace(" ","-").replace("--","-and-")
    return FilmNameFormatted

def formatFilmNameSnd(FilmName):
    punctRemove = '''!()[]{};:'"\,<>./?@#$%^&*_~'''
    FilmNameFormatted = ''

    for char in FilmName:
        if char not in punctRemove:
            FilmNameFormatted = FilmNameFormatted + char

    if (FilmNameFormatted[:4] == "The "):
        FilmNameFormatted = FilmNameFormatted[4:] + str(" The")
    elif(FilmNameFormatted[:2] == "A "):
        FilmNameFormatted = FilmNameFormatted[2:] + str(" A")

    FilmNameFormatted = FilmNameFormatted.replace(" - ","-").replace(" ","-").replace("--","-and-")
    return FilmNameFormatted

def formatFilmDate(FilmDate):
    FilmDate = re.sub("\D","",FilmDate)
    return FilmDate


imdbURL1 = "http://www.imdb.com/search/title?languages=en&title_type=feature&page="
imdbURL2 = "&sort=num_votes,desc"

numPages = 21
Films = []
for i in range (11,numPages):
    URL = imdbURL1 + str(i) + imdbURL2
    Films = GetFilmNames(URL,Films)

for filmTuple in Films:
    getFilmScript(filmTuple)

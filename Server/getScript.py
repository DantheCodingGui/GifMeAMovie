from lxml import html
import requests

def getTree(URL):
    page = requests.get(URL)
    tree = html.fromstring(page.content)
    return tree

def saveToFile(script, filmName):
    f = open("FilmScript/" + str(filmName) + ".txt","w")
    f.write(str(script))
    f.close()

def getscript(filmURL, filmName):
    tree = getTree(filmURL)
    page = tree.xpath("//a[contains(., '')]/@href")
    scriptTree = getTree("http://www.imsdb.com"+page[67])
    scriptPage = scriptTree.xpath("//pre/text()[normalize-space(/)]")
#The option below will write to file
    saveToFile(scriptPage, filmName)

#This URL gets the crawler to a page with links to all of the scripts
baseURL = "http://www.imsdb.com/all%20scripts"

tree = getTree(baseURL)
filmLinks = tree.xpath("//a[contains(., '')]/@href")
filmNames = tree.xpath("//a[contains(., '')]/text()")

baseURL = "http://www.imsdb.com"

#current crawler is for single element
#for i in range (64 , 1229):
getscript(baseURL+filmLinks[500], filmNames[500])   #uncomment line 33 and change 500 to i to fix

from lxml import html
import requests

def getTree(URL):
    page = requests.get(URL)
    tree = html.fromstring(page.content)
    return tree
0
def saveToFile(script, filmName):
    f = open("FilmScript/" + str(filmName) + ".txt","w")
    f.write(str(script))
    f.close()

def getscript(filmURL, filmName):
    tree = getTree(filmURL)
    page = tree.xpath("//a[contains(., '')]/@href")

    i = 65  #all movie script links are between 65 and 73
    while i < 73:
        if page[i][1:7] == "script": break  #checks to see if link tag is found.
        i=i+1
    if i != 73: #film with no script will have a page[i], where i == 73, thus not being written to a file.
        #Gets the movie script.
        scriptTree = getTree("http://www.imsdb.com"+page[i])
        scriptPage = scriptTree.xpath("//pre/text()")

        saveToFile(scriptPage, filmName)    #call save to file function.

#This URL gets the crawler to a page with links to all of the scripts
baseURL = "http://www.imsdb.com/all%20scripts"

tree = getTree(baseURL)
filmLinks = tree.xpath("//a[contains(., '')]/@href")
filmNames = tree.xpath("//a[contains(., '')]/text()")

baseURL = "http://www.imsdb.com"

#current crawler is for single element
for i in range (64 , 1229): # 64, 1229):
    getscript(baseURL+filmLinks[i+4], filmNames[i])   #uncomment line 33 and change 500 to i to fix
    #print(filmNames[i])
    #print(filmLinks[i+4])

from lxml import html
import requests
import sys
import os

# xPath Links
# Film Web Page URL - //*[@id="main"]/div/div/div[3]/div[1]/div[3]/h3/a
# Storyline text - //*[@id="titleStoryLine"]/div[1]/p/text()

#To create a Directory incase one doesn't exist
def createDirectory():
    if not os.path.exists("FilmSummary"):
        os.makedirs("FilmSummary")

#To save the contents to a file
def saveToFile(storyline):
    f = open("FilmSummary/" + str(counter) + ".txt","w")
    f.write(storyline)
    f.close()

#Used to get the film storyline
def fetchFilmStoryline(link):
    film_page = requests.get(link)          #To retrieve the web page
    tree = html.fromstring(film_page.content)   #To save the content of the web page in tree
    storyline = str(tree.xpath('//*[@id="titleStoryLine"]/div[1]/p/text()'))    #To get the stroyline from the page
    storyline = storyline.strip(" [ ] ' ' , ")      #Strip storyline of certain characters
    saveToFile(storyline)

#To get all the Film Pages URLs
def fetchFilmURLs(page_tree):
    global counter
    for i in range(1,51):
        film_url = str(page_tree.xpath('//*[@id="main"]/div/div/div[3]/div[' + str(i) + ']/div[3]/h3/a/@href'))     #Used to get the link to the film
        film_url = film_url.strip(" [ ] ' ' ")      #Remove certain characters from the string
        film_url = default_film_url + film_url      #Create a valid film URL
        fetchFilmStoryline(film_url)
        print(counter)
        counter += 1

#To get the Film Pop page in suitable format
def fetchFilmPopPage(NumberOfFilms):
    global counter
    page_number_int = 1
    while(counter < NumberOfFilms):
        web_page_url = default_web_url + str(page_number_int)   #Creates the url to access
        page_of_films = requests.get(web_page_url)          #Goes to imdb most popular which displays 50 films
        tree = html.fromstring(page_of_films.content)       #Gets the results of the page and save within tree
        fetchFilmURLs(tree)
        page_number_int += 1

if __name__ == '__name__':
    default_film_url = "http://www.imdb.com"
    default_web_url = "http://www.imdb.com/search/title?languages=en&title_type=feature&page="    #Base website URL to fetch from
    counter = 0
    createDirectory()
    fetchFilmPopPage(10000)

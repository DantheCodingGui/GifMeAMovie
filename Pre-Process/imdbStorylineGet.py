from lxml import html
import requests
import sys
import os

#XPATH Links
#FILM URL - //*[@id="main"]/div/div/div[3]/div[1]/div[3]/h3/a
#STORYLINE - //*[@id="titleStoryLine"]/div[1]/p/text()

default_web_url = "http://www.imdb.com/search/title?languages=en&title_type=feature&page="    #Base website URL to fetch from
default_film_url = "http://www.imdb.com"
counter = 0    #Counter to keep track on how many are done
page_number_int = 1  #Page number to search

#Create Directory if it doesn't exist for the out put files
if not os.path.exists("FilmSummary"):
    os.makedirs("FilmSummary")

while (counter <= 10000):
    web_page_url = default_web_url + str(page_number_int)
    page = requests.get(web_page_url)
    tree = html.fromstring(page.content)

    for i in range(1,51):
        #This is to get the film page url
        link = str(tree.xpath('//*[@id="main"]/div/div/div[3]/div[' + str(i) + ']/div[3]/h3/a/@href'))
        link = link.strip(" [ ] ' ' ")
        #This is to get the film page contents
        film_url = default_film_url + link
        film_page = requests.get(film_url)
        tree2 = html.fromstring(film_page.content)
        #This is to get the storyline form the film page
        storyline = str(tree2.xpath('//*[@id="titleStoryLine"]/div[1]/p/text()'))
        storyline = storyline.strip(" [ ] ' ' , ")
        #This is to save the storyline to a file
        f = open("FilmSummary/" + str(counter) + ".txt","w")
        f.write(storyline)
        f.close()
        counter += 1
    page_number_int += 1

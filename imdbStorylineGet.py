from lxml import html
import requests
import sys
import os

#XPATH Links
#Storyline = //*[@id="titleStoryLine"]/div[1]/p/text()
#Langugae = //*[@id="titleDetails"]/div[3]/a
#Media type = //*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[3]/text()
#Adult content = //*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[1]/span
#Page exists = //*[@id="error"]/div[1]/text()[1]

default_web_url = "http://www.imdb.com/title/tt"    #Base website URL to fetch from
counter = 0     #Counter to keep track on how many are done
page_number_int = 109830     #Page number to search

#Create Directory if it doesn't exist for the out put files
if not os.path.exists("FilmSummary"):
    os.makedirs("FilmSummary")

#while (count <= 10):

page_number = "{0:0>7}".format(page_number_int)
    #The website URL
web_url = default_web_url + str(page_number)
    #To retrive the web page
page = requests.get(web_url)
    #Save the results of the web page in true
tree = html.fromstring(page.content)
    #The xpath for the storyline from webpage
storyline = tree.xpath('//*[@id="titleStoryLine"]/div[1]/p/text()')
    #

#Save the resutls in a txt file
f = open('FilmSummary/' + str(counter) +'.txt', 'w')
f.write(str(storyline))
f.close()

from lxml import html
import requests
import sys
import os

#XPATH Links
#Storyline = //*[@id="titleStoryLine"]/div[1]/p/text()
#Langugae = //*[@id="titleDetails"]/div[3]/a            done
#Media type = //*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[3]/text()
#Adult content = //*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[1]/span
#Page exists = //*[@id="error"]/div[1]/text()[1]        done

default_web_url = "http://www.imdb.com/title/tt"    #Base website URL to fetch from
counter = 3     #Counter to keep track on how many are done
page_number_int = 100000   #Page number to search

#Create Directory if it doesn't exist for the out put files
if not os.path.exists("FilmSummary"):
    os.makedirs("FilmSummary")

while (counter <= 10000):
    page_number = "{0:0>7}".format(page_number_int)         #Page number to search in the correct format
    web_url = default_web_url + str(page_number)            #The website URL
    page = requests.get(web_url)                            #To retrive the web page
    tree = html.fromstring(page.content)                    #Save the results of the web page in true
    incorrect_page = str(tree.xpath('//*[@id="error"]/div[1]/text()[1]'))    #Find out if the page requested is valid

    if incorrect_page == '[]':      #if the page has content
        language = str(tree.xpath('//*[@id="titleDetails"]/div[3]/a/text()'))
        language = language.strip("[ ] ' ' , ` `")
        if "English" in language:       #if the film is English
            media_type = str(tree.xpath('//*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[3]/text()'))
            media_type = media_type.strip("[ ] ' ' , ` `")
            if media_type != '':        #Check the page is for a film
                genres = str(tree.xpath('//*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[1]/span/text()'))
                genres += str(tree.xpath('//*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[2]/span/text()'))
                genres += str(tree.xpath('//*[@id="title-overview-widget"]/div[2]/div[2]/div/div[2]/div[2]/div/a[3]/span/text()'))
                if "Adult" not in genres:       #Make sure the film is not a porno
                    storyline = str(tree.xpath('//*[@id="titleStoryLine"]/div[1]/p/text()'))    #The xpath for the storyline from webpage
                    storyline = storyline.strip("[ ] ' ' , ` `")
                    #Save the resutls in a txt file
                    f = open('FilmSummary/' + str(counter) +'.txt', 'w')
                    f.write(storyline)
                    f.close()
                    counter += 1
                    print (counter)
                    print ("Valid")
    #             else:
    #                 print ("NOT VALID GENRE\n")
    #         else:
    #             print ("NOT VALID MEDIA TYPE\n")
    #     else:
    #         print ("NOT VALID LANGUAGE\n" + language)
    # else:
    #     print ("NOT VALID WEB PAGE\n")

    page_number_int += 1

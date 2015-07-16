Facebook Friends
================
Data Mining and Visualization
Experiment #1

Concept
-------
I wanted to see if I could mine data on when I became friends with all my friends, and then use D3 to visualize the data. The purpose being twofold: first, to learn how to parse data from Facebook via their API, and second, to learn how to bind data with D3 and present it.

Implementation
--------------
Initially I wanted to use the Graph API to grab my friending data, but unfortunately those types of queries have been pulled from the Graph API, meaning that if you want to grab that data you have to go through the web interface. 
Going into 'user activity', you can specify a specific kind of activity. I chose 'friends' and was presented with a list of text data saying who I asked to be my friend and who accepted. After painstakingly scrolling through 7 years of friends data (in order to inflate the entire list), I was rewarded with a .html which contained all the data I needed.
I then used Cheerio to parse the data, the results of which you can find in html_parse (if you'd like a reference for a similar data mining project).
Since this was my first experience parsing fb data, I ended up storing it in a really janky JSON structure, so my first order of business on the visualization side was to restructure the data before feeding it into D3.
Once I had the data on the D3 side of things, I used the histogram layout to bind the data to a reasonable looking bar graph. 

References
----------

Cheerio Parsing in a general sense
https://gist.github.com/patorjk/a0a1a1a67ecdd99524a5

Ensure Child Element text isn't returned
http://viralpatel.net/blogs/jquery-get-text-element-without-child-element/

For D3 histogram
http://stackoverflow.com/questions/17745682/d3-histogram-date-based?lq=1

Thoughts
--------
While this project is incredibly simplistic, it does provide me with some insight into the various stages of implementation in data analytics and visualization. It was interesting to realize that parsing html content is much easier that one might suppose: even with my modest understanding of Javascript I was able to use a third party tool to parse page content.
It is also interesting to note the benefits of having a solid API. If Facebook had a better API implementation, my parser wouldn't have been necessary. In the future growth of interconnected internet applications, good API implementation is essential. If Facebook and the other major players in the current internet want to maintain their dominance and become 'platforms' for future growth, they must recognize the impotance of having a readily accessible and simple API.
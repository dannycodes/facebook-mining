var cheerio = require('cheerio');
var fs = require('fs');
var data = {};

function parseFacebook ()
{
	$ = cheerio.load(fs.readFileSync('fb_friends.html', 'utf8'))
	 
	// var by_month = $('.fbTimelineLogBody').find('.fbTimelineSection')

	$('.fbTimelineLogBody').find('.fbTimelineSection').each(function (index, elem)
	{
		console.log("index: " + index)
		// Get the month and year
		var year = $(elem).find($('._iqq')).first().clone().children().remove().end().text().split(" ")[1];

		if ($(elem).children.length != 0)
		{
			// instantiate a list to put in data
			var each_month = {}
			// Get to the data layer in DOM
			var parse_layer = $(elem).find('.pam').first()
			if (parse_layer.length == 0)
			{
				return true
			} else {
				// get a list of each element in the parsing layer
				var friends_that_day = [];
				var day;
				var month;
				
				var all_parse_layer = $(elem).find('.pam');
				$(all_parse_layer).each( function (i, e)
				{
					if ($(e).hasClass('_5ep8'))
					{
						// If we get to a new day, store the current data in each_month,
						// then get the new day and reset the friend list
						day = $(e).text().split(" ")[1];
						month = $(e).text().split(" ")[0];
						friends_that_day = [];

					} else if ($(e).hasClass('_5shk')) {
						var length = $(e).find('._42ef').length-1; // zero index
						$(e).find('._42ef').each( function (length) 
						{
							return function (i, e)
							{
								if ($(e).children().first().text())
								{
									var str_to_parse = $(e).children().first().text();
									if (str_to_parse.indexOf('became friends with') >= 0)
									{
										var friend = str_to_parse.replace("Daniel Adelberg became friends with ", "").slice(0,-1)
										friends_that_day.push(friend)
										if (i == length)
										{
											each_month[day] = {friends : friends_that_day}
										}
									} 
								}
							}
						}(length));
					}
				});
			}			
			var year_and_month = month + " " + year
			data[year_and_month] = each_month
		}
		
	});
	console.log(data)
	fs.writeFile('parsed_data.txt', JSON.stringify(data), function (err)
	{
		if (err) throw err;

		console.log("Success")
	})
}

parseFacebook()
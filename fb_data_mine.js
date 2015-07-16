$(function ()
{
	$('#input').on('change', function (e)
	{
	  file = e.target.files[0]
	  var reader = new FileReader();
	  // We let the user upload their txt file
	  reader.onload = function (file)
	  {
	  	// parse txt file to json and then reformat it for D3
	  	var data = JSON.parse(file.target.result);
	  	var date_friends = [];
	  	var dates = [];
	  	for (key in data)
	  	{
	  		var days = data[key];
	  		var year = key.split(" ")[1];
	  		var month = key.split(" ")[0];
	 			for (key in days)
	 			{
	 				var day = key
	 				months = 
	 				{
	 					'January' : 0,
	 					'February' : 1,
	 					'March' : 2,
	 					'April' : 3,
	 					'May' : 4,
	 					'June' : 5,
	 					'July' : 6,
	 					'August' : 7,
	 					'September' : 8,
	 					'October' : 9,
	 					'November' : 10,
	 					'December' : 11
	 				}
	 				var month_num = months[month]

	 				var date = new Date(year, month_num, day);
	 				date_friends.push( { date : date , friends : days[key]['friends'] } )
	 				dates.push(date)
	 			}
	  	
	  	}
			dates.sort(function (a, b)
			{
				if (a > b)
				{
					return -1
				}
				if (a < b)
				{
					return 1
				}
				return 0;
			})
			start_time = dates[dates.length-1];
			end_time = dates[0];

	  	start_d3(date_friends, start_time, end_time)

	  }
	  reader.readAsText(file)
	})
});

// Pass the formatted data as well as the domain range to D3
function start_d3(dataset, start, end)
{
  var w = 800;
  var h = 500;
  var textBump = 30;
  var barPadding = 1;

	// Flatten data into freq array 
	frequency_arr = []
	for (var i=0; i<dataset.length ; i++)
	{
		var count = dataset[i].friends.length;
		var UNIXTime = +dataset[i].date;
		for (var j=0; j<count; j++)
		{
			frequency_arr.push(UNIXTime);
		}
	}

	// Pad SVG canvas, beautification
 	var margin = {top: 10, right: 30, bottom: 30, left: 30},
                width = w - margin.left - margin.right,
                height = h - margin.top - margin.bottom;

  // linear scale UNIX timestamps to svg 
	var x = d3.scale.linear()
	    .domain([+start, +end])
	    .range([0, width]).nice();

	// Define data as histogram
	var data = d3.layout.histogram()
	    .bins(x.ticks(30))
	    (frequency_arr);

	// Ensure data is mapped s.t max y value fills height
	var y = d3.scale.linear()
	    .domain([0, d3.max(data, function (d) { return d.y } )])
	    .range([height,0]);

  // Format timestamps as mnth / year for axis
	var xAxis = d3.svg.axis()
			.scale(x)
			.tickFormat(function (d) { return d3.time.format('%b \'%y')(new Date(d));} )
			.orient('bottom');

	var svg = d3.select("#mount").append("svg").attr('class','svg').attr('height', h).attr('width' , w)
	    .append('g')
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var bar = svg.selectAll('.bar')
	    .data(data)
	    .enter().append('g')
	    .attr("class", 'bar')
	    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

	// for width, we need to offset data by data[0].x to account for range not starting at 0
	bar.append('rect')
	    .attr('x', 0)
	    .attr('y', 0)
	    .attr('height', function (d) { return (height - y(d.y) )})
	    .attr('width', function (d) { return x(d.dx+data[0].x) - 1 });

	bar.append('text')
		.attr('dy', '.75em')
		.attr('y', 6)
		.attr('x', function (d) { return x(data[0].x + d.dx) / 2 })
		.attr('text-anchor', 'middle')
		.text(function (d) { return d.y });

	svg.append('g')
		.attr('class', 'x axis')
		.attr("transform", 'translate(0,' + height + ')')
		.call(xAxis);
}



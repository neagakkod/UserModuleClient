var TokenMarketController = function(app)
{
	var self = this;
	
	self.giveFakeData = function()
	{
		var data = [], totalPoints = 300;
		if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
	}
	
	self.launchFakeScreen = function()
	{
		console.log("fak")
			// setup plot
		var options = {
			series: { shadowSize: 0 }, // drawing is faster without shadows
			yaxis: { min: 0, max: 100 },
			xaxis: { show: false }
		};
		var plot = $.plot($("#placeholder2"), [ self.giveFakeData() ], options);
	}
	
	self.launch = self.launchFakeScreen
}
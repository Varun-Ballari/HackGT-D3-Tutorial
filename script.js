var array = [10, 30, 50, 20, 60, 40, 10, 30, 50, 20, 60, 40, 10, 30, 50, 20, 60, 40];

//SORT ARRAY//
array.sort(function compareNumbers(a,b) {
 return a-b;
})

var height = 300,
	width = 400,
	space = 5;

var scaleHeight = d3.scale.linear()
       .domain([0, d3.max(array)])
       .range([0, height]);
var scaleWidth = d3.scale.ordinal()
     .domain(d3.range(0, array.length))
     .rangeBands([0, width],.1)

//--UNCOMMENT FOR COLOR SCALE ----
var colors = d3.scale.linear()
  .domain([0, array.length])
  .range(['#F95358', '#F2A26A'])

//--UNCOMMENT FOR TOOLTIPS ---------
var tooltip = d3.select('body').append('div')
 .style('position','absolute')
 .style('padding', '0 10px')
 .style('background', 'white')
 .style('opacity',0)

d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#B3E3EB')
  .selectAll('rect')
  	.data(array)
  	.enter().append('rect')
	// .attr('width', 50)
  	.attr('width', scaleWidth.rangeBand())
  	.attr('height', function(d) {
		return scaleHeight(d);
    })
  	.style('fill', function(d, i) {
		return colors(i);
	})
    .attr('x', function(d,i) {
      return scaleWidth(i);
    })
    .attr('y', function(d) {
		  return height - scaleHeight(d);
    })
	.on('mouseover', function(d) {
		tooltip.transition()
		.style('opacity', .9)
		tooltip.html(d)
		.style('left', (d3.event.pageX) + 'px')
		.style('top', (d3.event.pageY) + 'px')
		d3.select(this)
		  .style('opacity',.5)
	})
	.on('mouseout', function(d) {
		d3.select(this)
		.style('opacity', 1)
	})



//--- UNCOMMENT FOR N-TH CHILD DEMO ----
d3.select('#animals')
 .selectAll('.animal:nth-child(3n)')
 .style('background', '#B3E3EB')
 // .remove()


//--- UNCOMMENT FOR TRANSITION DEMO ----
var n = 6;
var duration = 800;
d3.selectAll('#animals .animal')
  .transition()
  .delay(function(d,i) {
	  return i/n * duration
  })
  .style("color", "red");






//-- UNCOMMENT FOR PIE CHART ------
var width = 400,
    height = 400,
    radius = 200
    colors = d3.scale.category20c();

var piedata = [
    {
        value: 10
    },{
        value: 10
    },{
        value: 50
    }
]

var pie = d3.layout.pie()
    .value(function(d) {
        return d.value;
    })

var arc = d3.svg.arc()
	.outerRadius(radius)



var pieChart = d3.select('#pie').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+(width-radius)+','+(height-radius)+')')
    .selectAll('path').data(pie(piedata))
    .enter().append('path')
        .attr('fill', function(d, i) {
            return colors(i);
        })
        .attr('d', arc)

d3.csv("Unemployment.csv",function(d) {
    d= _.map(d,function(x) {
        x.Unemployment=parseInt(x.Unemployment);
        return x; })

    var slugify=function(s) {
        return s.toLowerCase().replace(/[^a-z0-9-]/,"-")
        };

    var width=500;
    var height=500;
    var margin=[10,10,50,50]

    var years = _.unique(_.pluck(d,"Year"));

    var svg=d3.select("#viz").append("svg")
        .attr("width",width)
        .attr("height",height)

    var vls=_.pluck(d,"Unemployment")
    var xscale=d3.scale.linear()
        .domain([_.min(vls),_.max(vls)])
        .range([margin[3],width-margin[1]]);

    var yscale=d3.scale.linear()
        .domain([_.min(vls),_.max(vls)])
        .range([height-margin[2],margin[0]]);
    
    scd=_.values(_.reduce(d,function(x,y) {
        x[y["Country Name"]]=x[y["Country Name"]] || [];
        x[y["Country Name"]].push(y)
        return x },{}));
    
    var getyear=function(x,year) {
        return _.first(_.filter(x,function(y) {
            return y.Year==year }))
        }
    var scp=function(data,y1,y2) {
        console.log(y1,y2);
        var circles=svg.selectAll("circle") 
            .data(data)
            .enter()
            .append("circle")
            .attr("id",function(d) {
                console.log("adding");
                return slugify(d[0]["Country Name"]) })
            .attr("r",3)
         
        circles.append("title").text(function(d) { return d[0]["Country Name"]});
        
        circles=d3.selectAll("circle");
        circles.transition()
            .attr("cx",function(d) { return xscale(getyear(d,y1).Unemployment) })
            .attr("cy",function(d) {
                console.log("repositioning");
                return yscale(getyear(d,y2).Unemployment) }) 

        svg.select("#xlab")
            .text(y1);
        svg.select("#ylab")
            .text(y2);
                }

    var xaxis=d3.svg.axis()
        .orient("bottom")
        .scale(xscale)
        .ticks(5)
        .tickFormat(function(d) { return d+"%" });

    var yaxis=d3.svg.axis()
        .orient("left")
        .scale(yscale)
        .ticks(5)
        .tickFormat(function(d) { return d+"%" });

    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate("+[0,height-margin[2]+5]+")")
        .call(xaxis);
    
    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate("+[margin[3]-5,0]+")")
        .call(yaxis);
    
    svg.append("text")
        .attr("id","xlab")
        .attr("x", margin[3]+width/2)
        .attr("y", height-margin[2]+40)
        .attr("text-anchor","middle")

    svg.append("text")
        .attr("id","ylab")
        .attr("transform","translate("+[0,margin[0]+height/2]+"), rotate(90)")
        .attr("text-anchor","middle")

    scp(scd,"2004","2012");
    var selectors=d3.selectAll(".select").append("select")

    selectors.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .attr("value",function(d) { return d; })
        .text(function(d) { return d; });

    selectors.on("change",function(d) {
        console.log(selectors);
        var y1=selectors[0][0].value;
        var y2=selectors[0][1].value;
        scp(scd,y1,y2);
        })
    })

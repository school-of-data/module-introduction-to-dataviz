d3.csv("Unemployment.csv",function(d) { 
    d= _.map(d,function(x) {
        x.Unemployment=parseInt(x.Unemployment);
        x.Year=parseInt(x.Year);
        return x;
        });
    var width=700;
    var height=500;
    var margin = [10,100,50,50];

    var slugify=function(s) {
        return s.toLowerCase().replace(/[^a-z0-9-]/,"-") }

    var svg=d3.select("#viz").append("svg")
        .attr("width",width)
        .attr("height",height);
    
    var years=_.unique(_.pluck(d,"Year"));

    var xscale=d3.scale.linear() 
        .domain([_.min(years),_.max(years)])
        .range([margin[3],width-margin[1]]);

    var yscale=d3.scale.linear()
        .domain([0,_.max(_.pluck(d,"Unemployment"))])
        .range([height-margin[2],margin[0]])
    
    var path=d3.svg.line()
        .x(function(d) {return xscale(d.Year);})
        .y(function(d) {return yscale(d.Unemployment);})
    
    var pdata=_.values(_.reduce(_.sortBy(d,function(x) { return x.Year }),
        function(x,y) {
            x[y["Country Name"]]=x[y["Country Name"]] || [];
            x[y["Country Name"]].push(y);
            return x;
            },
            {}));

    console.log(pdata);
    svg.selectAll("path")
        .data(pdata)
        .enter()
        .append("path")
        .attr("d",function(d) { return path(d) })
        .attr("id",function(d) { return slugify(d[0]["Country Name"]); });
    
    svg.selectAll("text.llabel")
        .data(pdata)
        .enter()
        .append("text")
        .attr("class","llabel")
        .attr("id",function(d) { return "label-"+ slugify(d[0]["Country Name"]) })
        .attr("x",width-margin[1])
        .attr("y",function(d) { 
            return yscale(_.last(d).Unemployment)+3  })
        .text(function(d) { return d[0]["Country Name"] });

     console.log(years);

     var axis=d3.svg.axis()
            .scale(xscale)
            .orient("bottom")
            .tickValues(years)
            .tickFormat(d3.format("0f"))

     svg.append("g")
        .attr("class","axis")
        .attr("transform","translate("+[0,height-margin[2]]+")")
        .call(axis);
   
    var yascale=d3.scale.linear()
        .domain([_.min(_.pluck(d,"Unemployment")),_.max(_.pluck(d,"Unemployment"))
        ])
        .range([yscale(_.min(_.pluck(d,"Unemployment"))),margin[0]]);

    var yaxis=d3.svg.axis()
        .scale(yascale)
        .orient("left")
        .ticks(5)
        .tickFormat(function(d) {
            return d+"%"; });
    
    svg.append("g")
        .attr("class","axis")
        .attr("transform","translate("+[margin[3]-5,0]+")")
        .call(yaxis)
    })

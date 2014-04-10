d3.csv("GDP-UE.csv",function(d) {
    var slugify= function(s) {
        return s.toLowerCase().replace(/[^a-z0-9-]/,"-")
        };

    d= _.map(d, function(x) {
        x.GDP=parseFloat(x.GDP);
        x.Unemployment=parseFloat(x.Unemployment);
        return x;
        })

    var width=500;
    var height=450;
    var margin=[10,200,30,60];

    var scalegdp=d3.scale.linear()
        .domain([_.min(_.pluck(d,"GDP")),_.max(_.pluck(d,"GDP"))])
        .range([height-margin[2],margin[0]]);

    var scaleue=d3.scale.linear()
        .domain([_.min(_.pluck(d,"Unemployment")),_.max(_.pluck(d,"Unemployment"))])
        .range([height-margin[2],margin[0]]);
        
    var svg=d3.select("#viz").append("svg")
        .attr("width",width)
        .attr("height",height)
    
    var lines=[[margin[3],margin[0],margin[3],height-margin[2]],
           [width-margin[1],margin[0],width-margin[1],height-margin[2]]];
    
    svg.selectAll("line.base")
        .data(lines)
        .enter()
        .append("line")
        .attr("class","base")
        .attr("x1",function(d) { return d[0] })
        .attr("y1",function(d) { return d[1] })
        .attr("x2",function(d) { return d[2] })
        .attr("y2",function(d) { return d[3] });

    var dots=svg.selectAll("circle.dot1")
        .data(d)
        .enter()
        .append("circle")
        .attr("class","dot dot1")
        .attr("r",3)
        .attr("id",function(d) { return "dot1-"+slugify(d["Country Name"]) })
        .attr("cx",margin[3])
        .attr("cy",function(d) { return scalegdp(d.GDP) });

    var dots2=svg.selectAll("circle.dot2")
        .data(d)
        .enter()
        .append("circle")
        .attr("class","dot dot2")
        .attr("r",3)
        .attr("id",function(d) { return "dot2-"+slugify(d["Country Name"])
        })
        .attr("cx",width-margin[1])
        .attr("cy",function(d) { return scaleue(d.Unemployment) })
     
     var lines=svg.selectAll("line.slope")
        .data(d)
        .enter()
        .append("line")
        .attr("class","slope")
        .attr("id",function(d) { return "line-"+slugify(d["Country Name"])
        })
        .attr("x1",margin[3])
        .attr("x2",width-margin[1])
        .attr("y1",function(d) { return scalegdp(d.GDP) })
        .attr("y2",function(d) { return scaleue(d.Unemployment) })

    var lab1=svg.selectAll("text.label1")
        .data(d)
        .enter()
        .append("text")
        .attr("class","label label1")
        .attr("id",function(d) { return "label-"+slugify(d["Country Name"])
        })
        .attr("x", 0)
        .attr("y", function(d) { return scalegdp(d.GDP)+5 })
        .text(function(d) { return d3.format(",f")(d.GDP) });
    
    var lab2=svg.selectAll("text.label2")
        .data(d)
        .enter()
        .append("text")
        .attr("class","label label2")
        .attr("id",function(d) { return "label2-"+slugify(d["Country Name"])
        })
        .attr("x", width-margin[1]+5)
        .attr("y", function(d) { return scaleue(d.Unemployment)+5 })
        .text(function(d) { return d3.format("f")(d.Unemployment)+"% "+ d["Country Name"] });
    
    svg.append("text")
        .attr("id","xlab")
        .attr("x",margin[3])
        .attr("y",height-margin[2]+20)
        .attr("text-anchor","middle")
        .text("GDP/Capita (US$)")
    svg.append("text")
        .attr("id","ylab")
        .attr("x",width-margin[1])
        .attr("y",height-margin[2]+20)
        .attr("text-anchor","middle")
        .text("Youth Unemployment (%)")
    })

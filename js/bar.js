d3.csv("Unemployment.csv",function (d) {
    console.log(d);
    d=_.map(d,function(x) {
        x.Unemployment=parseInt(x.Unemployment);
        return  x;
        })
    var width=500; 
    var height=500;
    
    var bcyear = function(y) {
        d3.selectAll("#viz> svg").remove()
        var svg=d3.select("#viz").append("svg")
            .attr("height",height)
            .attr("width",width);
        var yd=_.sortBy(_.filter(d,function(x) { return x.Year==y; r}),
            function(x) {return x.Unemployment })
        barchart(svg,yd,"Unemployment","Country Name");
        }
    bcyear("2004");    

    var years=_.unique(_.pluck(d,"Year"))
    var sel=d3.select("#select").append("select");
    sel.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .attr("value",function(d) { return d; })
        .text(function(d) { return d; });

    sel.on("change",function() {
        var y=sel[0][0].value;
        console.log(y);
        bcyear(y);
        });
    });

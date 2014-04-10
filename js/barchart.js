barchart= function (svg, data, prop, label) {
            var slugify = function(s) {
                return s.toLowerCase().replace(/[^a-z0-9-]/,"-")
                }
            var height=parseInt(svg.attr("height"));
            var width=parseInt(svg.attr("width"));
            var margin = 0;
            var bw=height/(data.length * 1.0) *0.8;
            var bs=height/(data.length * 1.0) *0.2;
            var xscale = d3.scale.linear()
                .domain([0, _.max(_.pluck(data, prop))])
                .range([margin,parseInt(svg.attr("width"))-margin]);
        
            var rs=svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", function(d,i) {
                    return (i+1)*bs+i*bw;
                    })
                .attr("x",0)
                .attr("id",function(d) { return slugify(d[label]); })
                .attr("height", bw)
                .attr("width" , 0);
            rs.transition(5)
                .attr("width", function(d,i) {
                    return xscale(d[prop]);
                    })
    
            if (label) {       
                svg.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("transform", function(d,i){ return " " +
                        "translate("+ [margin+5,(i+1)*bs+i*bw+7 + bw/2 ] + ")"})
                    .text(function(d) { return d[label] + ": " + d[prop] });
                    }
            }

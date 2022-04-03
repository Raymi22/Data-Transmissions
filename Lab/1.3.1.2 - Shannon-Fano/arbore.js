// Sample of how the compression tree should look like.
// A0 is the father (the root of the tree)
// each level introduce a byte in the final code 
// each node could have maximum 2 children (L - left (introduce a "0") and 
// R - right (introduce a "1"))
// the node name should contain the name of previous visited nodes.
// ex.: A0LR - Level 2, code: 01

// binary tree "IT IS BETTER LATER THAN NEVER"
var treeData ="";
var treeCodes = new Array();

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

	
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

// Build list of characters sorted by their frequency
function buildList(){
  var text = document.getElementById("message").value;
  var chars = new Array();
  var frequency = Array.apply(0, Array(255)).map(function() {}); // indexes represent character in ascii
  for(let i = 0; i < frequency.length; i++) {
    frequency[i] = 0;
  }

  for(let i=0; i < text.length; i++) {
    frequency[text.charCodeAt(i)]++;
  }

  for(let i=0; i < 255; i++) {
    if(frequency[i] != 0) {
      chars.push({key: String.fromCharCode(i), value: frequency[i]});
    }
  }
  
  chars.sort((a, b) => a.value - b.value);
  return chars;
}

function shannon(){
  chars = buildList();
  for(let i=0; i < chars.length; i++) {
    console.log(chars[i].key+" - "+chars[i].value);
  }

  treeData = " {" + recJson(chars, 'A', '0') + " }";

  const tree = JSON.parse(treeData);
  root = d3.hierarchy(tree, function(d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  update(root)

  // Computing compression rate and new codes
  get_codes(chars);

  update_table()
}

// Generating the JSON string
function recJson(array, name, side) {
  var sum = getSum(array);

  name += side;

  if(array.length == 1) {
    treeCodes.push({key: array[0].key, value: name})
    return '"name": "' +   name + ': ' + array[0].key + '"';
  }

  var aux_sum = 0;
  var index;
  for(let i = array.length-1; i>=0; i--) {
    if(parseInt(sum/2) > aux_sum) {
      aux_sum += array[i].value;
      index = i;
    }
  }

  var left = array.slice(0,index);
  var right = array.slice(index);

  return ' "name": "' + name + '", "children": [ { ' + recJson(left, name, 'L') + ' }, { ' +   recJson(right, name, 'R') + ' } ]';
}

// Generating the new code for the characters
function get_codes(chars) {
  var cod = "";
  var c = 0;
  var o = getSum(chars)*8;

  for(let i = 0; i < treeCodes.length; i++) {
    cod = "";
    for(let j = 2; j < treeCodes[i].value.length; j++) {
      if(treeCodes[i].value[j] == 'R')
        cod += '1';
      else
        cod += '0';
    }
    c += cod.length * chars[i].value;
    treeCodes[i].value = cod;
  }
  compresion_rate = (1-c/o)*100

  console.log("Compression rate: "+compresion_rate)
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}

function getSum(array) {
  var sum = 0; 
  for(let i = 0; i < array.length; i++) {
    sum = sum + array[i].value;
  }
  return sum;
}

// Updating the html table
function update_table() {
  var th = "<tr>";
  var t = "<tr>";

  for (var i = 0; i < treeCodes.length; i++){
        th += "<td>" + treeCodes[i].key + "</td>";

        t += "<td>" + treeCodes[i].value + "</td>";
  }
  th += "</tr>";
  t += "</tr>";

  document.getElementById("tabel_cod").innerHTML = "";
  document.getElementById("tabel_cod").innerHTML += th;
  document.getElementById("tabel_cod").innerHTML += t;

  document.getElementById("compression_rate").innerHTML = "";
  document.getElementById("compression_rate").innerHTML += "Compression rate: " + compresion_rate;
}
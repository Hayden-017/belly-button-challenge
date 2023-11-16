d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
});
var trace1 = {
    x: data.sample_values.slice(0, 10),
    y: data.otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`),
    type: "bar",
    orientation: "h",
    text: data.otu_labels.slice(0, 10)
  };
  
  var barData = [trace1];
  
  Plotly.newPlot("bar", barData);
var trace2 = {
    x: data.otu_ids,
    y: data.sample_values,
    mode: "markers",
    marker: {
      size: data.sample_values,
      color: data.otu_ids,
      colorscale: "Earth"
    },
    text: data.otu_labels
  };
  
  var bubbleData = [trace2];
  
  Plotly.newPlot("bubble", bubbleData); 
  var metadataPanel = d3.select("#sample-metadata");

  function displayMetadata(sample) {
    var metadata = data.metadata.find(item => item.id === parseInt(sample));
    metadataPanel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }
  
  displayMetadata(initialSample);
var dropdown = d3.select("#selDataset");

data.names.forEach(sample => {
  dropdown.append("option").text(sample).property("value", sample);
});

dropdown.on("change", function() {
  var selectedSample = d3.select(this).property("value");
  updateBarChart(selectedSample);
  updateBubbleChart(selectedSample);
  displayMetadata(selectedSample);
});  
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  
  function updateBarChart(sample) {
    var trace1 = {
      x: data.samples.find(entry => entry.id === sample).sample_values.slice(0, 10),
      y: data.samples.find(entry => entry.id === sample).otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`),
      type: "bar",
      orientation: "h",
      text: data.samples.find(entry => entry.id === sample).otu_labels.slice(0, 10)
    };

    var barData = [trace1];

    Plotly.newPlot("bar", barData);
  }

  function updateBubbleChart(sample) {
    var trace2 = {
      x: data.samples.find(entry => entry.id === sample).otu_ids,
      y: data.samples.find(entry => entry.id === sample).sample_values,
      mode: "markers",
      marker: {
        size: data.samples.find(entry => entry.id === sample).sample_values,
        color: data.samples.find(entry => entry.id === sample).otu_ids,
        colorscale: "Earth"
      },
      text: data.samples.find(entry => entry.id === sample).otu_labels
    };

    var bubbleData = [trace2];

    Plotly.newPlot("bubble", bubbleData);
  }

  function displayMetadata(sample) {
    var metadataPanel = d3.select("#sample-metadata");
    var metadata = data.metadata.find(item => item.id === parseInt(sample));
    
    metadataPanel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  }

  var dropdown = d3.select("#selDataset");
  data.names.forEach(sample => {
    dropdown.append("option").text(sample).property("value", sample);
  });

  var initialSample = data.names[0];

  updateBarChart(initialSample);
  updateBubbleChart(initialSample);
  displayMetadata(initialSample);

  dropdown.on("change", function() {
    var selectedSample = d3.select(this).property("value");
    updateBarChart(selectedSample);
    updateBubbleChart(selectedSample);
    displayMetadata(selectedSample);
  });
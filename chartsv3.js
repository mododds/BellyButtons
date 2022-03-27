

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      console.log()
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
//   // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var sampledata = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var sortedsamples = sampledata.filter(sampleObj => sampleObj.id == sample);
      
      //  5. Create a variable that holds the first sample in the array.
      var first_sample = sortedsamples[0];

      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ID = first_sample.otu_ids;
      var label = first_sample.otu_labels;
      var sampleValue = first_sample.sample_values;

      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      var yticks = otu_ID.map(element => {return`OTU ID: ${element}`}).slice(0,10).reverse(); 
  
      // 8. Create the trace for the bar chart. 
      var trace = {
        //x: sampleValue.slice(0,10).reverse(),
        x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
        y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
        //type: "bar"    
        //y: yticks,
        //text: label.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      };
      var data = [trace];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Culters Found"
      };
      // 10. Use Plotly to plot the data with the layout. 
      
    });
    Plotly.newPlot("bar_chart", data, barLayout);
};



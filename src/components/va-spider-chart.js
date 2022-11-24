import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-spider-chart', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      element: {
        type: HTMLElement
      },
      qualities: {
        type: Object
      }
    }
  }

  render = () => {

    if (!this.element) return;

    anychart.onDocumentReady(() => {

        // var backgroundColour = this.colour;

        // the data for the chart
        var qualities = this.qualities;
    
        // create radar chart
        var chart = anychart.radar();
        
        // set start angle of the chart
        chart.startAngle(-30);
    
        // set chart yScale settings
        chart.yScale()
          .minimum(0)
          .maximum(10)
          .ticks({'interval':2});
        
          // removing dashes, y-axis labels, and hover tooltip for data
          chart.yAxis().ticks().enabled(false)
          chart.xAxis().ticks().enabled(false)
          chart.yAxis().labels().enabled(false)
          chart.tooltip(false);
    
          // customising the look of the quality labels
          chart.xAxis().labels({
            fontFamily: "Mulish",
            fontSize: "1em",
            fontColor: "#353A46",
            fontWeight: 700
          });
    
        // colouring each section
        chart.yGrid().palette(["#FEF9EC", "#FDF3D8", "#FCECC5", "#FBE6B1", "#FAE09E"]);
    
        // applying stroke and fill colours
        chart.line(qualities).stroke({
          color: "#424C70",
          thickness: 4,
          lineJoin: "round"
        });
        var series = chart.area(qualities).fill("#FFFFFF", 0.5);
    
        // set container id for the chart
        chart.container(this.element);
        // initiate chart drawing
        
        // chart.background(backgroundColour);
        chart.draw();
    
      });
  }
  
})


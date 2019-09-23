import React, { Component } from "react";

import "./App.css";
import { Grid, GridCell } from "rmwc/Grid";
import { Select } from "rmwc/Select";
import { Toolbar, ToolbarRow, ToolbarSection } from "rmwc/Toolbar";
import { Slider } from "rmwc/Slider";
import '@material/slider/dist/mdc.slider.css';
import * as d3 from 'd3';

  d3.selection.prototype.position = function() {

    var el = this.node();
    var elPos = el.getBoundingClientRect();
    var vpPos = getVpPos(el);

    /*function getVpPos(el) {
        if(el.parentElement.tagName === 'svg') {
            return el.parentElement.getBoundingClientRect();
        }
        return getVpPos(el.parentElement);
    }
    */
    function getVpPos(el) {
        if(el.parentNode.nodeName === 'svg') {
            return el.parentNode.getBoundingClientRect();
        }
        return getVpPos(el.parentNode);
    }

    return {
        top: elPos.top - vpPos.top,
        left: elPos.left - vpPos.left,
        width: elPos.width,
        bottom: elPos.bottom - vpPos.top,
        height: elPos.height,
        right: elPos.right - vpPos.left
    };
  };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "Theme001",
      value: 0,
      opacityValue: 100,
      pos: '',
      themes: {
        Theme001: {
          tint001: "#03A9F4",
          tint002: "#E91E63",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme002: {
          tint001: "#B31C8C",
          tint002: "#2C5880",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme003: {
          tint001: "#D72420",
          tint002: "#00A7E4",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme004: {
          tint001: "#D72420",
          tint002: "#00CC4F",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme005: {
          tint001: "#ED1B24",
          tint002: "#F8A61C",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme006: {
          tint001: "#FC6621",
          tint002: "#1CAECD",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme007: {
          tint001: "#ED1F25",
          tint002: "#E68A39",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        },
        Theme008: {
          tint001: "#F5A349",
          tint002: "#26649E",
          tint003: "#616161",
          tint004: "#E0E0E0",
          tint005: "#EEEEEE"
        }
      }
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState(
      {
        index: e.target.value
      },
      function() {
        let tint001_color = this.state.themes[this.state.index].tint001;
        let tint002_color = this.state.themes[this.state.index].tint002;
        let tint003_color = this.state.themes[this.state.index].tint003;
        let tint004_color = this.state.themes[this.state.index].tint004;
        let tint005_color = this.state.themes[this.state.index].tint005;

        d3.select('svg').selectAll('#tint001').attr('fill', tint001_color)
        d3.select('svg').selectAll('#tint002').attr('fill', tint002_color)
        d3.select('svg').selectAll('#tint003').attr('fill', tint003_color)
        d3.select('svg').selectAll('#tint004').attr('fill', tint004_color)
        d3.select('svg').selectAll('#tint005').attr('fill', tint005_color)

        /*let svgs = document.querySelectorAll(".svg");
        svgs.forEach(svg => {
          let tint001_paths = svg.getSVGDocument().querySelectorAll("#tint001");
          tint001_paths.forEach(path => {
            path.setAttribute("fill", tint001_color);
          });
          let tint002_paths = svg.getSVGDocument().querySelectorAll("#tint002");
          tint002_paths.forEach(path => {
            path.setAttribute("fill", tint002_color);
          });
          let tint003_paths = svg.getSVGDocument().querySelectorAll("#tint003");
          tint003_paths.forEach(path => {
            path.setAttribute("fill", tint003_color);
          });
          let tint004_paths = svg.getSVGDocument().querySelectorAll("#tint004");
          tint004_paths.forEach(path => {
            path.setAttribute("fill", tint004_color);
          });
          let tint005_paths = svg.getSVGDocument().querySelectorAll("#tint005");
          tint005_paths.forEach(path => {
            path.setAttribute("fill", tint005_color);
          });
        });*/
      }
    );
  }

  componentDidMount() {
    d3.xml('./img/New_A_001.svg')
    .then(data => {
        d3.select('div#mGridCell').node().append(data.documentElement)
    })

    /*d3.xml("./img/New_A_001.svg", function(xml) {
      var importedNode = document.importNode(xml.documentElement, true);
      console.log("asdfasdf", importedNode)
      d3.select("div#mGridCell")
        .each(function() {
          this.appendChild(importedNode);
        })
      });*/
  }
  
  onSlider(e) {
    this.setState({value: e})

    let mSVG = d3.select('svg')

    if (this.state.pos == '') {
      this.setState({pos: mSVG.select('.tint001').position()})

      // mSVG.select(".tint001")
      // .attr('x',function(d,i){
      //     // get x coord
      //     console.log(this.getBBox().x, 'or', d3.select(this).attr('x'))
      // })
      // .attr('y',function(d,i){
      //     // get y coord
      //     console.log(this.getBBox().y)
      // })
    }

    mSVG.select('.tint001')
      .attr('transform', "rotate(" + e + " " + this.state.pos.left + " " + this.state.pos.bottom + ")")
      //.attr('transform', "rotate(" + e + " 340 120)")

/*
    let svgs = document.querySelectorAll(".svg");
    svgs.forEach(svg => {
      let tint001_paths = svg.getSVGDocument().querySelectorAll(".tint001");
      tint001_paths.forEach(path => {
        path.setAttribute("transform", "rotate(" + e + " 340 120)");
      });
    })*/
  }

  onOpacitySlider(e){
    this.setState({opacityValue: e})

    let mSVG = d3.select('svg')

    mSVG.select('.tint001')
      .attr('opacity', e/100)
  }

  render() {
    return (
      <div>
        <div>
          <Toolbar fixed>
            <ToolbarRow>
              <ToolbarSection alignEnd>
                <Select
                  label="Theme"
                  placeholder=""
                  options={[
                    "Theme001",
                    "Theme002",
                    "Theme003",
                    "Theme004",
                    "Theme005",
                    "Theme006",
                    "Theme007",
                    "Theme008"
                  ]}
                  onChange={this.handleSelect}
                />
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <Grid />
          <br />
          <GridCell id="mGridCell" span="3">
            {/*<object
              className="svg"
              data="./img/New_A_001.svg"
              type="image/svg+xml"
              aria-label="svg"
            />*/}
          </GridCell>
        </div>
        <Slider
            value={this.state.value}
            onChange={evt => this.onSlider(evt.detail.value)}
            onInput={evt => this.onSlider(evt.detail.value)}
            discrete
            step={1}
            max={360}
          />
        <Slider
            value={this.state.opacityValue}
            onChange={evt2 => this.onOpacitySlider(evt2.detail.value)}
            onInput={evt2 => this.onOpacitySlider(evt2.detail.value)}
            discrete
            step={1}
            max={100}
          />
      </div>
    );
  }
}

export default App;

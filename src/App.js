import React, { Component } from "react";

import "./App.css";
import { Grid, GridCell } from "rmwc/Grid";
import { Select } from "rmwc/Select";
import { Toolbar, ToolbarRow, ToolbarSection } from "rmwc/Toolbar";
import { Slider } from "rmwc/Slider";
import '@material/slider/dist/mdc.slider.css';
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: "Theme001",
      value: 180,
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
        let svgs = document.querySelectorAll(".svg");
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
        });
      }
    );
  }

  onSlider(e) {
    this.setState({value: e})

    let svgs = document.querySelectorAll(".svg");
    svgs.forEach(svg => {
      let tint001_paths = svg.getSVGDocument().querySelectorAll(".tint001");
      tint001_paths.forEach(path => {
        path.setAttribute("transform", "rotate(" + e + " 340 120)");
      });
    })
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
          <GridCell span="3">
            <object
              className="svg"
              data="./img/New_A_001.svg"
              type="image/svg+xml"
              aria-label="svg"
            />
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
      </div>
    );
  }
}

export default App;

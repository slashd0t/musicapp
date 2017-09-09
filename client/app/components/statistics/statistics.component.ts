import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
    selector: 'statistics',
    styleUrls: ['./app/components/statistics/statistics.component.css'],
    templateUrl: './app/components/statistics/statistics.component.html'
})

export class StatisticsComponent implements OnInit {

  private SAMPLE_DATA = [];

  private margin: Margin;

  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type

  private x: any;
  private y: any;
  private z: any;
  private g: any;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/getAll', {
      search: 'model=Albums'
    }).subscribe(data => {
      // Read the result field from the JSON response.

      this.SAMPLE_DATA = data.json().map(a => {
          var d = { Album: "", 'pop': 0, 'rock': 0, 'classic': 0};
          d.Album = a.name;

          var pop_c=0,rock_c=0,classic_c=0;
          a.songs.forEach(element => {
            switch (element.genre) {
              case "pop":
                pop_c++;
                break;
            
              case "rock":
                rock_c++;
                break;

              case "classic":
                classic_c++;
                break;
              default:
                break;
            }
          });
          
          d.pop = pop_c;
          d.rock = rock_c;
          d.classic = classic_c;          

          return d;
      });

      this.initMargins();
      this.initSvg();
      this.drawChart(this.SAMPLE_DATA);
      console.log(data.json());
    });

  }

  private initMargins() {
      this.margin = {top: 20, right: 20, bottom: 30, left: 40};
  }

  private initSvg() {
      this.svg = d3.select('svg');

      this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
      this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
      this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      this.x = d3Scale.scaleBand()
          .rangeRound([0, this.width])
          .paddingInner(0.05)
          .align(0.1);
      this.y = d3Scale.scaleLinear()
          .rangeRound([this.height, 0]);
      this.z = d3Scale.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  }

  private drawChart(data: any[]) {

      let keys = Object.getOwnPropertyNames(data[0]).slice(1);

      data = data.map(v => {
          v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
          return v;
      });
      data.sort((a: any, b: any) => b.total - a.total);

      this.x.domain(data.map((d: any) => d.Album));
      this.y.domain([0, d3Array.max(data, (d: any) => d.total)]).nice();
      this.z.domain(keys);

      this.g.append("g")
          .selectAll("g")
          .data(d3Shape.stack().keys(keys)(data))
          .enter().append("g")
          .attr("fill", d => this.z(d.key))
          .selectAll("rect")
          .data(d => d)
          .enter().append("rect")
          .attr("x", d => this.x(d.data.Album))
          .attr("y", d => this.y(d[1]))
          .attr("height", d => this.y(d[0]) - this.y(d[1]))
          .attr("width", this.x.bandwidth());

      this.g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));

      this.g.append("g")
          .attr("class", "axis")
          .call(d3Axis.axisLeft(this.y).ticks(null, "s"))
          .append("text")
          .attr("x", 2)
          .attr("y", this.y(this.y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Songs");

      let legend = this.g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
          .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

      legend.append("rect")
          .attr("x", this.width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", this.z);

      legend.append("text")
          .attr("x", this.width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(d => d);
  }

}


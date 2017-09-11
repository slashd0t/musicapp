import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'about',
  styleUrls: ['./app/components/about/about.component.css'],
  templateUrl: './app/components/about/about.component.html'
})

export class AboutComponent implements OnInit {

  private STATISTICS = [];

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(private http: Http, private fb: FacebookService, private container: ElementRef) {
    fb.init({
      appId: '167814953770444',
      xfbml: true,
      version: 'v2.10'
    });
  }

  share(url: string) {

    let params: UIParams = {
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

  }

  ngOnInit() {
    this.http.get('/getNMostViewed', {
      search: 'model=Songs&n=5'
    }).subscribe(data => {
      // Read the result field from the JSON response.

      this.STATISTICS = data.json();
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
    });

  }

  private initSvg() {
    this.svg = d3.select(this.container.nativeElement).select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.STATISTICS.map((d) => d.name));
    this.y.domain([0, d3Array.max(this.STATISTICS, (d) => d.views)]);
  }

  private drawAxis() {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("views");
  }

  private drawBars() {
    this.g.selectAll(".bar")
      .data(this.STATISTICS)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => this.x(d.name))
      .attr("y", (d) => this.y(d.views))
      .attr("width", this.x.bandwidth())
      .attr("height", (d) => this.height - this.y(d.views));
  }

}

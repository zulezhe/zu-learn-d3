<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 23:10:25
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-21 22:20:52
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div id="scatter_area"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "demo002",
  data() {
    return {
      dataset: [100, 80, 78, 98, 93, 82],
      svgWidth: 500,
      svgHeight: 300,
      barPadding: 5,
    };
  },
  methods: {
    initChart() {
      var nodes = {};
      var width = 1560,
        height = 800;
      var svg = d3
        .select("#scatter_area")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      drawCircle();
      var circle, g;
      function drawCircle() {
        g = svg.append("g").attr("class", "node");
        //圆圈
        circle = g
          .selectAll("circle")
          .data([{ name: "张三", id: 1 }])
          .enter()
          .append("circle")
          .style("fill", "red")
          .style("cursor", "pointer")
          .style("stroke", "#EE8262")
          .attr("r", 28)
          .on("click", function (node) {
            drawMenu(".node", 6, 40, 100);
          });
        circle.append("svg:title").text(function (node) {
          return "我是一个圆";
        });
        g.attr("transform", "translate(300,300)"); //圆圈
      }
      /**
       * 绘制扇形菜单
       */
      function drawMenu(el = ".node", count, innerRadius, outerRadius) {
        let g = svg.select(el);
        let angel = 360 / count; // 每一个扇形的角度
        let radian = (i) => (Math.PI / 180) * angel * i; //每一个扇形最大弧度
        let invertal = (Math.PI / 180) * 10; // 间隔弧度
        for (let i = 1; i <= count; i++) {
          let pathData = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle((Math.PI / 180) * (angel * (i - 1) + 2))
            .endAngle((Math.PI / 180) * (angel * i));
          g.append("path")
            .transition()
            .duration(4000)
            .ease(d3.easeLinear)
            .attr("d", pathData)
            .attr("fill", "#ccc")
            .attr("class", "path");
        }

        setTimeout(() => {
          let nodes = d3.selectAll(".path")._groups[0];
          d3.selectAll(".path").on("click", function (node) {
            console.log("node", this);
          });
        }, 1000);
      }
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style scoped lang="scss">
.base-container {
  width: 100%;
  height: 100%;
}
</style>

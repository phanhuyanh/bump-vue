<template>
  <div class="-bump-wrapper" style="position: relative;width:100%;height:100%;">
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%" 
      ref="svg" 
      @mouseover="visible"
      @mouseleave="visible"
    >
      <rect :fill="background" :width="bounding.width" :height="bounding.height" />

      <g transform="translate(60, 40)">
        <g>
          <line
            v-for="(item, idx) in horizontals" 
            :key="idx" 
            :x1="(idx + 1) * disLineH"
            y1="0" 
            :x2="(idx + 1) * disLineH"
            :y2="height"
            stroke="#dddddd"
            stroke-width="1"
            opacity="1"
          />
        </g>

        <g>
          <text
            v-for="(item, idx) in horizontals"
            :key="idx"
            dominant-baseline="alphabetic" 
            text-anchor="middle" 
            transform="translate(0, -10) rotate(0)" 
            style="fill: rgb(106, 124, 137); font-size: 11px; font-family: sans-serif;"
            :x="(idx + 1) * disLineH"
            y="0"
          >{{ item }}</text>
        </g>

        <g>
          <text
            v-for="(item, idx) in horizontals"
            :key="idx"
            dominant-baseline="alphabetic"
            text-anchor="middle"
            style="fill: rgb(106, 124, 137); font-size: 11px; font-family: sans-serif;"
            transform="translate(0, 20)"
            :x="(idx + 1) * disLineH"
            :y="height"
          >{{ item }}</text>
        </g>

        <g>
          <line
            v-for="(item, idx) in verticals"
            :key="idx"
            x1="0"
            :y1="(idx + 1) * disLineV"
            :x2="width"
            :y2="(idx + 1) * disLineV"
            stroke="#dddddd"
            stroke-width="1"
            opacity="1"
          />
        </g>

        <g>
          <text
            v-for="(item, idx) in verticals"
            :key="idx"
            style="fill: rgb(106, 124, 137); font-size: 11px; font-family: sans-serif;"
            x="0"
            :y="(idx + 1) * disLineV"
            transform="translate(-15, 0) rotate(0)"
            dominant-baseline="central"
            text-anchor="middle"
          >{{ item }}</text>
        </g>

        <g>
          <text
            v-for="(item, idx) in data"
            :key="idx"
            style="fill: rgb(106, 124, 137); font-size: 11px; font-family: sans-serif;"
            :x="width"
            :y="(idx + 1) * disLineV"
            dominant-baseline="central"
            text-anchor="middle"
            transform="translate(30, 0)"
          >{{ item.id }}</text>
        </g>

        <g id="cubiez">
          <path
            v-for="(item, idx) in data"
            :key="item.id"
            opacity="1"
            fill="transparent"
            :stroke="colors[idx]"
            stroke-width="3"
            stroke-linecap="round"
            :d="cubiez(item.data)"
            @mouseover="mouseover($event, idx)"
            @mouseleave="mouseleave($event, idx)"
            ref="path"
            :data-index="idx"
          />
        </g>

        <g
          v-for="(item, idx) in data"
          :key="idx"
        >
          <g v-for="(point, i) in item.data" :key="i">
            <circle
              r="6"
              :cx="findCoordinate(point).x"
              :cy="findCoordinate(point).y"
              :stroke="colors[idx]"
              stroke-width="3"
              fill="none"
              @mouseover="mouseover($event, idx)"
              :data-index="idx"
              class="point"
            />

            <circle
              r="4.6"
              :cx="findCoordinate(point).x"
              :cy="findCoordinate(point).y"
              fill="#fff"
              @mouseover="mouseover($event, idx)"
              :data-index="idx"
              class="circle"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Bump',
  props: {
    data: {
      type: Array,
      required: true,
      validator: function(value) {
        return value.every(e => typeof e == 'object' && e.id && Array.isArray(e.data))
      }
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  data: () => ({
    horizontals: [],
    verticals: [],
    width: 0,
    height: 0,
    disLineH: 0,
    disLineV: 0,
    x: 60,
    y: 40,
    bounding: {},
    colors: ['#0088ff', '#fb9001', '#00ffff7a', '#c40cf1', '#eb0f7e', '#cfdd09',
      'red', 'orange', 'rgba(253, 174, 97, 1)', 'rgba(230, 245, 152, 1)', 'rgba(89, 158, 56, 1)',
      'rgba(239, 141, 51, 1)'
    ],
    focusIndex: -1,
    top: -1,
    left: -1,
    title: ''
  }),
  created() {
    this.data.forEach(e => {
      this.horizontals = this.horizontals.concat(e.data.map(f => f.x))
      this.verticals = this.verticals.concat(e.data.map(f => f.y))
    })

    this.horizontals = [...new Set(this.horizontals)]
    this.verticals = [...new Set(this.verticals)].sort((a,b) => a - b)
  },
  computed: {

  },
  mounted() {
    this.bounding = this.$refs.svg.getBoundingClientRect()

    this.width = this.bounding.width - 2 * this.x
    this.height = this.bounding.height - 2 * this.y

    this.disLineH = this.width / (this.horizontals.length + 1)
    this.disLineV = this.height / (this.verticals.length + 1)
  },
  methods: {
    findCoordinate(point) {
      const { x, y } = point

      const idxH = this.horizontals.findIndex(h => h === x)
      const idxV = this.verticals.findIndex(v => v === y)

      return {
        x: (idxH + 1) * this.disLineH,
        y: (idxV + 1) * this.disLineV
      }
    },
    makeSequence(arr) {
      return arr.concat(1).map((e,i,a) => {
        if(!i) return [{x: 0, y: e.y, absx: true}, e]

        const prev = a[i - 1]
        if(i != a.length -1) return [prev, e]

        return [prev, { x: this.width, y: prev.y, absx: true }]
      })
    },
    cubiez(points) {
      let d = []

      this.makeSequence(points).forEach(point => d.push(this.drawCubiez(point)))

      return d.join` `
    },
    drawCubiez(point) {
      const [{x: x1, y: y1, absx: a1}, {x: x2, y: y2, absx: a2}] = point

      const idxH1 = a1 ? -1 : this.horizontals.findIndex(h => h === x1) + 1
      const idxV1 = this.verticals.findIndex(v => v === y1) + 1

      const spx = idxH1 < 0 ? x1 : idxH1 * this.disLineH
      const spy = idxV1 * this.disLineV

      const idxH2 = a2 ? -1 : this.horizontals.findIndex(h => h === x2) + 1
      const idxV2 = this.verticals.findIndex(v => v === y2) + 1

      const epx = idxH2 < 0 ? x2 : idxH2 * this.disLineH
      const epy = idxV2 * this.disLineV

      const {x: cpx1, y: cpy1} = {x: epx, y: spy}
      const {x: cpx2, y: cpy2} = {x: spx, y: epy}

      return `M ${spx} ${spy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${epx} ${epy}`
    },
    mouseover(e, idx) {
      e.stopPropagation()

      d3.select(`path[data-index='${idx}']`)
      .transition().duration(200)
      .attr('stroke-width', 7)
      .style('opacity', 1)

      d3.selectAll(`circle.point[data-index='${idx}']`)
        .transition().duration(200)
        .attr('r', 9)

      d3.selectAll(`circle.circle[data-index='${idx}']`)
        .transition().duration(200)
        .attr('r', 8.25)

      d3.selectAll(`path:not([data-index='${idx}'])`)
      .transition().duration(200)
      .attr('stroke-width', 1)
      .style('opacity', 0.15)

      d3.selectAll(`circle.point:not([data-index='${idx}']), circle.circle:not([data-index='${idx}'])`)
        .transition().duration(200)
        .attr('r', 0)

      this.title = this.data[idx].id
      const clientX = e.clientX
      const clientY = e.clientY

      this.top = e.clientY
      this.left = e.clientX
    },
    mouseleave(e, idx) {
      d3.select(`path[data-index='${idx}']`)
      .transition().duration(200)
      .attr('stroke-width', 3)

      d3.selectAll(`circle.point[data-index='${idx}']`)
        .transition().duration(200)
        .attr('r', 6)

      d3.selectAll(`circle.circle[data-index='${idx}']`)
        .transition().duration(200)
        .attr('r', 5.25)

      d3.selectAll(`circle.point:not([data-index='${idx}'])`)
        .transition().duration(200)
        .attr('r', 6)

      d3.selectAll(`circle.circle:not([data-index='${idx}'])`)
        .transition().duration(200)
        .attr('r', 5.25)
    },
    visible() {
      d3.selectAll(`path[data-index]`)
      .transition().duration(200)
      .attr('stroke-width', 3)
      .style('opacity', 1)

      d3.selectAll(`circle.point[data-index]`)
        .transition().duration(200)
        .attr('r', 6)

      d3.selectAll(`circle.circle[data-index]`)
        .transition().duration(200)
        .attr('r', 5.25)

      d3.selectAll(`circle.point:not([data-index])`)
        .transition().duration(200)
        .attr('r', 6)

      d3.selectAll(`circle.circle:not([data-index])`)
        .transition().duration(200)
        .attr('r', 5.25)
    }
  }
}
</script>

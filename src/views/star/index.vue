<template>
	<div id="star" class="main">
		<img @mouseover="starUp" @mouseout="desIn" class="topImg" src="../../static/index/mask_topsky.png" />
		<img @mouseover="starDown" @mouseout="desIn" class="bottomImg" src="../../static/index/mask_bottomsky.png" />
		<div @mouseover="starLeft" @mouseout="desIn" class="starLeft" />
		<div @mouseover="starRight" @mouseout="desIn" class="starRight" />
		<div :style="backPostion" id="myChart" class="chart" />
	</div>
</template>

<script>
import echarts from '@/plugins/echarts'
import graph from './data.json'
export default {
	name: 'Star',
	components: {},
	data() {
		return {
			nowChart: null,
			bigView: false,
			rightoff: 0,
			leftOff: 0,
			nowrightoff: 0,
			nowleftOff: 0,
			canChange: false,
			pos: window,
			postioin: [0, 0],
			inn: 0
		}
	},
	computed: {
		backPostion() {
			return { margin: this.nowleftOff + 'px 0 0 ' + this.nowrightoff + 'px' }
		}
	},
	watch: {},
	mounted() {
		this.initChart()
	},
	methods: {
		reflash() {
			this.nowChart.dispose()
			this.initChart()
			this.nowrightoff = 0
			this.nowleftOff = 0
		},
		initChart() {
			var chartDom = document.getElementById('myChart')
			var myChart = echarts.init(chartDom)
			this.nowChart = myChart
			myChart.hideLoading()
			var option = {
				tooltip: {
					show: false
				},
				series: [
					{
						id: 'star',
						name: 'star',
						type: 'graph',
						layout: 'force',
						data: graph.nodes,
						links: graph.links,
						categories: graph.categories,
						draggable: false,
						clickable: true,
						force: {
							gravity: 0,
							repulsion: 0,
							friction: 0.1,
							edgeLength: 10,
							initLayout: 'none',
							layoutAnimation: true
						},
						focusNodeAdjacency: true,
						edgeSymbol: ['none', 'none'],
						roam: false,
						emphasis: {
							focus: 'none'
						},
						label: {
							show: true,
							position: 'left',
							formatter: '{b}',
							color: '#d8d8d8',
							fontSize: 16
						},
						labelLayout: {
							hideOverlap: true
						},
						scaleLimit: {
							min: 1,
							max: 1
						},
						lineStyle: {
							color: 'rgba(8, 255, 255, 1.0)',
							curveness: 0,
							width: 4
						}
					}
				]
			}
			myChart.setOption(option)
			myChart.on('click', e => {
				if (e.data.click) {
					this.$router.push(e.data.click)
				}
			})
			myChart.on('mouseup', function(params) {
				let option2 = myChart.getOption()
				option2.series[0].data[params.dataIndex].x = params.event.offsetX
				option2.series[0].data[params.dataIndex].y = params.event.offsetY
				option2.series[0].data[params.dataIndex].fixed = true
				myChart.setOption(option)
			})
			let that = this
			chartDom.addEventListener('mousedown', function(e) {
				that.canChange = true
				that.postioin = [e.clientX, e.clientY]
			})
			chartDom.addEventListener('mousemove', function(e) {
				if (that.canChange) {
					const ore = e.clientX - that.postioin[0] + that.nowrightoff
					const ofe = e.clientY - that.postioin[1] + that.nowleftOff
					if (ore > -chartDom.parentElement.offsetWidth*0.5 && ore < 0 && ofe > -chartDom.parentElement.offsetHeight*0.6 && ofe < 0) {
						that.nowrightoff = e.clientX - that.postioin[0] + that.nowrightoff
						that.nowleftOff = e.clientY - that.postioin[1] + that.nowleftOff
					}
					that.postioin = [e.clientX, e.clientY]
				}
			})
			chartDom.addEventListener('mouseup', function() {
				that.canChange = false
			})
			chartDom.addEventListener('mouseleave', function() {
				that.canChange = false
			})
			chartDom.addEventListener('mouseout', function() {
				that.canChange = false
			})
		},
		starUp() {
			var chartDom = document.getElementById('myChart')
			let that = this
			this.inn = setInterval(() => {
				if (that.nowleftOff + 1 < 0) {
					that.nowleftOff++
				}
			}, 5)
		},
		starDown() {
			var chartDom = document.getElementById('myChart')
			let that = this
			this.inn = setInterval(() => {
				if (that.nowleftOff - 1 > -chartDom.parentElement.offsetHeight*0.6) {
					that.nowleftOff--
				}
			}, 5)
		},
		starRight() {
			var chartDom = document.getElementById('myChart')
			let that = this
			console.log(chartDom.parentElement.offsetWidth)
			this.inn = setInterval(() => {
				if (that.nowrightoff - 1 > -chartDom.parentElement.offsetWidth * 0.5) {
					that.nowrightoff--
				}
			}, 5)
		},
		starLeft() {
			var chartDom = document.getElementById('myChart')
			let that = this
			this.inn = setInterval(() => {
				if (that.nowrightoff + 1 < 0) {
					that.nowrightoff++
				}
			}, 5)
		},
		desIn() {
			clearInterval(this.inn)
		}
	}
}
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	height: 877px;
	background-color: #00184f;
	/deep/ .ant-layout.ant-layout-has-sider > .ant-layout,
	.ant-layout.ant-layout-has-sider > .ant-layout-content {
		overflow: hidden;
	}
	overflow: hidden;
	.topImg {
		width: 100%;
		height: 100px;
		position: fixed;
		display: inline-flex;
		top: 99px;
		cursor: pointer;
		z-index: 9;
	}
	.bottomImg {
		cursor: pointer;
		width: 100%;
		height: 100px;
		position: fixed;
		display: inline-flex;
		bottom: 0;
		z-index: 9;
	}
	.starLeft {
		cursor: pointer;
		width: 100px;
		height: 160vh;
		position: fixed;
		display: inline-flex;
		z-index: 9;
	}
	.starRight {
		cursor: pointer;
		width: 100px;
		height: 160vh;
		position: fixed;
		display: inline-flex;
		right: 0;
		z-index: 9;
	}
	.chart {
		width: 150vw;
		height: 160vh;
		background: url('../../static/index/backsky.jpg') no-repeat;
		background-size: 150vw 160vh;
		overflow: hidden;
	}
}
</style>

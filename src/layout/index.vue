<template>
	<div>
		<div class="cuserBox" style="height: 60px;font-size: 20px;color: white;font-weight: 400;line-height: 60px;padding-left: 70px;">
			<Cuser style="height: 60px;font-size: 20px;color: white;font-weight: 400;line-height: 60px;" />
			<!-- background-color: #3FA9B3; -->
		</div>

		<a-layout id="components-layout-demo-custom-trigger" class="c-layout-index">
			<Cside :collapsed="collapsed" style="margin-right: 14px;" />
			<a-layout>
				<a-layout-header class="layout-header">
					<a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
					<Cbreadcrumb class="brm" />
				</a-layout-header>

				<a-layout-content class="c-layout-content">
					<transition v-if="$route.meta && $route.meta.noLayout" name="fade-transform" mode="out-in"><router-view /></transition>
					<a-card v-else class="c-card">
						<transition name="fade-transform" mode="out-in"><router-view /></transition>
					</a-card>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>
<script>
import Cside from './components/Cside'
import Cbreadcrumb from './components/Cbreadcrumb'
import Cuser from './components/Cuser'
export default {
	components: {
		Cside,
		Cbreadcrumb,
		Cuser
	},
	data() {
		return {
			collapsed: false
		}
	},
	created() {}
}
</script>

<style scoped lang="less">
/deep/.ant-card-bordered {
	border: 0px solid;
}
/deep/.ant-layout {
	background-color: #121929;
}
/deep/ .ant-card-body {
	padding: 0;
}
.cuserBox {
	background-image: url(../static/layout/navigation.png);
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 99;
}
.c-layout-index {
	.c-layout-content {
		height: calc(100vh - 92px);
		padding-top: 1px;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.c-layout-content::-webkit-scrollbar {
		display: none;
	}
	.c-card {
		// 原来
		// background-color: #192D46;
		// 现在
		// background-color: rgb(222, 229, 237);
		background-color: #121929;
		min-height: 100%;
		.c-card-title {
			font-size: 18px;
			margin-bottom: 10px;
		}
	}
}
/deep/ .c-layout-index .c-layout-content{
	padding-top: 0;
}
#components-layout-demo-custom-trigger {
	height: calc(100vh - 60px);
	.layout-header {
		z-index: 99;
		height: 40px;
		line-height: 40px;
		background: #060f20;
		padding: 0;
		display: flex;
		padding: 0 24px;
		color: #fff;
	}
}
#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 46px;
	cursor: pointer;
	transition: color 0.3s;
}
.brm {
	font-size: 14px;
	height: 40px;
	line-height: 40px;
	font-weight: 600;
	position: relative;
}
#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
	// color: #fff;
}
/deep/.ant-breadcrumb-separator {
	color: #fff;
}
/deep/.ant-breadcrumb > span:last-child {
	color: #fff;
}
#components-layout-demo-custom-trigger .layout-header[data-v-13877386] {
	margin-bottom: -1px;
}
</style>

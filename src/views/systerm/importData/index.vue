<template>
	<div>
		<div>
			<a-menu style="background-color: black;color: #ffffff;" :default-selected-keys="selectKeys" :selected-keys="selectKeys" mode="horizontal">
				<a-menu-item @click="() => {selectKeys = ['01']}" key="01">人员明细导入</a-menu-item>
				<a-menu-item @click="() => {selectKeys = ['02']}" key="02">银行明细导入</a-menu-item>
			</a-menu>
		</div>
		<personManage v-if="selectKeys[0] == '01'" />
		<bankManage v-if="selectKeys[0] == '02'" />
	</div>
</template>

<script>
import personManage from './personManage.vue'
import bankManage from './bankManage.vue'
export default {
	components: {
		personManage,
		bankManage
	},
	data() {
		return {
			selectKeys: ['01']
		}
	},
	methods: {
		focus() {},
		handleChange() {}
	}
}
</script>

<style lang="less" scoped></style>

<template>
	<a-layout-sider v-model="collapsed" :trigger="null" collapsible>
		<a-menu
			class="layoutMenu"
			theme="dark"
			:openKeys="openKeys"
			:default-selected-keys="selectKeys"
			:selected-keys="selectKeys"
			:default-open-keys="[$route.path]"
			mode="inline"
			@openChange="openChange"
		>
			<template v-for="Mitem in menulist">
				<a-sub-menu v-if="Mitem.children" :key="Mitem.path">
					<span slot="title">
						<a-icon :type="openKeys.includes(Mitem.path)?'caret-down':'caret-right'" />
						<span>{{ Mitem.name }}</span>
					</span>
					<template v-for="Mitem2 in Mitem.children">
						<a-sub-menu v-if="Mitem2.children" :key="Mitem2.path">
							<span slot="title">
								<a-icon :type="openKeys.includes(Mitem2.path)?'minus-square':'plus-square'"/>
								<span>{{ Mitem2.name }}</span>
							</span>
							<a-menu-item v-for="Sitem in Mitem2.children" :key="Sitem.path" @click="alink(Sitem.path)">
								<a-popover placement="right">
									<template #content>
										{{ Sitem.name }}
									</template>
									<img style="width: 12px;height: 12px;" src="../../static/layout/菜单.gif"/>
									{{ Sitem.name }}
								</a-popover>
							</a-menu-item>
						</a-sub-menu>
						<a-menu-item v-else :key="Mitem2.path" @click="alink(Mitem2.path)">
							<a-icon :type="Mitem2.icon" />
							<span>{{ Mitem2.name }}</span>
						</a-menu-item>
					</template>
				</a-sub-menu>
				<a-menu-item v-else :key="Mitem.path" @click="alink(Mitem.path)">
					<a-icon :type="Mitem.icon" />
					<span>{{ Mitem.name }}</span>
				</a-menu-item>
			</template>
		</a-menu>
	</a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: {
		collapsed: {
			type: Boolean
		}
	},
	data() {
		return {
			openKeys: []
		}
	},
	computed: {
		...mapGetters({
			menulist: 'menu/menulist'
		}),
		selectKeys() {
			return [this.$route.path]
		}
	},
	mounted() {
		if (this.selectKeys[0] != '/adm/index') {
			let spp = this.selectKeys[0].split('/')
			if (spp.length == 3) {
				this.openKeys = this.selectKeys
			} else if (spp.length == 4) {
				const len = '/' + spp[1] + '/' + spp[2]
				this.openKeys = [len, len + '/' + spp[3]]
			} else if (spp.length == 5) {
				const len = '/' + spp[1] + '/' + spp[2]
				this.openKeys = [len, len + '/' + spp[3], len + '/' + spp[3] + '/' + spp[4]]
			}
		}
	},
	methods: {
		alink(data) {
			this.$router.push(data)
		},
		openChange(openKeys) {
			this.openKeys = openKeys
		}
	}
}
</script>

<style scoped>
.logo {
	height: 32px;
	margin: 16px;
	line-height: 32px;
	color: #988a21;
	overflow: hidden;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.layoutMenu {
	background-color: rgb(2, 9, 27);
}
/deep/.ant-layout-sider-children {
	background-color: rgb(2, 9, 27);
}
/deep/ .ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
	background-color: #cfaf0f;
	color: #000000;
}
/deep/ .ant-menu-dark .ant-menu-submenu-selected,
.ant-menu-dark .ant-menu-submenu-title:hover {
	color: #8d763a;
}
/deep/ div.ant-menu-submenu-title:hover {
	color: #8d763a;
}
/deep/ .ant-menu-submenu-arrow {
	display: none;
}
</style>

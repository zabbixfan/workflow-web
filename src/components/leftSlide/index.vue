<template>
    <div class="left-side">
        <div class="left-side-inner">
            <router-link to="/" class="logo block">
                <!--<img src="./images/logo.png" alt="AdminX">-->
                <span style="font-size:30px;color:#FFF">{{appName}}</span>
            </router-link>
            <!--<el-menu class="menu-box" theme="light"  router :default-active="$route.path" unique-opened>-->
            <el-menu class="menu-box" theme="light"  router>
                <div v-for="(item, index) in nav_menu_data" :key="index">
                    <el-menu-item class="menu-list" v-if="typeof item.child === 'undefined'" :index="item.path">
                        <i class="icon fa" :class="item.icon"></i>
                        <span v-text="item.title" class="text"></span>
                    </el-menu-item>
                    <el-submenu :index="item.path" v-else>
                        <template slot="title">
                            <i class="icon fa" :class="item.icon"></i>
                            <span v-text="item.title" class="text"></span>
                        </template>
                        <el-menu-item class="menu-list" v-for="(sub_item, sub_index) in item.child" :index="sub_item.path" :key="sub_index">
                            <!--<i class="icon fa" :class="sub_item.icon"></i>-->
                            <span v-text="sub_item.title" class="text"></span>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'slide',
        data() {

            let inNav = this.$router.options.routes.filter(u => u.navName)
            let menu = []
            for (let index in inNav) {
                let temp = {
                    'title': inNav[index].navName,
                    'path': inNav[index].path,
                    'icon': inNav[index].navIcon
                }
                if (inNav[index].hasSub) {
                    temp.child = []
                    for (let childIndex in inNav[index].children) {
                        temp.child.push({
                            'title': inNav[index].children[childIndex].navName,
                            'path': inNav[index].path + inNav[index].children[childIndex].path
                        })
                    }
                }
                menu.push(temp)
            }
            return {
                appName: process.env.APP_NAME,
                nav_menu_data: menu
            }
        }
    }

</script>

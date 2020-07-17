import Vue from "vue"; //调取vue.js文件(使用import命令加载的Vue构建版本)
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [{
        path: "/",
        redirect: "/homepage",
    },
    {
        path: "",
        name: "Home",
        component: Home,
        meta: {
            title: "父路由",
        },
        children: [{
                path: "/homepage",
                name: "homepage",
                component: () =>
                    import ("../views/homepage/homepage.vue"),
                meta: {
                    title: "主页",
                    parentPath: "/homepage",
                },
            },
            {
                path: "/published",
                name: "published",
                component: () =>
                    import ("../views/published/published.vue"),
                // redirect: '../views/published/published.vue',
                meta: {
                    title: "发表文章父路由",
                },
                children: [{
                        path: "/Publishedarticles",
                        name: "Publishedarticles",
                        component: () =>
                            import ("../views/published/Publishedarticles.vue"),
                        meta: {
                            title: "已发布",
                            parentPath: "/Publishedarticles",
                        },
                    },
                    {
                        path: "/edits",
                        name: "edits",
                        component: () =>
                            import ("../views/published/edits.vue"),
                        meta: {
                            title: "编辑",
                            parentPath: "/Publishedarticles",
                        },
                    },
                    {
                        path: "/seeing",
                        name: "seeing",
                        component: () =>
                            import ("../views/published/seeing.vue"),
                        meta: {
                            title: "查看",
                            parentPath: "/Publishedarticles",
                        },
                    },
                ],
            },
            {
                path: "/statistics",
                name: "statistics",
                component: () =>
                    import ("../views/statistics/statistics.vue"),
                meta: {
                    title: "统计",
                    parentPath: "/statistics",
                },
            },
            {
                path: "/article",
                name: "article",
                component: () =>
                    import ("../views/article/article.vue"),
                meta: {
                    title: "文章发布",
                    parentPath: "/article",
                },
            },
            {
                path: "/tabs",
                name: "tabs",
                component: () =>
                    import ("../views/tabs/tabs.vue"),
                meta: {
                    title: "标签页",
                    parentPath: "/tabs",
                },
            },
            {
                path: "/exports",
                name: "exports",
                component: () =>
                    import ("../views/exports/exports.vue"),
                meta: {
                    title: "导出excel",
                    parentPath: "/exports",
                },
            },
            {
                path: "/pictureup",
                name: "pictureup",
                component: () =>
                    import ("../views/pictureup/pictureup.vue"),
                meta: {
                    title: "图片上传",
                    parentPath: "/pictureup",
                },
            },
            {
                path: "/exitthesystem",
                name: "exitthesystem",
                component: () =>
                    import ("../views/exitthesystem/exitthesystem.vue"),
                meta: {
                    title: "退出系统",
                    parentPath: "/exitthesystem",
                },
            },
        ],
    },
    {
        path: "/login",
        name: "login",

        component: () =>
            import ("../views/login/login.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/register",
        name: "register",

        component: () =>
            import ("../views/register/register.vue"),
        meta: {
            title: "注册",
        },
    },
    {
        path: "*",
        component: () =>
            import ("../views/404/404.vue"),
        meta: {
            title: "404",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let userss = localStorage.getItem("usernames");
    if (to.path === "/login" || to.path === "/register") next();
    else userss ? next() : next("/login");
});

export default router;
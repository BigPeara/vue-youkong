export default [{
        path: '/',
        component: () =>
            import ('@/pages/bookstorage/index.vue')
    }, {
        path: '/book/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/index.vue')
    },
    {
        path: '/book/cataloguelist/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/pages/cataloguelist.vue')
    },
    {
        path: '/bookstorage/commentPage/:btitle/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/pages/commentPage.vue')
    },
    {
        path: '/bookstorage/search',
        component: () =>
            import ('@/pages/bookstorage/search/search.vue')
    },
    {
        path: '/bookstorage/shorts',
        component: () =>
            import ('@/pages/bookstorage/shorts.vue')
    },
    {
        path: '/bookstorage/classify/:type/:value',
        component: () =>
            import ('@/pages/bookstorage/classify/index.vue')
    },
    {
        path: '/bookstorage/rank',
        component: () =>
            import ('@/pages/bookstorage/rank/index.vue')
    },
    {
        path: '/bookstorage/complete',
        component: () =>
            import ('@/pages/bookstorage/complete/index.vue')
    }
]
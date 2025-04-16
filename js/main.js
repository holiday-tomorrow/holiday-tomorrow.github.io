// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 响应式导航栏
    const createMobileMenu = () => {
        // 检查是否已经存在移动菜单按钮
        if (document.querySelector('.mobile-menu-toggle')) {
            return;
        }
        
        const header = document.querySelector('.site-header .container');
        const nav = document.querySelector('.main-navigation');
        
        // 创建移动菜单按钮
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.setAttribute('aria-label', '切换导航菜单');
        
        // 将按钮添加到头部
        header.insertBefore(mobileMenuToggle, nav);
        
        // 添加点击事件
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    };
    
    // 检测窗口大小变化，添加或移除移动菜单
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            createMobileMenu();
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
            const nav = document.querySelector('.main-navigation');
            if (nav) {
                nav.classList.remove('active');
            }
        }
    };
    
    // 初始检测
    handleResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 滚动时添加阴影效果到头部
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
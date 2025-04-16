// 动画和交互效果增强脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化页面过渡效果
    initPageTransitions();
    
    // 初始化悬停效果
    initHoverEffects();
    
    // 初始化导航栏效果
    initNavbarEffects();
    
    // 初始化加载动画
    showPageLoadAnimation();
    
    // 初始化图片加载效果
    initImageLoadEffects();
});

// 页面加载动画
function showPageLoadAnimation() {
    const elements = document.querySelectorAll('.hero-content > *, .post-card, .category-card');
    
    elements.forEach((el, index) => {
        el.classList.add('animate-fade-in');
        el.style.animationDelay = `${index * 100}ms`;
    });
}

// 滚动动画初始化
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        const threshold = (windowHeight - (elementHeight * (percentageScroll / 100)));
        
        return elementTop <= threshold;
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 70)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // 初始检查
    setTimeout(handleScrollAnimation, 100);
    
    // 滚动时检查
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// 页面过渡效果
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只处理内部链接
            if (href && href.indexOf('http') !== 0) {
                e.preventDefault();
                
                // 显示过渡动画
                pageTransition.classList.add('active');
                
                // 延迟导航以显示动画
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // 页面加载完成后，隐藏过渡动画
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            pageTransition.classList.add('fade-out');
            setTimeout(() => {
                pageTransition.classList.remove('active');
                pageTransition.classList.remove('fade-out');
            }, 500);
        }
    });
}

// 悬停效果初始化
function initHoverEffects() {
    // 为文章卡片添加悬停效果
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.classList.add('hover-float');
    });
    
    // 为分类卡片添加悬停效果
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.classList.add('hover-pulse');
    });
    
    // 为按钮添加悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 导航栏效果
function initNavbarEffects() {
    const header = document.querySelector('.site-header');
    const menuItems = document.querySelectorAll('.menu li a');
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 菜单项悬停效果
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.closest('li').classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 为活动菜单项添加动画
    const activeMenuItem = document.querySelector('.menu li.active a');
    if (activeMenuItem) {
        activeMenuItem.classList.add('animate-pulse');
    }
}

// 添加视差滚动效果
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
}

// 添加图片加载淡入效果
function initImageLoadEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 设置初始透明度
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // 图片加载完成后淡入
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // 如果图片已经缓存，直接显示
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// 删除这个重复的事件监听器，因为我们已经在主DOMContentLoaded事件中调用了initImageLoadEffects
// document.addEventListener('DOMContentLoaded', function() {
//     initImageLoadEffects();
// });
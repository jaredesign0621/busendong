document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. DYNAMIC MENU ITEMS RENDERER
     ========================================== */
  const defaultMenus = [
    {
      id: 'MENU-1',
      name: '부센동 (Kaisendon)',
      price: 18000,
      desc: '부센동의 근간이자 자부심입니다. 매일 아침 새벽 수산시장에서 엄선한 제철 대광어, 숙성 연어, 참치 등 10가지 신선한 해산물이 조화롭게 올라간 대중적 명품 카이센동.',
      category: 'signature',
      badge: '대표', // '대표', '인기', or ''
      image: 'asset/img/kaisendon-signature.png',
      tags: ['숙성연어', '참다랑어', '대광어', '단새우', '날치알']
    },
    {
      id: 'MENU-2',
      name: '스페셜 부센동 (Special)',
      price: 28000,
      desc: '기존 부센동에 귀한 캐나다산 최고급 성게알(우니), 부드러운 참치 뱃살(오도로), 그리고 바다의 보석이라 불리는 연어알(이쿠라)을 아낌없이 가득 채운 고품격 스페셜 플래터 한 그릇.',
      category: 'signature',
      badge: '대표',
      image: 'asset/img/kaisendon-special.png',
      tags: ['최고급 우니', '참치 뱃살', '이쿠라', '전복', '대하']
    },
    {
      id: 'MENU-3',
      name: '참다랑어 도로동 (Toro-don)',
      price: 25000,
      desc: '지방질이 가장 풍부하고 부드러운 참다랑어의 뱃살(오도로와 주도로) 부위만을 엄선하여 살포시 깔아두었습니다. 와사비와 무순을 곁들여 입안 가득 펴지는 짙은 고소함을 느껴보세요.',
      category: 'signature',
      badge: '인기',
      image: 'asset/img/kaisendon-special.png',
      tags: ['참다랑어 오도로', '주도로', '수제 초밥밥', '특제간장']
    },
    {
      id: 'MENU-4',
      name: '생연어 대게살동',
      price: 19000,
      desc: '최고급 노르웨이산 슈페리어 등급 생연어를 감칠맛 나게 숙성하여 고소함을 더하고, 속초 홍게의 통통한 대게살을 촉촉하게 발라내어 부드러움의 시너지를 선사하는 덮밥.',
      category: 'signature',
      badge: '',
      image: 'asset/img/kaisendon-signature.png',
      tags: ['숙성 생연어', '붉은대게살', '생고추냉이', '초밥용 밥']
    },
    {
      id: 'MENU-5',
      name: '부센 에비텐동 (Ebi Tendong)',
      price: 15000,
      desc: '겉바속촉 튀김의 결정체. 대왕 대하 4마리를 특수 배합된 바삭한 튀김옷을 입혀 깨끗한 기름에 튀겨냈습니다. 오랜 시간 끓여 깊은 풍미를 지닌 달콤 짭조름한 타래 소스가 가미되어 있습니다.',
      category: 'signature',
      badge: '',
      image: 'asset/img/restaurant-interior.png',
      tags: ['대왕 타이거새우', '꽈리고추', '단호박', '비법 타래']
    },
    {
      id: 'MENU-6',
      name: '부센 우니 판 수시 (Uni Plate)',
      price: 35000,
      desc: '청정 해역의 신선한 성게알(우니)을 아낌없이 정갈하게 담은 한 판. 향긋한 수제 감태와 구운 김, 그리고 고슬고슬한 숙성 밥을 함께 제공해 우니 본연의 고소하고 밀도 높은 맛을 커스텀해 즐길 수 있습니다.',
      category: 'signature',
      badge: '인기',
      image: 'asset/img/kaisendon-special.png',
      tags: ['최상급 성게알 한판', '완도산 특제 감태', '전통 구운김']
    }
  ];

  // Seed default menus if empty in localStorage
  if (!localStorage.getItem('busendong_menu_items')) {
    localStorage.setItem('busendong_menu_items', JSON.stringify(defaultMenus));
  }

  let activeCategoryFilter = 'all';

  // Render client category tabs dynamically
  const renderClientCategoryTabs = () => {
    const controlsContainer = document.getElementById('menu-controls');
    if (!controlsContainer) return;

    // Load master categories list and current menu items
    const categoriesList = JSON.parse(localStorage.getItem('busendong_categories')) || [
      { id: 'signature', name: '시그니처' },
      { id: 'donburi', name: '단품 덮밥' },
      { id: 'sides', name: '프리미엄 곁들임' }
    ];
    const menus = JSON.parse(localStorage.getItem('busendong_menu_items')) || [];
    
    // Gather all active categories that have at least one menu item
    const activeCategoryKeys = [...new Set(menus.map(m => m.category))];

    // Filter categories to only display those that are in use
    const categoriesToRender = categoriesList.filter(cat => activeCategoryKeys.includes(cat.id));

    let tabsHtml = `<button class="menu-tab-btn ${activeCategoryFilter === 'all' ? 'active' : ''}" data-filter="all">전체 메뉴</button>`;
    
    categoriesToRender.forEach(cat => {
      tabsHtml += `<button class="menu-tab-btn ${activeCategoryFilter === cat.id ? 'active' : ''}" data-filter="${cat.id}">${cat.name}</button>`;
    });

    controlsContainer.innerHTML = tabsHtml;

    // Bind click events on generated tabs
    const tabButtons = controlsContainer.querySelectorAll('.menu-tab-btn');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        activeCategoryFilter = button.getAttribute('data-filter');
        filterClientMenus();
      });
    });
  };

  const filterClientMenus = () => {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (activeCategoryFilter === 'all' || category === activeCategoryFilter) {
        // Show Card
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        // Hide Card
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 350);
      }
    });
  };

  const renderClientMenus = () => {
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    const menus = JSON.parse(localStorage.getItem('busendong_menu_items')) || [];
    menuGrid.innerHTML = ''; // clear static placeholders

    // Render filter tabs dynamically first
    renderClientCategoryTabs();

    menus.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card reveal';
      card.setAttribute('data-category', item.category);

      // Render custom image badges '대표' and '인기' beautifully
      let badgeHtml = '';
      if (item.badge === '대표') {
        badgeHtml = '<span class="menu-card-badge signature">대표</span>';
      } else if (item.badge === '인기') {
        badgeHtml = '<span class="menu-card-badge popular">인기</span>';
      }

      const tagsHtml = item.tags.map(t => `<span class="ingredient-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="menu-img-box">
          ${badgeHtml}
          <img src="${item.image}" alt="${item.name}" width="380" height="250">
        </div>
        <div class="menu-details">
          <div class="menu-card-header">
            <h3 class="menu-name">${item.name}</h3>
            <span class="menu-price">₩${item.price.toLocaleString()}</span>
          </div>
          <p class="menu-desc">${item.desc}</p>
          <div class="menu-ingredients">
            ${tagsHtml}
          </div>
        </div>
      `;

      menuGrid.appendChild(card);
    });
  };

  renderClientMenus();


  /* ==========================================
     1. SCROLL EFFECT ON HEADER
     ========================================== */
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load


  /* ==========================================
     2. MOBILE NAVIGATION DRAWER
     ========================================== */
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    mobileNavToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    mobileNavToggle.classList.remove('active');
    navMenu.classList.remove('active');
  };

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  /* ==========================================
     3. DYNAMIC STORAGE SYNC FOR CLIENT SIDE
     ========================================== */
  window.addEventListener('storage', (e) => {
    if (e.key === 'busendong_menu_items' || e.key === 'busendong_categories') {
      renderClientMenus();
      // Re-observe newly created reveal items
      const newReveals = document.querySelectorAll('.menu-card.reveal');
      newReveals.forEach(el => revealObserver.observe(el));
    }
  });


  /* ==========================================
     4. INTERSECTION OBSERVER FOR FADE-IN ANIMATION
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated to keep performance high
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger when 15% of element is in view
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================
     5. DYNAMIC ACTIVE MENU SECTIONS LINK HIGHLIGHT
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  
  const sectionActiveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.4 // Trigger when 40% of the section is visible
  });

  sections.forEach(section => {
    sectionActiveObserver.observe(section);
  });


  /* ==========================================
     6. RESERVATION FORM HANDLING & SUCCESS MODAL
     ========================================== */
  const resForm = document.getElementById('reservation-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const summaryPhone = document.getElementById('summary-phone');
  const btnSuccessClose = document.getElementById('btn-success-close');

  resForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    // Retrieve input values for dynamic feedback card
    const nameVal = document.getElementById('res-name').value;
    const phoneVal = document.getElementById('res-phone').value;
    const dateVal = document.getElementById('res-date').value;
    const timeVal = document.getElementById('res-time').value;
    const guestsVal = document.getElementById('res-guests').value;
    const seatingVal = document.getElementById('res-seating').value;
    const requestsVal = document.getElementById('res-requests').value;

    // Create reservation object
    const newReservation = {
      id: 'RES-' + Date.now(),
      name: nameVal,
      phone: phoneVal,
      date: dateVal,
      time: timeVal,
      guests: guestsVal,
      seating: seatingVal,
      requests: requestsVal,
      status: '대기중', // '대기중', '확정됨', '취소됨'
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    let currentReservations = JSON.parse(localStorage.getItem('busendong_reservations')) || [];
    currentReservations.push(newReservation);
    localStorage.setItem('busendong_reservations', JSON.stringify(currentReservations));

    console.log('Reservation saved to LocalStorage:', newReservation);

    // Populate dynamic phone display in success modal
    summaryPhone.textContent = phoneVal;

    // Show success overlay in-place
    successOverlay.classList.add('active');
  });

  // Reset form and close success popup
  btnSuccessClose.addEventListener('click', () => {
    resForm.reset();
    successOverlay.classList.remove('active');
  });

});

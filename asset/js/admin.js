document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. HIGH-FIDELITY DEFAULT SAMPLE DATA SEEDS
     ========================================== */
  const defaultReservations = [
    {
      id: 'RES-1780280001001',
      name: '이승현',
      phone: '010-1234-5678',
      date: '2026-06-05',
      time: '18:30',
      guests: '2명',
      seating: '다찌',
      requests: '저녁 부부 기념일 기념 식사로 방문합니다. 셰프님 설명 듣기 편한 다찌 중앙 좌석 부탁드립니다. 참치 알레르기가 있어 대체 생선이 가능할지 문의드립니다.',
      status: '대기중',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
    },
    {
      id: 'RES-1780280001002',
      name: '김서진',
      phone: '010-9876-5432',
      date: '2026-06-03',
      time: '12:00',
      guests: '4명',
      seating: '테이블',
      requests: '부산 출장 중 거래처 바이어 접대용 오찬입니다. 정갈한 서빙 부탁드리겠습니다.',
      status: '확정됨',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
    },
    {
      id: 'RES-1780280001003',
      name: '박준영',
      phone: '010-8765-4321',
      date: '2026-06-04',
      time: '19:00',
      guests: '1명',
      seating: '다찌',
      requests: '혼자 방문하여 가볍게 반주를 곁들인 카이센동 식사를 즐기고자 합니다.',
      status: '대기중',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
    },
    {
      id: 'RES-1780280001004',
      name: '최미경',
      phone: '010-2345-6789',
      date: '2026-06-02',
      time: '13:30',
      guests: '3명',
      seating: '무관',
      requests: '아기가 있어 구석진 유모차 둘 수 있는 테이블 공간이 있으면 좋겠습니다.',
      status: '취소됨',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 24 hours ago
    }
  ];

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

  const defaultCategories = [
    { id: 'signature', name: '시그니처' }
  ];

  // Initialize LocalStorages with sample data if completely empty
  if (!localStorage.getItem('busendong_reservations')) {
    localStorage.setItem('busendong_reservations', JSON.stringify(defaultReservations));
  }
  if (!localStorage.getItem('busendong_menu_items')) {
    localStorage.setItem('busendong_menu_items', JSON.stringify(defaultMenus));
  }
  if (!localStorage.getItem('busendong_categories')) {
    localStorage.setItem('busendong_categories', JSON.stringify(defaultCategories));
  }

  // --- Start Migration: Remove 'donburi' and 'sides' if they exist ---
  let currentCategories = JSON.parse(localStorage.getItem('busendong_categories')) || [];
  if (currentCategories.some(c => c.id === 'donburi' || c.id === 'sides')) {
    currentCategories = currentCategories.filter(c => c.id !== 'donburi' && c.id !== 'sides');
    localStorage.setItem('busendong_categories', JSON.stringify(currentCategories));
    
    let currentMenus = JSON.parse(localStorage.getItem('busendong_menu_items')) || [];
    let modified = false;
    currentMenus.forEach(m => {
      if (m.category === 'donburi' || m.category === 'sides') {
        m.category = 'signature';
        modified = true;
      }
    });
    if (modified) {
      localStorage.setItem('busendong_menu_items', JSON.stringify(currentMenus));
    }
  }
  // --- End Migration ---


  /* ==========================================
     2. SECURE ADMIN LOGIN & LOGOUT SYSTEM
     ========================================== */
  const loginWrapper = document.getElementById('login-wrapper');
  const loginForm = document.getElementById('admin-login-form');
  const loginCard = document.getElementById('login-card');
  const loginErrorMsg = document.getElementById('login-error-msg');
  const body = document.body;
  const btnAdminLogout = document.getElementById('btn-admin-logout');

  const showDashboard = () => {
    loginWrapper.style.opacity = '0';
    setTimeout(() => {
      loginWrapper.style.display = 'none';
      body.classList.remove('dashboard-locked');
    }, 500);
  };

  // Check sessionStorage session state
  if (sessionStorage.getItem('busendong_admin_authenticated') === 'true') {
    showDashboard();
  }

  // Handle Login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameVal = document.getElementById('login-id').value;
    const passwordVal = document.getElementById('login-pw').value;

    if (usernameVal === 'admin' && passwordVal === '0621') {
      sessionStorage.setItem('busendong_admin_authenticated', 'true');
      loginErrorMsg.style.display = 'none';
      showDashboard();
    } else {
      loginErrorMsg.style.display = 'block';
      loginCard.classList.remove('shake');
      void loginCard.offsetWidth; // Trigger DOM reflow to repeat keyframes animation
      loginCard.classList.add('shake');
      document.getElementById('login-pw').value = '';
    }
  });

  // Handle Admin Logout action
  btnAdminLogout.addEventListener('click', () => {
    sessionStorage.removeItem('busendong_admin_authenticated');
    window.location.reload(); // Reload page to force login card show
  });


  /* ==========================================
     3. LNB SIDEBAR NAVIGATION PAGE SWITCHER
     ========================================== */
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const adminSections = document.querySelectorAll('.admin-section');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetSectionId = link.getAttribute('data-section') + '-section';
      adminSections.forEach(section => {
        if (section.id === targetSectionId) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });


  /* ==========================================
     4. RESERVATIONS MANAGEMENT CODE SYSTEM
     ========================================= */
  const resTableBody = document.getElementById('res-table-body');
  const tableEmptyState = document.getElementById('table-empty-state');
  
  // Dashboard Stats Elements
  const statTotal = document.getElementById('stat-total');
  const statPending = document.getElementById('stat-pending');
  const statConfirmed = document.getElementById('stat-confirmed');
  const statCancelled = document.getElementById('stat-cancelled');

  // Search & Filter controls Elements
  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.filter-tab');

  // Detailed Modal Elements
  const modalOverlay = document.getElementById('detail-modal-overlay');
  const modalTitleCode = document.getElementById('modal-title-code');
  const detName = document.getElementById('det-name');
  const detPhone = document.getElementById('det-phone');
  const detDateTime = document.getElementById('det-datetime');
  const detGuests = document.getElementById('det-guests');
  const detSeating = document.getElementById('det-seating');
  const detStatus = document.getElementById('det-status');
  const detRequests = document.getElementById('det-requests');
  
  const modalActionsContainer = document.getElementById('modal-actions-container');
  const btnModalApprove = document.getElementById('btn-modal-approve');
  const btnModalReject = document.getElementById('btn-modal-reject');
  const btnModalClose = document.getElementById('btn-modal-close');

  let activeFilter = 'all';
  let activeSearch = '';
  let selectedReservationId = null;

  // Retrieve reservations
  const getReservations = () => {
    return JSON.parse(localStorage.getItem('busendong_reservations')) || [];
  };

  const saveReservations = (reservations) => {
    localStorage.setItem('busendong_reservations', JSON.stringify(reservations));
    if (typeof db !== 'undefined') {
      reservations.forEach(res => {
        db.collection('reservations').doc(res.id).set(res)
          .catch(err => console.error('[Firestore] Error saving reservation:', err));
      });
    }
  };

  // Re-calculate Stats
  const updateDashboardStats = (reservations) => {
    statTotal.textContent = reservations.length;
    statPending.textContent = reservations.filter(r => r.status === '대기중').length;
    statConfirmed.textContent = reservations.filter(r => r.status === '확정됨').length;
    statCancelled.textContent = reservations.filter(r => r.status === '취소됨').length;
  };

  // Render Table list
  const renderReservationsTable = () => {
    const reservations = getReservations();
    updateDashboardStats(reservations);

    let filteredList = reservations;

    // Filter tabs
    if (activeFilter !== 'all') {
      filteredList = filteredList.filter(r => r.status === activeFilter);
    }

    // Text search
    if (activeSearch.trim() !== '') {
      const searchLower = activeSearch.toLowerCase();
      filteredList = filteredList.filter(r => 
        r.name.toLowerCase().includes(searchLower) || 
        r.phone.includes(searchLower) || 
        r.id.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (Newest first)
    filteredList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    resTableBody.innerHTML = '';

    if (filteredList.length === 0) {
      resTableBody.style.display = 'none';
      tableEmptyState.style.display = 'block';
      return;
    }

    resTableBody.style.display = 'table-row-group';
    tableEmptyState.style.display = 'none';

    filteredList.forEach(res => {
      const tr = document.createElement('tr');
      tr.className = 'clickable-row';
      
      let badgeClass = 'pending';
      if (res.status === '확정됨') badgeClass = 'confirmed';
      if (res.status === '취소됨') badgeClass = 'cancelled';

      let actionButtons = '';
      if (res.status === '대기중') {
        actionButtons = `
          <button class="btn-action approve" data-action="approve" data-id="${res.id}">승인</button>
          <button class="btn-action cancel" data-action="reject" data-id="${res.id}">거절</button>
        `;
      } else {
        actionButtons = `<span style="color: var(--text-muted); font-size:0.8rem;">처리 완료</span>`;
      }

      tr.innerHTML = `
        <td class="res-code">${res.id.substring(0, 10)}...</td>
        <td class="res-name-cell">${res.name}</td>
        <td>${res.phone}</td>
        <td>${res.date} <span style="color: var(--color-gold); font-size:0.85rem; font-weight:600;">${res.time}</span></td>
        <td>${res.guests}</td>
        <td>${res.seating === '무관' ? '상관없음' : res.seating}</td>
        <td><span class="status-badge ${badgeClass}">${res.status}</span></td>
        <td class="actions-cell">${actionButtons}</td>
      `;

      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-action')) return;
        openDetailModal(res.id);
      });

      resTableBody.appendChild(tr);
    });

    bindReservationActionButtons();
  };

  const handleReservationAction = (id, action) => {
    let list = getReservations();
    const index = list.findIndex(r => r.id === id);

    if (index !== -1) {
      list[index].status = action === 'approve' ? '확정됨' : '취소됨';
      saveReservations(list);
      renderReservationsTable();
      closeDetailModal();
    }
  };

  const bindReservationActionButtons = () => {
    const actionBtns = document.querySelectorAll('.btn-action[data-action]');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        handleReservationAction(id, action);
      });
    });
  };

  // Search Reservation Input
  searchInput.addEventListener('input', (e) => {
    activeSearch = e.target.value;
    renderReservationsTable();
  });

  // Filter Reservation Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-tab');
      renderReservationsTable();
    });
  });

  // Detailed Modal Controls
  const openDetailModal = (id) => {
    const list = getReservations();
    const res = list.find(r => r.id === id);

    if (!res) return;

    selectedReservationId = id;
    modalTitleCode.textContent = res.id;
    detName.textContent = res.name;
    detPhone.textContent = res.phone;
    detDateTime.innerHTML = `${res.date} <span class="text-gold">${res.time}</span>`;
    detGuests.textContent = res.guests;
    detSeating.textContent = res.seating === '무관' ? '상관없음' : res.seating + '석';
    detStatus.textContent = res.status;
    
    // Status display colors
    if (res.status === '대기중') detStatus.style.color = '#E2B235';
    if (res.status === '확정됨') detStatus.style.color = '#35B47E';
    if (res.status === '취소됨') detStatus.style.color = '#E95E47';

    detRequests.textContent = res.requests.trim() !== '' ? res.requests : '등록된 요청사항이 없습니다.';
    modalActionsContainer.style.display = res.status === '대기중' ? 'grid' : 'none';
    modalOverlay.classList.add('active');
  };

  const closeDetailModal = () => {
    modalOverlay.classList.remove('active');
    selectedReservationId = null;
  };

  btnModalClose.addEventListener('click', closeDetailModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeDetailModal();
  });

  btnModalApprove.addEventListener('click', () => {
    if (selectedReservationId) handleReservationAction(selectedReservationId, 'approve');
  });
  btnModalReject.addEventListener('click', () => {
    if (selectedReservationId) handleReservationAction(selectedReservationId, 'reject');
  });


  /* ==========================================
     5. NEW COMPONENT: MENU MANAGEMENT CODE SYSTEM
     ========================================== */
  const menuTableBody = document.getElementById('menu-table-body');
  const menuEmptyState = document.getElementById('menu-empty-state');
  
  // Search & Filter
  const menuSearchInput = document.getElementById('menu-search-input');
  
  // Modals Add/Edit Form
  const menuModalOverlay = document.getElementById('menu-modal-overlay');
  const btnAddMenuModal = document.getElementById('btn-add-menu-modal');
  const btnMenuModalClose = document.getElementById('btn-menu-modal-close');
  
  const menuManageForm = document.getElementById('menu-manage-form');
  const menuModalTitle = document.getElementById('menu-modal-title');
  
  const formMenuId = document.getElementById('menu-form-id');
  const formMenuName = document.getElementById('menu-form-name');
  const formMenuCategory = document.getElementById('menu-form-category');
  const formMenuPrice = document.getElementById('menu-form-price');
  const formMenuTags = document.getElementById('menu-form-tags');
  const formMenuBadge = document.getElementById('menu-form-badge');
  const formMenuImage = document.getElementById('menu-form-image');
  const formMenuDesc = document.getElementById('menu-form-desc');

  // Category Modal Elements
  const categoryModalOverlay = document.getElementById('category-modal-overlay');
  const btnManageCategoriesModal = document.getElementById('btn-manage-categories-modal');
  const btnCategoryModalClose = document.getElementById('btn-category-modal-close');
  const categoryManagerList = document.getElementById('category-manager-list');
  const categoryAddForm = document.getElementById('category-add-form');
  const categoryAddName = document.getElementById('category-add-name');

  let activeMenuFilter = 'all';
  let activeMenuSearch = '';

  // Get and Save local storage menus & categories
  const getMenuStorage = () => {
    return JSON.parse(localStorage.getItem('busendong_menu_items')) || [];
  };

  const saveMenuStorage = (menus) => {
    localStorage.setItem('busendong_menu_items', JSON.stringify(menus));
    if (typeof db !== 'undefined') {
      menus.forEach(menu => {
        db.collection('menus').doc(menu.id).set(menu)
          .catch(err => console.error('[Firestore] Error saving menu item:', err));
      });
    }
  };

  const getCategoriesStorage = () => {
    return JSON.parse(localStorage.getItem('busendong_categories')) || [];
  };

  const saveCategoriesStorage = (categories) => {
    localStorage.setItem('busendong_categories', JSON.stringify(categories));
    if (typeof db !== 'undefined') {
      categories.forEach(cat => {
        db.collection('categories').doc(cat.id).set(cat)
          .catch(err => console.error('[Firestore] Error saving category:', err));
      });
    }
  };

  // Populate dynamic category selector options in Menu modal
  const populateCategoryDropdown = () => {
    const categories = getCategoriesStorage();
    let dropdownHtml = '<option value="" disabled selected>카테고리 선택</option>';
    
    categories.forEach(cat => {
      dropdownHtml += `<option value="${cat.id}">${cat.name} (${cat.id})</option>`;
    });
    
    formMenuCategory.innerHTML = dropdownHtml;
  };

  // Render Category List inside Category Manager Modal
  const renderCategoryList = () => {
    const categories = getCategoriesStorage();
    categoryManagerList.innerHTML = '';

    categories.forEach(cat => {
      const isDefault = ['signature'].includes(cat.id);
      
      const itemRow = document.createElement('div');
      itemRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: 8px; margin-bottom: 8px; transition: var(--transition-fast);';
      
      let deleteButtonHtml = '';
      if (!isDefault) {
        deleteButtonHtml = `<button class="btn-action delete" data-cat-id="${cat.id}" style="padding: 6px 12px; font-size: 0.75rem; font-weight: 600; cursor: pointer;">삭제</button>`;
      } else {
        deleteButtonHtml = `<span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500; padding: 6px 12px; background: rgba(255,255,255,0.03); border-radius: 4px;">시스템 기본</span>`;
      }

      itemRow.innerHTML = `
        <div>
          <span style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem;">${cat.name}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400; margin-left: 6px;">(${cat.id})</span>
        </div>
        <div>
          ${deleteButtonHtml}
        </div>
      `;

      categoryManagerList.appendChild(itemRow);
    });

    bindCategoryDeleteButtons();
  };

  const bindCategoryDeleteButtons = () => {
    const deleteBtns = categoryManagerList.querySelectorAll('button.delete');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        const categories = getCategoriesStorage();
        const catToDelete = categories.find(c => c.id === catId);
        
        if (!catToDelete) return;

        if (confirm(`정말로 '${catToDelete.name}' 카테고리를 완전히 삭제하시겠습니까?\n\n※ 해당 카테고리에 할당된 메뉴들은 자동으로 '시그니처' 카테고리로 안전하게 변경·재배치됩니다.`)) {
          deleteCategory(catId);
        }
      });
    });
  };

  const deleteCategory = (catId) => {
    // 1. Filter out from categories
    let categories = getCategoriesStorage();
    categories = categories.filter(c => c.id !== catId);
    saveCategoriesStorage(categories);

    // Sync deletion to Firestore
    if (typeof db !== 'undefined') {
      db.collection('categories').doc(catId).delete()
        .catch(err => console.error('[Firestore] Error deleting category:', err));
    }

    // 2. Reassign associated menu items to 'signature'
    let menus = getMenuStorage();
    let reassignedCount = 0;

    menus.forEach(m => {
      if (m.category === catId) {
        m.category = 'signature';
        reassignedCount++;
      }
    });

    if (reassignedCount > 0) {
      saveMenuStorage(menus);
      alert(`카테고리가 삭제되었으며, 기존에 연결되었던 ${reassignedCount}개의 요리가 기본 '시그니처' 카테고리로 재조정되었습니다.`);
    }

    // 3. Re-render UI
    renderCategoryList();
    renderMenuTable();
  };

  // Category Add Form Submit
  categoryAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const catNameVal = categoryAddName.value.trim();
    if (catNameVal === '') return;

    let categories = getCategoriesStorage();
    
    // Check for duplicates
    if (categories.some(c => c.name === catNameVal)) {
      alert('이미 동일한 이름의 카테고리가 존재합니다.');
      return;
    }

    // Create safe alphanumeric slug ID
    const catIdVal = 'custom-' + Date.now();

    const newCat = {
      id: catIdVal,
      name: catNameVal
    };

    categories.push(newCat);
    saveCategoriesStorage(categories);

    categoryAddName.value = '';
    renderCategoryList();
    renderMenuTable();
  });

  // Category Modal Toggle Open/Close
  btnManageCategoriesModal.addEventListener('click', () => {
    renderCategoryList();
    categoryModalOverlay.classList.add('active');
  });

  const closeCategoryModal = () => {
    categoryModalOverlay.classList.remove('active');
  };

  btnCategoryModalClose.addEventListener('click', closeCategoryModal);
  categoryModalOverlay.addEventListener('click', (e) => {
    if (e.target === categoryModalOverlay) closeCategoryModal();
  });


  // Render Menu Category Filter Tabs Dynamically
  const renderMenuFilterTabs = () => {
    const menuFilterTabsContainer = document.getElementById('menu-filter-tabs');
    if (!menuFilterTabsContainer) return;

    const allCategories = getCategoriesStorage();
    
    let tabsHtml = `<div class="filter-tab ${activeMenuFilter === 'all' ? 'active' : ''}" data-menutab="all">전체보기</div>`;
    
    allCategories.forEach(cat => {
      tabsHtml += `<div class="filter-tab ${activeMenuFilter === cat.id ? 'active' : ''}" data-menutab="${cat.id}">${cat.name}</div>`;
    });

    menuFilterTabsContainer.innerHTML = tabsHtml;

    // Bind click events on generated tabs
    const newTabs = menuFilterTabsContainer.querySelectorAll('.filter-tab');
    newTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        newTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMenuFilter = tab.getAttribute('data-menutab');
        renderMenuTable();
      });
    });
  };

  // Render Menu Table list
  const renderMenuTable = () => {
    const menus = getMenuStorage();

    // Render filter tabs dynamically
    renderMenuFilterTabs();

    let filteredList = menus;

    // Category Tabs
    if (activeMenuFilter !== 'all') {
      filteredList = filteredList.filter(m => m.category === activeMenuFilter);
    }

    // Search Input
    if (activeMenuSearch.trim() !== '') {
      const searchLower = activeMenuSearch.toLowerCase();
      filteredList = filteredList.filter(m => 
        m.name.toLowerCase().includes(searchLower) || 
        m.desc.toLowerCase().includes(searchLower) || 
        m.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    menuTableBody.innerHTML = '';

    if (filteredList.length === 0) {
      menuTableBody.style.display = 'none';
      menuEmptyState.style.display = 'block';
      return;
    }

    menuTableBody.style.display = 'table-row-group';
    menuEmptyState.style.display = 'none';

    const allCategories = getCategoriesStorage();

    filteredList.forEach(item => {
      const tr = document.createElement('tr');
      
      const matchedCat = allCategories.find(c => c.id === item.category);
      const catText = matchedCat ? matchedCat.name : item.category;
      
      // Determine badge class for categories
      const cleanCatClass = ['signature', 'donburi', 'sides'].includes(item.category) ? item.category : 'custom-category';
      
      // Category badge markup
      const categoryBadge = `<span class="category-badge ${cleanCatClass}">${catText}</span>`;
      
      // Tags badge array
      const tagsBadges = item.tags.map(t => `<span class="ingredient-tag" style="margin-right:4px;">${t}</span>`).join('');
      
      // Badge prefix display
      let badgeLabelMarkup = '';
      if (item.badge) {
        let badgeColorStyle = 'border-color: rgba(244,128,53,0.3); color: var(--color-gold); background: rgba(244,128,53,0.05);';
        if (item.badge === '인기') {
          badgeColorStyle = 'border-color: rgba(53,180,126,0.3); color: #35B47E; background: rgba(53,180,126,0.05);';
        }
        badgeLabelMarkup = `<span class="ingredient-tag" style="font-size:0.7rem; font-weight:700; ${badgeColorStyle} margin-right:6px;">[${item.badge}]</span>`;
      }

      tr.innerHTML = `
        <td>${categoryBadge}</td>
        <td class="res-name-cell">${badgeLabelMarkup}${item.name}</td>
        <td class="res-code">₩${item.price.toLocaleString()}</td>
        <td>
          <div style="display:flex; flex-wrap:wrap; gap:4px;">${tagsBadges}</div>
        </td>
        <td class="actions-cell">
          <button class="btn-action edit" data-action="edit-menu" data-id="${item.id}">수정</button>
          <button class="btn-action delete" data-action="delete-menu" data-id="${item.id}">삭제</button>
        </td>
      `;

      menuTableBody.appendChild(tr);
    });

    bindMenuTableActionButtons();
  };

  const bindMenuTableActionButtons = () => {
    const editBtns = document.querySelectorAll('[data-action="edit-menu"]');
    const deleteBtns = document.querySelectorAll('[data-action="delete-menu"]');

    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openMenuEditModal(id);
      });
    });

    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('정말로 이 메뉴를 완전히 삭제하시겠습니까?\n삭제 즉시 고객용 메인 페이지에서도 사라집니다.')) {
          deleteMenuItem(id);
        }
      });
    });
  };

  const deleteMenuItem = (id) => {
    let list = getMenuStorage();
    list = list.filter(m => m.id !== id);
    saveMenuStorage(list);

    // Sync deletion to Firestore
    if (typeof db !== 'undefined') {
      db.collection('menus').doc(id).delete()
        .catch(err => console.error('[Firestore] Error deleting menu:', err));
    }

    renderMenuTable();
  };

  // Open Edit Modals
  const openMenuEditModal = (id) => {
    const list = getMenuStorage();
    const item = list.find(m => m.id === id);

    if (!item) return;

    // Dynamically populate options in dropdown select first
    populateCategoryDropdown();

    // Reset Form
    menuManageForm.reset();

    // Setup fields
    formMenuId.value = item.id;
    formMenuName.value = item.name;
    formMenuPrice.value = item.price;
    formMenuTags.value = item.tags.join(', ');
    formMenuImage.value = item.image;
    formMenuDesc.value = item.desc;
    formMenuBadge.value = item.badge || '';

    // Direct mapping to the dynamic select dropdown value
    formMenuCategory.value = item.category;

    menuModalTitle.textContent = '메뉴 항목 정보 수정';
    menuModalOverlay.classList.add('active');
  };

  // Open Add Modals (blank fields)
  btnAddMenuModal.addEventListener('click', () => {
    populateCategoryDropdown();
    menuManageForm.reset();
    formMenuId.value = ''; // Ensure clear ID for add state
    menuModalTitle.textContent = '새로운 메뉴 항목 추가';
    menuModalOverlay.classList.add('active');
  });

  const closeMenuModal = () => {
    menuModalOverlay.classList.remove('active');
  };

  btnMenuModalClose.addEventListener('click', closeMenuModal);
  menuModalOverlay.addEventListener('click', (e) => {
    if (e.target === menuModalOverlay) closeMenuModal();
  });

  // Handle Menu Edit / Add Form Submit
  menuManageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const idVal = formMenuId.value;
    const nameVal = formMenuName.value;
    const categoryVal = formMenuCategory.value;
    const priceVal = parseInt(formMenuPrice.value);
    const descVal = formMenuDesc.value;
    const imgVal = formMenuImage.value;
    const badgeVal = formMenuBadge.value;
    
    const tagsVal = formMenuTags.value.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    let menus = getMenuStorage();

    if (idVal.trim() !== '') {
      // 1. EDIT MODE
      const index = menus.findIndex(m => m.id === idVal);
      if (index !== -1) {
        menus[index].name = nameVal;
        menus[index].category = categoryVal;
        menus[index].price = priceVal;
        menus[index].tags = tagsVal;
        menus[index].image = imgVal;
        menus[index].desc = descVal;
        menus[index].badge = badgeVal;
      }
    } else {
      // 2. ADD MODE
      const newItem = {
        id: 'MENU-' + Date.now(),
        name: nameVal,
        category: categoryVal,
        price: priceVal,
        tags: tagsVal,
        image: imgVal,
        desc: descVal,
        badge: badgeVal
      };
      menus.push(newItem);
    }

    saveMenuStorage(menus);
    renderMenuTable();
    closeMenuModal();
  });

  // Menu Search Input
  menuSearchInput.addEventListener('input', (e) => {
    activeMenuSearch = e.target.value;
    renderMenuTable();
  });


  /* ==========================================
     5. INSTAGRAM FEED MANAGEMENT SYSTEM
     ========================================== */
  const instagramTableBody = document.getElementById('instagram-table-body');
  const instagramEmptyState = document.getElementById('instagram-empty-state');
  const btnAddInstagramModal = document.getElementById('btn-add-instagram-modal');
  const instagramModalOverlay = document.getElementById('instagram-modal-overlay');
  const btnInstagramModalClose = document.getElementById('btn-instagram-modal-close');
  const instagramManageForm = document.getElementById('instagram-manage-form');
  const instagramFormId = document.getElementById('instagram-form-id');
  const instagramFormImage = document.getElementById('instagram-form-image');
  const instagramFormLink = document.getElementById('instagram-form-link');
  const instagramFormDate = document.getElementById('instagram-form-date');
  const instagramFormCaption = document.getElementById('instagram-form-caption');
  const instagramModalTitle = document.getElementById('instagram-modal-title');

  const getInstagramStorage = () => {
    return JSON.parse(localStorage.getItem('busendong_instagram_feeds')) || [];
  };

  const saveInstagramStorage = (feeds) => {
    localStorage.setItem('busendong_instagram_feeds', JSON.stringify(feeds));
    if (typeof db !== 'undefined') {
      feeds.forEach(feed => {
        db.collection('instagram_feeds').doc(feed.id).set(feed)
          .catch(err => console.error('[Firestore] Error saving instagram feed:', err));
      });
    }
  };

  const deleteInstagramItem = (id) => {
    let list = getInstagramStorage();
    list = list.filter(f => f.id !== id);
    saveInstagramStorage(list);

    if (typeof db !== 'undefined') {
      db.collection('instagram_feeds').doc(id).delete()
        .catch(err => console.error('[Firestore] Error deleting instagram feed:', err));
    }
    renderInstagramTable();
  };

  const renderInstagramTable = () => {
    const feeds = getInstagramStorage();
    instagramTableBody.innerHTML = '';

    if (feeds.length === 0) {
      instagramTableBody.style.display = 'none';
      instagramEmptyState.style.display = 'block';
      return;
    }

    instagramTableBody.style.display = 'table-row-group';
    instagramEmptyState.style.display = 'none';

    feeds.forEach(item => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>
          <img src="${item.mediaUrl}" alt="인스타 이미지" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid var(--glass-border);">
        </td>
        <td class="res-name-cell" style="vertical-align: middle;">
          <div style="max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${item.caption}
          </div>
        </td>
        <td class="res-code" style="vertical-align: middle;">${item.date}</td>
        <td class="actions-cell" style="vertical-align: middle;">
          <button class="btn-action edit" data-action="edit-instagram" data-id="${item.id}">수정</button>
          <button class="btn-action delete" data-action="delete-instagram" data-id="${item.id}">삭제</button>
        </td>
      `;

      instagramTableBody.appendChild(tr);
    });

    bindInstagramTableActionButtons();
  };

  const bindInstagramTableActionButtons = () => {
    const editBtns = instagramTableBody.querySelectorAll('[data-action="edit-instagram"]');
    const deleteBtns = instagramTableBody.querySelectorAll('[data-action="delete-instagram"]');

    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openInstagramEditModal(id);
      });
    });

    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('정말로 이 인스타 피드를 삭제하시겠습니까?\n삭제 시 메인 홈페이지 인스타 피드에서도 즉시 제거됩니다.')) {
          deleteInstagramItem(id);
        }
      });
    });
  };

  const openInstagramEditModal = (id) => {
    const list = getInstagramStorage();
    const item = list.find(f => f.id === id);
    if (!item) return;

    instagramManageForm.reset();
    instagramFormId.value = item.id;
    instagramFormImage.value = item.mediaUrl;
    instagramFormLink.value = item.permalink;
    instagramFormDate.value = item.date;
    instagramFormCaption.value = item.caption;

    instagramModalTitle.textContent = '인스타 피드 정보 수정';
    instagramModalOverlay.classList.add('active');
  };

  btnAddInstagramModal.addEventListener('click', () => {
    instagramManageForm.reset();
    instagramFormId.value = '';
    
    // 기본 날짜 자동 세팅 (오늘 날짜)
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    instagramFormDate.value = formattedDate;

    instagramModalTitle.textContent = '새로운 인스타 피드 추가';
    instagramModalOverlay.classList.add('active');
  });

  const closeInstagramModal = () => {
    instagramModalOverlay.classList.remove('active');
  };

  btnInstagramModalClose.addEventListener('click', closeInstagramModal);
  instagramModalOverlay.addEventListener('click', (e) => {
    if (e.target === instagramModalOverlay) closeInstagramModal();
  });

  instagramManageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const idVal = instagramFormId.value;
    const imgVal = instagramFormImage.value;
    const linkVal = instagramFormLink.value;
    const dateVal = instagramFormDate.value;
    const captionVal = instagramFormCaption.value;

    let feeds = getInstagramStorage();

    if (idVal.trim() !== '') {
      // EDIT MODE
      const index = feeds.findIndex(f => f.id === idVal);
      if (index !== -1) {
        feeds[index].mediaUrl = imgVal;
        feeds[index].permalink = linkVal;
        feeds[index].date = dateVal;
        feeds[index].caption = captionVal;
      }
    } else {
      // ADD MODE
      const newItem = {
        id: 'INSTA-' + Date.now(),
        mediaUrl: imgVal,
        permalink: linkVal,
        date: dateVal,
        caption: captionVal
      };
      feeds.push(newItem);
    }

    saveInstagramStorage(feeds);
    renderInstagramTable();
    closeInstagramModal();
  });


  /* ==========================================
     6. INITIALIZATION & RE-RENDER METHOD CALS
     ========================================== */

  // Realtime Firestore listeners for Admin Page
  if (typeof db !== 'undefined') {
    // 1. Reservations Realtime Sync
    db.collection('reservations').onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach(doc => list.push(doc.data()));
      // Sort: Newest first
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      localStorage.setItem('busendong_reservations', JSON.stringify(list));
      renderReservationsTable();
    }, (error) => {
      console.error("[Firestore] Admin Reservations listener error:", error);
    });

    // 2. Categories Realtime Sync
    db.collection('categories').onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach(doc => list.push(doc.data()));
      if (list.length > 0) {
        localStorage.setItem('busendong_categories', JSON.stringify(list));
        renderMenuTable();
      }
    }, (error) => {
      console.error("[Firestore] Admin Categories listener error:", error);
    });

    // 3. Menus Realtime Sync
    db.collection('menus').onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach(doc => list.push(doc.data()));
      if (list.length > 0) {
        localStorage.setItem('busendong_menu_items', JSON.stringify(list));
        renderMenuTable();
      }
    }, (error) => {
      console.error("[Firestore] Admin Menus listener error:", error);
    });

    // 4. Instagram Feeds Realtime Sync
    db.collection('instagram_feeds').onSnapshot((snapshot) => {
      const list = [];
      snapshot.forEach(doc => list.push(doc.data()));
      if (list.length > 0) {
        // Sort by ID descending (newest first)
        list.sort((a, b) => b.id.localeCompare(a.id));
        localStorage.setItem('busendong_instagram_feeds', JSON.stringify(list));
        renderInstagramTable();
      } else {
        // Seeding database with 4 mock feeds if completely empty
        console.log('[Firestore] instagram_feeds 컬렉션이 비어있어 기본 데모 데이터를 등록합니다.');
        const mockFeeds = [
          {
            id: 'INSTA-4',
            mediaUrl: 'asset/img/kaisendon-signature.png',
            permalink: 'https://instagram.com/jaredesign0621',
            caption: '매일 아침 새벽 수산시장에서 공수해 온 대광어로 준비한 120시간 저온 숙성 카이센동, 부센동입니다. 오늘도 신선하고 맛있는 하루를 대접해 드리기 위해 정성껏 오픈 준비를 마쳤습니다. 🐟✨',
            date: '2026.06.28'
          },
          {
            id: 'INSTA-3',
            mediaUrl: 'asset/img/kaisendon-special.png',
            permalink: 'https://instagram.com/jaredesign0621',
            caption: '단골 고객님들께 전하는 기쁜 소식! 캐나다산 최고급 우니(성게알)와 싱싱한 오도로가 가득 들어간 스페셜 카이센동 재료가 신선하게 입고되었습니다. 주말 저녁 낭만적인 광안리 데이트는 부센동과 함께하세요. 🥂🍣',
            date: '2026.06.26'
          },
          {
            id: 'INSTA-2',
            mediaUrl: 'asset/img/restaurant-interior.png',
            permalink: 'https://instagram.com/jaredesign0621',
            caption: '아늑하고 따뜻한 우드 감성의 셰프 카운터(다찌) 석에서 재료 하나하나의 설명과 함께 특별한 미식 경험을 즐겨보세요. 혼술 및 반주용 사케 도쿠리도 시원하고 산뜻하게 준비되어 있습니다. 🍶🪵',
            date: '2026.06.23'
          },
          {
            id: 'INSTA-1',
            mediaUrl: 'asset/img/hero-bg.png',
            permalink: 'https://instagram.com/jaredesign0621',
            caption: '눈부시게 푸르른 낮부터 감성 짙은 노을이 내려앉는 저녁까지, 광안리 바다를 산책하신 뒤 부센동에서 깊고 진한 감칠맛 한 그릇으로 완벽한 부산 여행의 마침표를 찍어보세요. 🌅🌊',
            date: '2026.06.20'
          }
        ];
        mockFeeds.forEach(feed => {
          db.collection('instagram_feeds').doc(feed.id).set(feed)
            .catch(err => console.error(err));
        });
      }
    }, (error) => {
      console.error("[Firestore] Admin Instagram listener error:", error);
    });
  }

  renderReservationsTable();
  renderMenuTable();
  renderInstagramTable();

  // Watch for cross-tab updates (fallback)
  window.addEventListener('storage', (e) => {
    if (e.key === 'busendong_reservations') {
      renderReservationsTable();
    }
    if (e.key === 'busendong_menu_items' || e.key === 'busendong_categories') {
      renderMenuTable();
    }
    if (e.key === 'busendong_instagram_feeds') {
      renderInstagramTable();
    }
  });

});

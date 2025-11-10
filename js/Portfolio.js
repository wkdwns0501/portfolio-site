// 스크롤
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === Reveal Animation (once + loop 버전) ===
// 한 번만 등장하는 요소
const revealOnceEls = document.querySelectorAll('.reveal-once');
// 반복해서 나타나는 요소
const revealLoopEls = document.querySelectorAll('.reveal-loop');

// 한 번만 실행되는 reveal
const revealOnceObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // 한 번만 실행
    }
  });
}, {
  threshold: 0.2
});
revealOnceEls.forEach(el => revealOnceObserver.observe(el));

// 스크롤할 때마다 반복 실행되는 reveal
const revealLoopObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});
revealLoopEls.forEach(el => revealLoopObserver.observe(el));

// 프로젝트 이미지 갤러리
(() => {
  const modal = document.querySelector('#imgModal');
  const slidesWrap = document.querySelector('#modalSlides');
  const btnClose = modal.querySelector('.modal-close');
  const btnPrev = modal.querySelector('.nav.prev');
  const btnNext = modal.querySelector('.nav.next');
  const backdrop = modal.querySelector('.modal-backdrop');
  const counters = {
    now: document.querySelector('#slideNow'),
    total: document.querySelector('#slideTotal'),
  };

  let gallery = [];
  let index = 0;

  // 프로젝트 썸네일 클릭 → 갤러리 열기
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.project-card .thumb');
    if (!thumb) return;

    // 이미지 목록 만들기: data-gallery 우선, 없으면 data-modal-img 단일 사용
    const dataList = thumb.getAttribute('data-gallery');
    if (dataList) {
      gallery = dataList.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      gallery = [thumb.getAttribute('data-modal-img')].filter(Boolean);
    }
    if (!gallery.length) return;

    index = 0;
    openModal();
  });

  function openModal() {
    // 슬라이드 생성
    slidesWrap.innerHTML = gallery.map(src => `
      <div class="slide"><img src="${src}" alt=""></div>
    `).join('');

    updateCounter();
    updateTransform();

    modal.classList.add('show');

    // 포커스 트랩 간단 처리 (접근성 보완)
    btnClose.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    gallery = [];
    index = 0;
    slidesWrap.innerHTML = '';
  }

  function updateTransform() {
    slidesWrap.style.transform = `translateX(${-index * 100}%)`;
  }
  function updateCounter() {
    counters.now.textContent = String(index + 1);
    counters.total.textContent = String(gallery.length);
    // 화살표 보임/숨김 (한 장이면 화살표 숨김)
    const showNav = gallery.length > 1;
    btnPrev.style.display = showNav ? '' : 'none';
    btnNext.style.display = showNav ? '' : 'none';
  }

  function prev() {
    if (!gallery.length) return;
    index = (index - 1 + gallery.length) % gallery.length;
    updateTransform(); updateCounter();
  }
  function next() {
    if (!gallery.length) return;
    index = (index + 1) % gallery.length;
    updateTransform(); updateCounter();
  }

  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // 키보드 제어
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // 터치 스와이프
  let tX = 0, moving = false;
  slidesWrap.addEventListener('touchstart', (e) => {
    if (!modal.classList.contains('show')) return;
    tX = e.touches[0].clientX; moving = true;
  }, { passive: true });
  slidesWrap.addEventListener('touchmove', (e) => {
    if (!moving) return;
    const dx = e.touches[0].clientX - tX;
    // 살짝 끌리는 시각효과(선택): 필요 없으면 주석
    // slidesWrap.style.transform = `translateX(${(-index*100) + dx / (slidesWrap.clientWidth) * 100}%)`;
  }, { passive: true });
  slidesWrap.addEventListener('touchend', (e) => {
    if (!moving) return;
    const dx = e.changedTouches[0].clientX - tX;
    moving = false;
    if (Math.abs(dx) > 50) (dx > 0 ? prev() : next());
    else updateTransform();
  });
})();

// 모바일 네비 토글
(() => {
  const header = document.querySelector('header');
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#siteNav');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!header || !btn || !nav) return;

  const open = () => {
    header.classList.add('nav-open');
    document.body.classList.add('menu-open');
    backdrop?.classList.add('show');
  };
  const close = () => {
    header.classList.remove('nav-open');
    document.body.classList.remove('menu-open');
    backdrop?.classList.remove('show');
  };

  btn.addEventListener('click', () => {
    if (header.classList.contains('nav-open')) close();
    else open();
  });
  backdrop?.addEventListener('click', close);

  // 메뉴 클릭 시 자동 닫기
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) close();
  });

  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) close();
  });
})();

// 맨 위 이동 버튼
const toTopEl = document.querySelector('#toTop');

window.addEventListener('scroll', function() {
  if (this.window.scrollY >= 400) {
    toTopEl.classList.add('show');
  } else {
    toTopEl.classList.remove('show');
  }
});

toTopEl.addEventListener('click', function() {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

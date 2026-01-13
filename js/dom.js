export const $ = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

export const dom = {
  header: $('header'),
  revealOnceEls: $$('.reveal-once'),
  revealLoopEls: $$('.reveal-loop'),
  modal: $('#imgModal'),
  slidesWrap: $('#modalSlides'),
  btnClose: $('.modal-close'),
  btnPrev: $('.nav .prev'),
  btnNext: $('.nav .next'),
  modalBackdrop: $('.modal-backdrop'),
  counterNow: $('#slideNow'),
  counterTotal: $('#slideTotal'),
  menuBtn: $('.menu-toggle'),
  nav: $('#siteNav'),
  navBackdrop: $('.nav-backdrop'),
  toTop: $('#toTop')
};
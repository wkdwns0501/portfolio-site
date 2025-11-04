// ScrollMagic 사용
// init controller
const controller = new ScrollMagic.Controller();

const spyEls = document.querySelectorAll('section.scroll-spy');
// console.log(spyEls);
        //foreach(콜백 함수(요소, 인덱스))
spyEls.forEach(function (spyEl, index) {
  // console.log(spyEl, index);
  // create a scene
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 감시할 장면 추가 및 옵션 지정
    triggerHook: 0.5 // 화면의 50% 지점에서 보여짐 여부 감시 (0~1사이 지정)
  })
      .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
      .addTo(controller); // 컨트롤러에 장면을 할당 (필수)
});

// Swiper 사용
const swiper = new Swiper('.project .swiper', {
  // 슬라이드 옵션 지정
  direction: 'horizontal', // 수평 슬라이드 (기본값)
  loop: true, // 반복 재생 여부, 1 -> 2 -> 3 -> 다시 1
  // autoplay: { // 자동 재생 여부
  //   delay: 5000 // 5초마다 슬라이드 바뀜 (기본값: 3000)
  // },

  // 페이지네이션 옵션
  pagination: {
    el: '.project .swiper-pagination',
    clickable: true // 사용자의 페이지네이션 요소 제어 가능 여부
  },

  // 이전/다음 슬라이드 버튼 옵션
  navigation: {
    nextEl: '.project .swiper-button-next',
    prevEl: '.project .swiper-button-prev',
  },
});

// 모달창 띄우기
const imgModal = document.querySelector('#imgModal');
const imgModalBtnList = document.querySelectorAll('.btn-modal-img');
const closeBtn = document.querySelector("#imgModal .close-btn");
const imgBody = document.querySelector("#imgModal img");

/* 
  function 함수 vs => 함수
  - function 에서 this는 이벤트가 실행된 요소
  - => 에서 this는 자신만의 this를 갖지 않고, 선언된 시점의 스코프(this)를 그대로 사용
  - this 사용시 function을 사용
  - => 는 this 사용 불가이므로 클래스 내부 등에서만 적절
*/

imgModalBtnList.forEach((btn, index) => {
  btn.addEventListener('click',function() {
    imgModal.style.display = 'flex';
    // imgBody.src = `images/work_${index * 2 + 1}.jpg`;
    imgBody.src = btn.dataset.imageSrc;
  })
});

closeBtn.addEventListener('click', function() {
  imgModal.style.display = 'none';
})



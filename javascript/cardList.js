const cards = [
  { title: 'Todo 리스트 작성하기', label: [{ name: 'todo', color: '#23bf02' }], summary: '할일을 이젠 Todo리스트를 통해 관리...' },
  { title: '자바스크립트로 동적 생성', label: [{ name: 'todo', color: '#23bf02' }], summary: '카드 리스트를 자바스크립트를 활용해 동적으로...' },
  { title: '퍼블리싱 연습', label: [{ name: 'todo', color: '#23bf02' }], summary: 'display를 적절히 사용해서 레이아웃을 잡아본다.' },
  { title: '새로운 프로젝트 기획', label: [{ name: 'todo', color: '#23bf02' }, { name: 'project', color: '#ababf0' }], summary: '일상에 활력을 줄 수 있는 활동을 찾아...' },
];

const db = {
  cards: {
    get: (page, options) => {
      const cs = (options && options.label) ? cards.filter(c => c.label.findIndex(l => l.name === options.label) > -1) : cards;
      const count = options ? (options.count || 10) : 10;
      const start = (page - 1) * count;
      let result = [];

      for (let i = start, len = start + count; i < len; i++) {
        result.push(
          {id: i, ...cs[i % cs.length]}
        );
      }

      return result;
    },
  }
};

const getCardsAPI = ({ page, options }) => {
  let cardList;
  if (typeof page === 'number') {
     cardList = db.cards.get(page, options);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!cardList) {
        reject({
          success: false,
          list: null,
        });
      } else {
        resolve({
          success: true,
          list: cardList
        });
      }
    }, 0);
  });
};

// 사용예
// getCardsAPI({ page: 2, options: { label: 'todo' }}).then(res => {
//   console.log(res.success, res.list.length, res);
// });

window.onload = () => {
  // 코드 작성
};

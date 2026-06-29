// Firebase Configuration 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyCCynvPMWFAjzjQvdf0uNmSatC6qYHGzI4",
  authDomain: "busendong-ab8a8.firebaseapp.com",
  projectId: "busendong-ab8a8",
  storageBucket: "busendong-ab8a8.firebasestorage.app",
  messagingSenderId: "1055864645706",
  appId: "1:1055864645706:web:3a33380ac71386f5911eb3",
  measurementId: "G-ZKLS25ZZGS"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * Firestore 컬렉션이 비어 있는 경우 기본 데이터를 시딩(Seed)하는 헬퍼 함수
 * @param {string} collectionName 
 * @param {Array} defaultData 
 */
async function seedCollectionIfEmpty(collectionName, defaultData) {
  try {
    const snapshot = await db.collection(collectionName).limit(1).get();
    if (snapshot.empty) {
      console.log(`[Firestore] ${collectionName} 컬렉션이 비어 있어 기본 데이터를 추가합니다...`);
      const batch = db.batch();
      defaultData.forEach(item => {
        const docRef = item.id ? db.collection(collectionName).doc(String(item.id)) : db.collection(collectionName).doc();
        batch.set(docRef, item);
      });
      await batch.commit();
      console.log(`[Firestore] ${collectionName} 컬렉션 기본 데이터 주입 완료!`);
    }
  } catch (error) {
    console.error(`[Firestore] ${collectionName} 기본 데이터 주입 에러:`, error);
  }
}

// 초기화 트리거
async function initializeDatabase(defaultMenus, defaultCategories) {
  await seedCollectionIfEmpty('menus', defaultMenus);
  await seedCollectionIfEmpty('categories', defaultCategories);
}

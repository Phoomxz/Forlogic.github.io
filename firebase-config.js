// Visitor Counter using Firebase Realtime Database
async function initializeVisitorCounter() {
  try {
    // Import Firebase
    const { getDatabase, ref, get, set } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');
    
    const firebaseConfig = {
      apiKey: "AIzaSyAxIgf1_ttc1IMUvEPTkAwa09KkReHxd4M",
      authDomain: "forlogic-d98b1.firebaseapp.com",
      databaseURL: "https://forlogic-d98b1-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "forlogic-d98b1",
      storageBucket: "forlogic-d98b1.firebasestorage.app",
      messagingSenderId: "299599436273",
      appId: "1:299599436273:web:93b19bedd1535c6e27cc50",
      measurementId: "G-DDVQG8SYLC"
    };

    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    const visitorRef = ref(database, 'visitor_count');
    const snapshot = await get(visitorRef);
    
    let count = 0;
    if (snapshot.exists()) {
      count = snapshot.val();
    }
    
    // เพิ่มค่า 1
    count++;
    await set(visitorRef, count);
    
    // แสดงในหน้าเว็บ
    const visitorElement = document.getElementById('visitor-count');
    if (visitorElement) {
      visitorElement.textContent = count.toLocaleString('th-TH');
    }
    
    console.log('✅ Visitor count updated:', count);
  } catch (error) {
    console.error('❌ Error updating visitor count:', error);
  }
}

// เรียกใช้เมื่อหน้าโหลด
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVisitorCounter);
} else {
  initializeVisitorCounter();
}

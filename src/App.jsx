import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  // 1. المشاريع
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('my_projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Personal Portfolio & Mini LMS',
        description: 'موقع شخصي متكامل مع لوحة تحكم لإدارة المواد الدراسية، الملخصات، والمهام اليومية باستخدام React.',
        tech: 'React, JavaScript, CSS3',
        liveUrl: '#',
        githubUrl: 'https://github.com',
        status: 'قيد التطوير 🚧'
      }
    ];
  });
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projLiveUrl, setProjLiveUrl] = useState('');
  const [projGithubUrl, setProjGithubUrl] = useState('');
  const [projStatus, setProjStatus] = useState('مكتمل ✅');

  // 2. خزنة الصور (Image Vault)
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('my_images_vault');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'خريطة طبقات الشبكة OSI Model',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
        category: 'مذاكرة'
      }
    ];
  });
  const [imgTitle, setImgTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgCategory, setImgCategory] = useState('مذاكرة');

  // 3. المهام
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my_tasks');
    return saved ? JSON.parse(saved) : [{ id: 1, text: 'مراجعة شابتر 1 Computer Networks', done: false }];
  });
  const [newTask, setNewTask] = useState('');

  // 4. المواد الدراسية
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('my_subjects_v2');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Computer Networks',
        status: 'جاري الدراسة',
        notes: [
          { id: 101, title: 'ملخص شابتر 1 - OSI Model', content: 'الـ OSI بيتكون من 7 طبقات: Physical, Data Link, Network, Transport, Session, Presentation, Application.' }
        ],
        videos: [],
        pdfs: []
      }
    ];
  });
  const [newSubject, setNewSubject] = useState('');

  // 5. الإنجازات
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('my_achievements');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'بناء نظام إدارة مواد ومشاريع بـ React 🚀', date: '2026-11-18' }
    ];
  });
  const [newAchievement, setNewAchievement] = useState('');

  // حالات المحتوى داخل المادة
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  // الحفظ التلقائي
  useEffect(() => localStorage.setItem('my_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => {
    try {
      localStorage.setItem('my_images_vault', JSON.stringify(images));
    } catch (e) {
      alert('مساحة التخزين في المتصفح امتلأت! يفضل استخدام روابط الصور من الإنترنت أو حذف بعض الصور القديمة.');
    }
  }, [images]);
  useEffect(() => localStorage.setItem('my_tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('my_subjects_v2', JSON.stringify(subjects)), [subjects]);
  useEffect(() => localStorage.setItem('my_achievements', JSON.stringify(achievements)), [achievements]);

  // دوال إضافة الصور
  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (!imgTitle.trim() || !imgUrl.trim()) return;
    setImages([{ id: Date.now(), title: imgTitle, url: imgUrl, category: imgCategory }, ...images]);
    setImgTitle('');
    setImgUrl('');
  };

  const handleLocalImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages([{
        id: Date.now(),
        title: imgTitle.trim() || file.name,
        url: reader.result,
        category: imgCategory
      }, ...images]);
      setImgTitle('');
    };
    reader.readAsDataURL(file);
  };

  // دوال الإضافة الأخرى
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;
    setProjects([{
      id: Date.now(),
      title: projTitle,
      description: projDesc,
      tech: projTech || 'Web Development',
      liveUrl: projLiveUrl.trim() || '',
      githubUrl: projGithubUrl.trim() || '',
      status: projStatus
    }, ...projects]);
    setProjTitle('');
    setProjDesc('');
    setProjTech('');
    setProjLiveUrl('');
    setProjGithubUrl('');
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask('');
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name: newSubject, status: 'جديدة', notes: [], videos: [], pdfs: [] }]);
    setNewSubject('');
  };

  const addAchievement = (e) => {
    e.preventDefault();
    if (!newAchievement.trim()) return;
    setAchievements([...achievements, { id: Date.now(), title: newAchievement, date: new Date().toISOString().split('T')[0] }]);
    setNewAchievement('');
  };

  // دوال المحتوى جوه المادة
  const currentSubject = subjects.find(s => s.id === selectedSubjectId);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    setSubjects(subjects.map(sub => 
      sub.id === selectedSubjectId 
        ? { ...sub, notes: [...sub.notes, { id: Date.now(), title: noteTitle, content: noteContent }] }
        : sub
    ));
    setNoteTitle('');
    setNoteContent('');
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;
    setSubjects(subjects.map(sub => 
      sub.id === selectedSubjectId 
        ? { ...sub, videos: [...sub.videos, { id: Date.now(), title: videoTitle, url: videoUrl }] }
        : sub
    ));
    setVideoTitle('');
    setVideoUrl('');
  };

  const handleLocalVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setSubjects(subjects.map(sub => 
      sub.id === selectedSubjectId 
        ? { ...sub, videos: [...sub.videos, { id: Date.now(), title: file.name, url: localUrl, isLocal: true }] }
        : sub
    ));
  };

  const handleAddPdf = (e) => {
    e.preventDefault();
    if (!pdfTitle.trim() || !pdfUrl.trim()) return;
    setSubjects(subjects.map(sub => 
      sub.id === selectedSubjectId 
        ? { ...sub, pdfs: [...sub.pdfs, { id: Date.now(), title: pdfTitle, url: pdfUrl }] }
        : sub
    ));
    setPdfTitle('');
    setPdfUrl('');
  };

  return (
    <div className="portfolio-app" dir="rtl" style={{ fontFamily: 'sans-serif', background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      {/* ================= Header ================= */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', background: '#1e293b', borderBottom: '1px solid #334155', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveTab('home'); setSelectedSubjectId(null); }}>
          Mohamed<span style={{ color: '#0ef' }}>.</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { setActiveTab('home'); setSelectedSubjectId(null); }} style={navBtnStyle(activeTab === 'home')}>الرئيسية والمشاريع</button>
          <button onClick={() => { setActiveTab('dashboard'); setSelectedSubjectId(null); }} style={navBtnStyle(activeTab === 'dashboard')}>⚙️ لوحة التحكم</button>
        </nav>
      </header>

      {/* ================= الصفحة الرئيسية ================= */}
      {activeTab === 'home' && (
        <div>
          {/* 1. Home Hero */}
          <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', minHeight: '80vh', padding: '40px', gap: '30px' }}>
            <div style={{ maxWidth: '600px' }}>
              <h3 style={{ fontSize: '26px' }}>أهلاً، أنا</h3>
              <h1 style={{ fontSize: '48px', color: '#0ef', margin: '10px 0' }}>محمد رمضان</h1>
              <h3 style={{ fontSize: '22px' }}>طالب أمن سيبراني & مطور واجهات أمامية</h3>
              <p style={{ margin: '15px 0', color: '#94a3b8', lineHeight: '1.7' }}>
                طالب أمن سيبراني بجامعة الأزهر ومطور ويب. أجمع بين بناء واجهات مستخدم حديثة وتطبيق مبادئ حماية الأنظمة والشبكات.
              </p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <a href="#projects" style={{ ...actionBtnStyle, textDecoration: 'none' }}>تصفح مشاريعي 💻</a>
                <button onClick={() => setActiveTab('dashboard')} style={{ ...navBtnStyle(false), padding: '12px 20px', fontSize: '15px' }}>لوحة التحكم ⚙️</button>
              </div>
            </div>
            <div>
              <img src="/images/image.png" alt="Mohamed" style={{ width: '260px', borderRadius: '50%', border: '4px solid #0ef', boxShadow: '0 0 25px rgba(0, 238, 255, 0.3)' }} />
            </div>
          </section>

          {/* 2. Projects Section */}
          <section id="projects" style={{ padding: '60px 40px', background: '#1e293b' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '10px' }}>أحدث <span style={{ color: '#0ef' }}>المشاريع</span></h2>
              <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>مشاريع قمت ببنائها وتطويرها أو أعمل عليها حالياً</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
                {projects.map(proj => (
                  <div key={proj.id} style={{ background: '#0f172a', padding: '25px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, color: '#0ef', fontSize: '20px' }}>{proj.title}</h3>
                        <span style={{ fontSize: '12px', background: '#1e293b', padding: '4px 10px', borderRadius: '20px', border: '1px solid #475569' }}>{proj.status}</span>
                      </div>
                      <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>{proj.description}</p>
                      <div style={{ fontSize: '13px', color: '#38bdf8', marginBottom: '20px', fontWeight: 'bold' }}>
                        🛠️ {proj.tech}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #1e293b', paddingTop: '15px' }}>
                      {proj.liveUrl && proj.liveUrl !== '#' && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', background: '#0ef', color: '#0f172a', padding: '8px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                          معاينة الموقع 🌐
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', background: '#334155', color: '#fff', padding: '8px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                          الكود (GitHub) 💻
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. About Section */}
          <section id="about" style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>نبذة <span style={{ color: '#0ef' }}>عني</span></h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '16px' }}>
              أدرس الأمن السيبراني في جامعة الأزهر، وأطور مهاراتي باستمرار في بناء تطبيقات الويب باستخدام React و Next.js و JavaScript، بالإضافة لأساسيات البرمجة بلغة C++ و Java. هدفي هو الجمع بين التطوير الآمن وتجربة المستخدم السلسة.
            </p>
          </section>

          {/* 4. Contact Section */}
          <section id="contact" style={{ padding: '50px 40px', background: '#1e293b', textAlign: 'center', borderTop: '1px solid #334155' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>تواصل <span style={{ color: '#0ef' }}>معي</span></h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>متاح للتعاون في مشاريع الويب أو التدريب في مجال الأمن السيبراني</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={navBtnStyle(false)}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={navBtnStyle(false)}>LinkedIn</a>
            </div>
          </section>
        </div>
      )}

      {/* ================= لوحة التحكم (Dashboard) ================= */}
      {activeTab === 'dashboard' && !selectedSubjectId && (
        <div style={{ padding: '30px 40px', maxWidth: '1250px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', color: '#0ef', marginBottom: '25px' }}>⚙️ لوحة التحكم وإدارة المحتوى</h2>

          {/* القسم الجديد: خزنة الصور والمرئيات */}
          <div style={{ ...cardStyle, marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ margin: 0, color: '#0ef' }}>🖼️ خزنة الصور والمرئيات (احفظ صور من الإنترنت أو جهازك)</h3>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>عدد الصور المحفوظة: {images.length}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', margin: '20px 0', background: '#0f172a', padding: '15px', borderRadius: '8px' }}>
              {/* إضافة برابط من الإنترنت */}
              <form onSubmit={handleAddImageUrl} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#38bdf8' }}>🌐 حفظ صورة برابط من الإنترنت:</div>
                <input type="text" placeholder="عنوان أو وصف الصورة..." value={imgTitle} onChange={(e) => setImgTitle(e.target.value)} style={inputStyle} required />
                <input type="url" placeholder="الصق رابط الصورة هنا (https://...)" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} style={inputStyle} required />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={imgCategory} onChange={(e) => setImgCategory(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
                    <option value="مذاكرة">📚 مذاكرة ومحاضرات</option>
                    <option value="أمن سيبراني">🛡️ أمن سيبراني</option>
                    <option value="أفكار وتصاميم">💡 أفكار وتصاميم</option>
                    <option value="عام">📌 عام</option>
                  </select>
                  <button type="submit" style={subBtnStyle}>حفظ الرابط</button>
                </div>
              </form>

              {/* رفع صورة من الجهاز */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', borderRight: '1px solid #334155', paddingRight: '15px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#22c55e' }}>💻 أو ارفع صورة مباشرة من جهازك:</div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>اكتب عنوان الصورة في الخانة المجاورة أولاً ثم اختر الملف ليتم حفظه تلقائياً.</p>
                <input type="file" accept="image/*" onChange={handleLocalImageUpload} style={{ color: '#fff', fontSize: '13px', background: '#1e293b', padding: '10px', borderRadius: '6px' }} />
              </div>
            </div>

            {/* عرض شبكة الصور المحفوظة */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px', marginTop: '20px' }}>
              {images.map(img => (
                <div key={img.id} style={{ background: '#0f172a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
                  <a href={img.url} target="_blank" rel="noreferrer">
                    <img src={img.url} alt={img.title} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                  </a>
                  <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '11px', background: '#1e293b', color: '#0ef', padding: '2px 8px', borderRadius: '4px' }}>{img.category}</span>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '6px' }}>{img.title}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                      <a href={img.url} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '12px', textDecoration: 'none' }}>تكبير 🔍</a>
                      <button onClick={() => setImages(images.filter(item => item.id !== img.id))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>حذف 🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* باقي أقسام لوحة التحكم */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
            
            {/* 1. إدارة المشاريع */}
            <div style={cardStyle}>
              <h3>💻 إضافة مشروع جديد للموقع</h3>
              <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                <input type="text" placeholder="اسم المشروع..." value={projTitle} onChange={(e) => setProjTitle(e.target.value)} style={inputStyle} required />
                <textarea rows="2" placeholder="وصف مختصر للمشروع..." value={projDesc} onChange={(e) => setProjDesc(e.target.value)} style={inputStyle} required />
                <input type="text" placeholder="التقنيات (مثلاً: React, Tailwind, C++)" value={projTech} onChange={(e) => setProjTech(e.target.value)} style={inputStyle} />
                <input type="url" placeholder="رابط الموقع المباشر (اختياري https://...)" value={projLiveUrl} onChange={(e) => setProjLiveUrl(e.target.value)} style={inputStyle} />
                <input type="url" placeholder="رابط GitHub (اختياري https://...)" value={projGithubUrl} onChange={(e) => setProjGithubUrl(e.target.value)} style={inputStyle} />
                <select value={projStatus} onChange={(e) => setProjStatus(e.target.value)} style={inputStyle}>
                  <option value="مكتمل ✅">مكتمل ✅</option>
                  <option value="قيد التطوير 🚧">قيد التطوير 🚧</option>
                  <option value="فكرة قادمة 💡">فكرة قادمة 💡</option>
                </select>
                <button type="submit" style={subBtnStyle}>نشر المشروع في الموقع 🚀</button>
              </form>

              <div style={{ marginTop: '15px', borderTop: '1px solid #334155', paddingTop: '10px' }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>المشاريع المنشورة ({projects.length}):</div>
                {projects.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '8px 12px', borderRadius: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{p.title}</span>
                    <button onClick={() => setProjects(projects.filter(item => item.id !== p.id))} style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>حذف</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. مواد الكلية */}
            <div style={cardStyle}>
              <h3>📚 مواد الكلية (غرفة المذاكرة)</h3>
              <form onSubmit={addSubject} style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
                <input type="text" placeholder="اسم المادة (مثلاً: Network Security)" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <button type="submit" style={subBtnStyle}>إضافة</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {subjects.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{s.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                        📝 {s.notes.length} | 🎥 {s.videos.length} | 📄 {s.pdfs.length}
                      </div>
                    </div>
                    <button onClick={() => setSelectedSubjectId(s.id)} style={{ background: '#0ef', color: '#0f172a', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                      فتح 📂
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. المهام والإنجازات */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={cardStyle}>
                <h3>📌 المهام اليومية</h3>
                <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
                  <input type="text" placeholder="أضف مهمة..." value={newTask} onChange={(e) => setNewTask(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                  <button type="submit" style={subBtnStyle}>إضافة</button>
                </form>
                {tasks.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#0f172a', marginBottom: '6px', borderRadius: '6px' }}>
                    <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#fff', fontSize: '14px' }}>{t.text}</span>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => setTasks(tasks.map(item => item.id === t.id ? {...item, done: !item.done} : item))} style={{ background: '#22c55e', border: 'none', padding: '3px 8px', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>✓</button>
                      <button onClick={() => setTasks(tasks.filter(item => item.id !== t.id))} style={{ background: '#ef4444', border: 'none', padding: '3px 8px', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={cardStyle}>
                <h3>🏆 سجل الإنجازات</h3>
                <form onSubmit={addAchievement} style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
                  <input type="text" placeholder="أضف إنجاز..." value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                  <button type="submit" style={subBtnStyle}>إضافة</button>
                </form>
                {achievements.map(a => (
                  <div key={a.id} style={{ padding: '8px 10px', background: '#0f172a', marginBottom: '6px', borderRadius: '6px' }}>
                    <div style={{ color: '#0ef', fontWeight: 'bold', fontSize: '14px' }}>{a.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{a.date}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= صفحة تفاصيل المادة ================= */}
      {activeTab === 'dashboard' && selectedSubjectId && currentSubject && (
        <div style={{ padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={() => setSelectedSubjectId(null)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' }}>
            ⬅️ رجوع للوحة التحكم
          </button>

          <h1 style={{ color: '#0ef', fontSize: '30px', marginBottom: '25px' }}>📖 مادة: {currentSubject.name}</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '25px' }}>
            {/* الملخصات */}
            <div style={cardStyle}>
              <h3>📝 الملخصات والشرح المكتوب</h3>
              <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                <input type="text" placeholder="عنوان الشابتر أو الملخص..." value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} style={inputStyle} />
                <textarea rows="4" placeholder="اكتب شرحك أو تلخيصك هنا..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)} style={inputStyle} />
                <button type="submit" style={subBtnStyle}>حفظ الملخص</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentSubject.notes.map(note => (
                  <div key={note.id} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', borderRight: '3px solid #0ef' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#0ef' }}>{note.title}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* الفيديوهات */}
            <div style={cardStyle}>
              <h3>🎥 فيديوهات الشرح</h3>
              <div style={{ margin: '15px 0', padding: '10px', background: '#0f172a', borderRadius: '8px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>ارفع فيديو قصير من اللابتوب:</label>
                <input type="file" accept="video/*" onChange={handleLocalVideoUpload} style={{ color: '#fff', fontSize: '13px' }} />
              </div>
              <form onSubmit={handleAddVideo} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <input type="text" placeholder="عنوان الفيديو..." value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="رابط الفيديو (Drive أو mp4)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={inputStyle} />
                <button type="submit" style={subBtnStyle}>إضافة رابط فيديو</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentSubject.videos.map(vid => (
                  <div key={vid.id} style={{ background: '#0f172a', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>{vid.title}</div>
                    {vid.isLocal || vid.url.endsWith('.mp4') ? (
                      <video src={vid.url} controls style={{ width: '100%', borderRadius: '6px' }} />
                    ) : (
                      <a href={vid.url} target="_blank" rel="noreferrer" style={{ color: '#0ef', fontSize: '14px' }}>▶️ فتح ومشاهدة الفيديو</a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ملفات PDF */}
            <div style={cardStyle}>
              <h3>📄 ملفات وملازم PDF</h3>
              <form onSubmit={handleAddPdf} style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '15px 0' }}>
                <input type="text" placeholder="اسم الملف..." value={pdfTitle} onChange={(e) => setPdfTitle(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="رابط الملف على Google Drive..." value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} style={inputStyle} />
                <button type="submit" style={subBtnStyle}>حفظ الملف</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentSubject.pdfs.map(pdf => (
                  <div key={pdf.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '10px', borderRadius: '6px' }}>
                    <span>📄 {pdf.title}</span>
                    <a href={pdf.url} target="_blank" rel="noreferrer" style={{ background: '#3b82f6', color: '#fff', padding: '5px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px' }}>
                      فتح
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const navBtnStyle = (isActive) => ({
  background: isActive ? '#0ef' : 'transparent',
  color: isActive ? '#0f172a' : '#fff',
  border: '1px solid #0ef',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none'
});

const actionBtnStyle = {
  background: '#0ef',
  color: '#0f172a',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '15px'
};

const cardStyle = {
  background: '#1e293b',
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid #334155'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #475569',
  background: '#0f172a',
  color: '#fff',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
};

const subBtnStyle = {
  background: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '10px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold'
};
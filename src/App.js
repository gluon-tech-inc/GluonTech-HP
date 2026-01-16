import "./App.css";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";


function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // エラーをクリア
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 会社名のバリデーション
    if (!formData.company.trim()) {
      newErrors.company = "会社名は必須です";
    }

    // お名前のバリデーション
    if (!formData.name.trim()) {
      newErrors.name = "お名前は必須です";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "お名前は2文字以上で入力してください";
    }

    // メールアドレスのバリデーション
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "正しいメールアドレスを入力してください";
      }
    }

    // メッセージのバリデーション
    if (!formData.message.trim()) {
      newErrors.message = "メッセージは必須です";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "メッセージは10文字以上で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2重送信防止
    if (isSubmitting) {
      return;
    }

    // バリデーション
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const serviceID = "service_s8o48g5";
    const userID = "KaXDh5Y6K7Kc58Rzo"; 
  
    // 複数のテンプレートIDを配列で指定
    const templateIDs = ["template_p57jupy", "template_2s0o8ba"];
  
    try {
      // 2つのテンプレートに並列でメールを送信
      const results = await Promise.all(
        templateIDs.map((templateID) =>
          emailjs.send(serviceID, templateID,
            {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            company: formData.company.trim(),
          }, userID)
        )
      );
  
      console.log("メール送信成功:", results);
      alert("メールが送信されました！");
      setFormData({ name: "", email: "", message: "", company: "" });
      setErrors({});
    } catch (error) {
      console.error("メール送信に失敗しました", error);
      alert("メール送信に失敗しました。しばらく時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="container" onClick={closeMenu}>
      {/* ナビゲーションバー */}
      <nav className="navbar">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/gluontech_logo.png"} alt="グルーオンテック" className="logo-image" />
          <span className="logo-text">グルーオンテック</span>
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#top" onClick={toggleMenu}>ホーム</a>
          <a href="#services" onClick={toggleMenu}>サービス</a>
          <a href="#about" onClick={toggleMenu}>会社概要</a>
          <a href="#contact" onClick={toggleMenu}>お問い合わせ</a>
        </div>
        {/* ハンバーガーボタン */}
        <button 
          className="hamburger" 
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </nav>

      {/* ヒーローセクション */}
      <header className="hero">
        <div className="hero-text">
          <h1>テクノロジーで未来を創る</h1>
          <p>- 変革を実現するイノベーション -</p>
          <a href="#contact" className="cta-button">お問い合わせ</a>
        </div>
      </header>

      {/* サービス紹介 */}
      <section id="services" className="services">
        <h2>サービス</h2>
        <div className="service-container">
        {/* サービス1 */}
        <div className="service-item">
          <h3>システム開発</h3>
          <p>
          　お客様のニーズに合わせたシステムを、要件定義から開発、運用まで一貫してサポートします。<br />
          　業務効率化や競争力強化を実現するシステムを迅速に提供します。
          </p>
        </div>

        {/* サービス2 */}
        <div className="service-item">
          <h3>アプリ開発</h3>
          <p>
          　お客様のビジネスに最適なモバイルアプリケーションを、企画から開発、運用までサポートします。<br />
          　ユーザー体験を重視したアプリで、業務効率化や顧客満足度向上を実現します。
          </p>
        </div>

        {/* サービス3 */}
        <div className="service-item">
          <h3>DX推進プロジェクト</h3>
          <p>
          　企業のデジタルトランスフォーメーション（DX）を支援し、業務効率化や新しい価値創造を実現します。<br />
          　最新技術を活用したシステム導入から運用まで、戦略的にサポートし、変革を加速させます。
          </p>
        </div>

        {/* サービス4 */}
        <div className="service-item">
          <h3>ホームページ制作</h3>
          <p>
          　お客様のブランドや目的に合わせた魅力的なホームページを制作します。<br />
          　デザインから機能実装まで、使いやすさと視覚的な訴求力を重視したサイトを提供し、オンラインでの存在感を強化します。
          </p>
        </div>

        {/* サービス5 */}
        <div className="service-item">
          <h3>自社プロダクト</h3>
          <p>
            　水商売の全ての業務をDX化！業界初のデジタル管理へ。<br />
          </p>
          <a href="https://saihai-lp.gluon.jp" className="product1">付け回し管理システム</a>
          <p>
            　位置情報特化型SNS<br />
          </p>
          <a href="#" className="product1">Geop</a>
        </div>
      </div>
      </section>

      {/* 会社概要 */}
      <section id="about" className="about">
        <h2>会社概要</h2>
        <p>　私たちは、スピードと柔軟性を武器に、お客様のビジネスを支えるIT企業です。大手にはできない迅速な対応と、無駄を省いた適正価格で、価値あるソリューションを提供します。<br />
          　小さな会社だからこそ、お客様一人ひとりに寄り添い、本当に必要なものを見極め、最適な提案を行います。決まりきったパッケージではなく、お客様の課題に真剣に向き合い、最も効果的なIT戦略を共に築いていくことが私たちの使命です。<br />
          　私たちは、単なるITベンダーではありません。お客様と共に成長し、挑戦し続ける「パートナー」でありたいと考えています。スピード感ある開発、手の届く価格、そして誠実な提案で、あなたのビジネスを次のステージへと押し上げます。</p>
      </section>

      {/* お問い合わせフォーム */}
      <section id="contact" className="contact">
        <h2>お問い合わせ</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>会社名 <span className="required">*</span></label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.company ? "error" : ""}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}

          <label>お名前 <span className="required">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <label>メールアドレス <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <label>メッセージ <span className="required">*</span></label>
          <textarea
            rows={10}
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.message ? "error" : ""}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "送信"}
          </button>
        </form>
      </section>

      {/* フッター */}
      <footer className="footer">
        We are an Information Technology Company. Representative: Mikuni Fukumoto.
      </footer>

      <footer className="footer-mobile">
        We are an Information Technology Company.<br />
        Representative: Mikuni Fukumoto.
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';
import { useTranslation } from 'react-i18next';
import about from '../photos/15.jpg';

const About = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="about-page">
      <Container>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <img src={about} alt="About" className="about-image" />
          </Col>
          <Col md={8}>
            <h1 className="about-title">{t('about.brand')}</h1>
            <p className="about-description">
              I am a dedicated scientist with a passion for research and discovery. My work focuses on advancing our understanding of the natural world through rigorous experimentation and analysis.
            </p>
            <h2 className="about-subtitle">Research Interests</h2>
            <ul className="about-list">
              <li>Quantum Mechanics</li>
              <li>Particle Physics</li>
              <li>Astrophysics</li>
              <li>Biochemistry</li>
            </ul>
          
          </Col>  <h2 className="about-subtitle">Publications</h2>
            <p className="about-description">
              I have published numerous papers in prestigious journals, contributing to the body of knowledge in my field.
            </p>

            <h2>Tercumeyi hal</h2>
            <p>Həcər Yusif qızı Verdiyeva 18 dekabr 1961-ci ildə Bakı şəhərində anadan olmuşdur.1979-cu ildə orta məktəbi bitirmişdir.1986-cı ildə BDU-nun Tarix fakültəsini fərqlənmə diplomu ilə bitirmişdir.
H.Y.Verdiyeva 1979-cu ildən əmək fəaliyyətinə başlamış, 1982-ci ildən Azərbaycan Dövlət Tibb Universitetində baş preparator, baş laborant, müəllim vəzifələrində çalışmış, 2011-2015-ci illərdə Azərbaycan Respublikası Prezidentinin İşlər İdarəsinin Siyasi sənədlər Arxivinin(ARP İİ SSA) elmi araşdırmalar və nəşr şöbəsində məsləhətçi, 2015-2017-ci illərdə Azərbaycan Respublikası Prezidentinin Administrasiyasının Azərbaycan Respublikasının millətlərarası multikulturalizm və dini məsələlər üzrə Dövlət müşaviri xidmətində böyük məsləhətçi işləmişdir. 2017-ci ildən Azərbaycan Respublikası Prezidentinin İşlər İdarəsinin Siyasi sənədlər Arxivinin elmi katibidir.

H.Y.Verdiyeva 1993-cü ildə “XIX əsrin birinci yarısında Şimali Azərbaycanın əhalisi” adlı namizədlik dissertasiyasını, 2005-ci ildə “XIX-XX əsrin əvvəllərində Rusiya imperiyasının Şimali Azərbaycanda köçürmə siyasəti” adlı doktorluq dissertasiyasını müdafiə etmişdir. Rusiya Federasiyası, Almaniya, Türkiyə və Azərbaycan Respublikasında keçirilmiş beynəlxalq konfransların iştirakçısı olmuşdur. Azərbaycan tarixinin Yeni və Ən Yeni dövrlərinin etno-konfessional, konfliktologiya və Qafqazın aktual problemlərini öyrənir. O, 9 monoqrafiya, 101 elmi məqalənin müəllifidir. 4 dərsliyin həmmüəllifidir. Eyni zamanda H.Y.Verdiyeva ARP İİ SSA tərəfindən nəşr edilən “В поисках истины…Лицо армянства. Архив Политических Документов Управления Делами Президента Азербайджанской Республики.Документы свидетельствуют” adlı sənədlər toplu-kitabının(2011) həmmüəllifi, «Неизвестные страницы истории: беженцы - мусульмане (1918-1920 гг.)» sənədlər toplusunun (2018) tərtibatçısıdır. 
Arxivdə apardığı araşdırmalarla bağlı H.Y.Verdiyeva 2011-ci ildə Türkiyə Respublikasının Türk Silahlı Qüvvələri Genelkurmay Askeri Tarih ve Stratejik Etüt (ATASE) Arxivinə və 2013-cü ildə Türkiyə Respublikasının Başbakanlık Devlet Arşivleri Geneln Müdürlüyünün İstanbul bölməsinin Arxivinə müdiriyyət tərəfindən ezamiyyətə göndərilmişdir. O, bu səfərlərdən “erməni məsələsi” ilə bağlı qiymətli sənədlər aşkarlayıb gətirmişdir.
Həcər Verdiyeva Azərbaycan Respublikası və MDB məkanının elmi-ictimai həyatında yaxından iştirak edir: O, 2012-2013-cü illərdə Azərbaycan Respublikası Prezidentinin Ali Attestasiya Komissiyasının Tarix və siyasi elmlər üzrə ekspert şurasının üzvü olmuşdur. 2021-ci ildən Azərbaycan Respublikası Prezidentinin Ali Attestasiya Komissiyasının Tarix və antropologiya üzrə ekspert şurasının üzvüdür. 2015-сi ildən Rusiya Federasiyasının nəşr olunan «Международный Академический Вестник» dərgisinin redaksiya heyətinin üzvüdür. O, BDU-nun Tarix fakültəsinin “Qafqaz xalqları tarixi” kafedrasının nəznində magistratura pilləsi üçün magistr işlərinin müdafiə komissiyasının üzvüdür. Həcər Verdiyeva 1999-cu ildən Rusiya almanlarının tarixini və mədəniyyətini öyrənən Beynəlxalq Assosiasiyanın, 2009-cu ildən Almaniya-Azərbaycan cəmiyyətinin üzvüdür. ”Erməni məsələsi” probleminə həsr olunmuş video verilişlərə, “Azərbaycan tarixinin alman səhifələri”nə həsr olunmuş 2 sənədli filmə: “İkinci vətən” və “Konkordiya”ya çəkilmişdir. 
</p>
        </Row>
      </Container>
    </div>
  );
};

export default About;
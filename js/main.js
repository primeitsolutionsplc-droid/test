(function(){
  'use strict';
  var root = document.documentElement;
  function $(s, c){ return (c || document).querySelector(s); }
  function $$(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var store = {
    get: function(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set: function(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }
  };

  /* =================================================================
     Sinhala text. English is the text already in index.html; each key
     matches a data-i18n attribute there. Keys marked data-i18n-html in
     the page may contain <em> for the blue highlighted words.
     ================================================================= */
  var SI = {
    'skip':'අන්තර්ගතයට පිවිසෙන්න',
    'nav.services':'සේවාවන්','nav.work':'නිදර්ශන','nav.pos':'POS ආදර්ශනය','nav.students':'සිසුන්','nav.process':'ක්‍රියාවලිය','nav.faq':'ප්‍රශ්න','nav.cta':'නොමිලේ මිල ගණනක්',
    'hero.kicker':'මෘදුකාංග ඉංජිනේරු සමාගම · ශ්‍රී ලංකාව',
    'hero.h1':'වෙබ් අඩවි සහ ව්‍යාපාරික මෘදුකාංග, <em>නිවැරදිව සාදා දෙමු.</em>',
    'hero.sub':'අපි වෙබ් අඩවි, POS පද්ධති සහ ව්‍යාපාර සඳහා අභිරුචි මෘදුකාංග නිර්මාණය කර සාදා දෙන අතර, විශ්වවිද්‍යාල සිසුන්ට ඔවුන්ගේ IT ව්‍යාපෘති සඳහා මඟ පෙන්වමු. මුල් අදහසේ සිට දියත් කිරීමෙන් පසුවත්, එකම කණ්ඩායමක්.',
    'hero.btn1':'නොමිලේ මිල ගණනක් ගන්න','hero.btn2':'සේවාවන් බලන්න',
    'hero.t1':'නොමිලේ, ලිඛිත මිල ගණනක්','hero.t2':'සිංහල හෝ ඉංග්‍රීසි','hero.t3':'දියත් කළ පසුවත් සහාය',
    'hero.chip':'වෙබ් අඩවිය සජීවීයි',
    'cap.1':'ව්‍යාපාරික වෙබ් අඩවි','cap.2':'POS පද්ධති','cap.3':'ව්‍යාපාරික පද්ධති','cap.4':'අභිරුචි වෙබ් යෙදුම්','cap.5':'විශ්වවිද්‍යාල IT ව්‍යාපෘති',

    'svc.eye':'සේවාවන්',
    'svc.h2':'ඔබේ වෙබ් අඩවිය, <em>පද්ධති සහ මෘදුකාංග</em> සඳහා එකම කණ්ඩායමක්.',
    'svc.intro':'අන්තර්ජාලයේ ඔබව සොයා ගැනීමට, කවුන්ටරයේ ඉක්මනින් බිල් කිරීමට හෝ ඔබේ තොග නිසි ලෙස පාලනය කිරීමට අවශ්‍ය වුවත්, ඔබේ ව්‍යාපාරය දැනටමත් ක්‍රියා කරන ආකාරයට ගැලපෙන ලෙස අපි එය සාදමු.',
    'ask':'මේ ගැන අසන්න',
    's1.n':'ව්‍යාපාරික වෙබ් අඩවි','s1.t':'සෑම දුරකථනයකම හොඳින් ක්‍රියා කරන, පාරිභෝගිකයින් ඔබ වෙත ගෙන එන වේගවත්, ලස්සන වෙබ් අඩවියක්.',
    's1.a':'සමාගම් සහ පෝට්ෆෝලියෝ අඩවි','s1.b':'ඔන්ලයින් වෙළඳසැල්','s1.c':'වෙන්කිරීම් සහ සම්බන්ධතා පෝරම','s1.d':'දුරකථනයට ගැලපෙන නිර්මාණය',
    's2.n':'ව්‍යාපාරික පද්ධති','s2.t':'ඔබේ ව්‍යාපාරය දැනටමත් ක්‍රියා කරන ආකාරයට ගැලපෙන ලෙස සාදන මෘදුකාංග.',
    's2.a':'තොග පාලනය','s2.b':'පාරිභෝගික සහ ඇණවුම් වාර්තා','s2.c':'වාර්තා සහ ඩෑෂ්බෝඩ්','s2.d':'විවිධ අවසර සහිත සේවක ලොගින්',
    's3.n':'POS පද්ධති','s3.t':'සාප්පු, ෆාමසි සහ ආපන ශාලා සඳහා බිල්පත් සහ තොග එකම තැනක.',
    's3.a':'වේගවත් බිල්පත් සහ රිසිට්පත්','s3.b':'සෑම විකුණුමක් සමඟම යාවත්කාලීන වන තොග','s3.c':'දෛනික සහ මාසික විකුණුම් වාර්තා','s3.d':'එකම පද්ධතියේ කැෂියර්වරුන් කිහිප දෙනෙක්',
    's3.try':'සජීවී ආදර්ශනය බලන්න',
    's4.n':'විශ්වවිද්‍යාල IT ව්‍යාපෘති','s4.t':'අවසන් වසර, පර්යේෂණ සහ කණ්ඩායම් ව්‍යාපෘති, ඔබ සමඟ එක්ව සැලසුම් කර සාදමු.',
    's4.a':'පද්ධති සැලසුම සහ දත්ත ගබඩාව','s4.b':'වෙබ් සහ මෘදුකාංග සංවර්ධනය','s4.c':'ලේඛන සහ වාර්තා','s4.d':'සෑම කොටසක්ම ඔබට පැහැදිලි කළ හැකි වන පරිදි මඟ පෙන්වීම',
    's4.more':'සිසුන් සඳහා',
    's5.n':'අභිරුචි වෙබ් සංවර්ධනය','s5.t':'වෙනත් අදහසක් තිබේද? අපි ඕනෑම කෙනෙකුට වෙබ් පිටු සහ යෙදුම් සාදා දෙමු.',
    's5.a':'ලෑන්ඩිං පිටු','s5.b':'වෙබ් යෙදුම් සහ ඩෑෂ්බෝඩ්','s5.c':'පැරණි අඩවි නැවත සැලසුම් කිරීම','s5.d':'දෝෂ නිවැරදි කිරීම් සහ වැඩිදියුණු කිරීම්',
    's6.n':'ඔබට අවශ්‍ය දේ ගැන විශ්වාස නැද්ද?','s6.t':'ගැටලුව ඔබේම වචනවලින් කියන්න. එය විසඳන සරලම විසඳුම අපි යෝජනා කරමු. කිසිවක් සෑදීමට අවශ්‍ය නැත්නම් එයත් අවංකව කියන්නෙමු.','s6.b':'අප හා කතා කරන්න',

    'why.eye':'ඇයි Prime IT',
    'why.h2':'පළමු පණිවිඩයේ සිට <em>දියත් කිරීමෙන් පසුවත්</em> පැහැදිලියි.',
    'why.intro':'තේරුම් නොගත හැකි තාක්ෂණික වචන නැත, අනපේක්ෂිත බිල්පත් නැත, වෙබ් අඩවිය සජීවී වූ පසු අතුරුදහන් වීමක් ද නැත. කුඩා හෝ විශාල සෑම ව්‍යාපෘතියකදීම අපි වැඩ කරන්නේ මෙසේය.',
    'qc.t':'ව්‍යාපෘති මිල ගණන','qc.s':'ඔබ වෙනුවෙන් සකස් කළ, නොමිලේ','qc.free':'නොමිලේ','qc.1':'විෂය පථය: අපි සාදන දේ','qc.2':'කාල සටහන','qc.3':'මුළු මිල','qc.4':'පසුව සැඟවුණු වියදම් නැත',
    'w1.h':'ආරම්භයට පෙර පැහැදිලි මිලක්','w1.d':'අපි සාදන දේ, ගතවන කාලය සහ මිල සහිත ලිඛිත සැලැස්මක්. නොමිලේ, පසුව සැඟවුණු වියදම් නැතිව.',
    'w2.h':'සාදන අතරතුරම බලන්න','w2.d':'වැඩ කරන අතරතුර ප්‍රගතිය පරීක්ෂා කර, සජීවී කිරීමට පෙර වෙනස්කම් ඉල්ලන්න.',
    'w3.h':'සිංහල හෝ ඉංග්‍රීසි, ඔබ කැමති පරිදි','w3.d':'ඔබේ අදහස ඔබේම වචනවලින් කියන්න. තාක්ෂණික දැනුමක් අවශ්‍ය නැත.',
    'w4.h':'මුල සිට අගට එකම කණ්ඩායම','w4.d':'වෙබ් අඩවි, පද්ධති සහ POS එකම කණ්ඩායමක් සාදන නිසා සියල්ල එකට හොඳින් ක්‍රියා කරයි.',
    'w5.h':'භාවිතා කරන හැටි පෙන්වා දෙමු','w5.d':'භාරදීමේදී සියල්ල පැහැදිලි කර දෙන නිසා ඔබට සහ ඔබේ කාර්ය මණ්ඩලයට විශ්වාසයෙන් භාවිතා කළ හැක.',
    'w6.h':'දියත් කළ පසුවත් අපි සිටිමු','w6.d':'යමක් කැඩුණාද, වෙනසක් අවශ්‍යද? පණිවිඩයක් එවන්න, අපි විසඳා දෙමු.',

    'show.eye':'නිදර්ශන වැඩ',
    'show.h2':'ඔබේ ව්‍යාපෘතිය <em>පෙනිය හැකි ආකාරය.</em>',
    'show.p':'අප සාදන ශෛලිය සහ ගුණාත්මකභාවය පෙන්වන නිදර්ශන නිර්මාණ. ඔබේ එක ඔබේ ව්‍යාපාරය, සන්නාමය සහ පාරිභෝගිකයින් වටා නිර්මාණය කෙරේ.',
    'tab1':'ආපන ශාලා වෙබ් අඩවිය','tab2':'සාප්පු ඩෑෂ්බෝඩ්','tab3':'සිසු ව්‍යාපෘතිය','sample':'නිදර්ශන නිර්මාණයකි',
    'cap1':'මෙනුව, මේස වෙන්කිරීම් සහ දුරකථනයට ගැලපෙන පිරිසැලසුමක් සහිත ආපන ශාලා වෙබ් අඩවියක්.',
    'cap2':'සෑම බිල්පතක් සමඟම යාවත්කාලීන වන විකුණුම්, තොග සහ කාර්ය මණ්ඩලය එකම තිරයක.',
    'cap3':'දත්ත ගබඩාව, පරිපාලක පැනලය සහ සම්පූර්ණ ලේඛන සහිත අවසන් වසර පුස්තකාල පද්ධතියක්.',

    'pos.eye':'සජීවී POS ආදර්ශනය',
    'pos.h2':'POS පද්ධතියක් <em>මෙතැනම</em> අත්හදා බලන්න.',
    'pos.p':'අප සාදන POS පද්ධති වර්ගයේ ක්‍රියාත්මක වන කුඩා ආදර්ශනයකි. අයිතම මත ඔබා බිල්පතට එක් කරන්න. ඔබේ පද්ධතිය ඔබේ සාප්පුවට, ඔබේ නිෂ්පාදන, මිල ගණන් සහ වාර්තා සමඟ සාදනු ලැබේ.',
    'pos.btn':'POS පද්ධතියක් ගැන අසන්න','pos.till':'ආදර්ශන කවුන්ටරය','pos.hint':'එක් කිරීමට අයිතමයක් ඔබන්න','pos.online':'සබැඳියි',
    'pos.bill':'වත්මන් බිල්පත','pos.empty':'බිල්පතක් ආරම්භ කිරීමට අයිතම එක් කරන්න.','pos.total':'එකතුව','pos.clear':'මකන්න','pos.pay':'විකුණුම අවසන් කරන්න',
    'pos.done':'විකුණුම අවසන්. බිල්පත #{n}, {total}.','pos.first':'විකුණුම අවසන් කිරීමට පෙර අයිතම එක් කරන්න.',

    'sc.t':'අවසන් වසර ව්‍යාපෘතිය','sc.s':'ඔබේ ව්‍යාපෘති සැලැස්ම','sc.1':'මාතෘකාව සහ අවශ්‍යතා','sc.5':'viva එකට පෙර පැහැදිලි කිරීම',
    'stu.eye':'විශ්වවිද්‍යාල සිසුන් සඳහා',
    'stu.h2':'ඔබේ <em>අවසන් වසර ව්‍යාපෘතිය</em> සකසමින් සිටින්නේද?',
    'stu.p':'ඔබේ මාතෘකාව, අවශ්‍යතා සහ අවසන් දිනය අප වෙත ගෙන එන්න. අපි ඔබ සමඟ පද්ධතිය සැලසුම් කර, සාදා, සෑම කොටසක්ම ඔබට තේරෙන ලෙසත් විශ්වාසයෙන් ඉදිරිපත් කළ හැකි ලෙසත් පැහැදිලි කරමු.',
    'stu.t1':'කළමනාකරණ පද්ධති','stu.t2':'වෙබ් යෙදුම්','stu.t3':'දත්ත ගබඩා ව්‍යාපෘති','stu.t4':'පර්යේෂණ මූලාකෘති','stu.btn':'ඔබේ ව්‍යාපෘතිය ගැන අපට පණිවිඩයක් එවන්න',

    'proc.eye':'අපි වැඩ කරන ආකාරය',
    'proc.h2':'අදහසේ සිට දියත් කිරීම දක්වා <em>පියවර හතරකින්.</em>',
    'p1.n':'ඔබට අවශ්‍ය දේ අපට කියන්න','p1.d':'අමතන්න, පණිවිඩයක් යවන්න හෝ පෝරමය භාවිතා කරන්න. ඔබේ අරමුණ, කාලසීමාව සහ ඔබ කැමති උදාහරණ අපට කියන්න.',
    'p2.n':'සැලසුමක් සහ මිලක් ලබාගන්න','p2.d':'අපි සාදන දේ, ගතවන කාලය සහ මිල සමඟ පිළිතුරු දෙමු. පසුව අනපේක්ෂිත වියදම් නැත.',
    'p3.n':'අපි සාදමු, ඔබ පරීක්ෂා කරන්න','p3.d':'අපි වැඩ කරන අතරතුර ඔබට ප්‍රගතිය දැක ගත හැකි අතර, වෙනස්කම් ඉල්ලා සිටිය හැක.',
    'p4.n':'දියත් කිරීම සහ සහාය','p4.d':'අපි එය සජීවී කර, භාවිතා කරන ආකාරය පෙන්වා, යමක් නිවැරදි කිරීමට අවශ්‍ය වුවහොත් ඔබ සමඟ සිටිමු.',

    'faq.eye':'ප්‍රශ්න',
    'faq.h2':'<em>අපෙන් නිතර</em> අසන ප්‍රශ්න.',
    'faq.p':'ඔබේ පිළිතුර හමු නොවූයේද? අපට අමතන්න හෝ WhatsApp කර කෙලින්ම අසන්න.',
    'q1.q':'මිල කීයද?','q1.a':'මිල ඔබට අවශ්‍ය දේ මත රඳා පවතී. විස්තර එවන්න, අපි නොමිලේ පැහැදිලි මිල ගණනක් දෙන්නෙමු.',
    'q2.q':'මට තාක්ෂණික දැනුමක් නැත. එහෙත් ඔබ සමඟ වැඩ කළ හැකිද?','q2.a':'ඔව්. ඔබේ අදහස සිංහලෙන් හෝ ඉංග්‍රීසියෙන් ඔබේම වචනවලින් කියන්න. අපි එය සැලැස්මක් බවට පත් කරමු.',
    'q3.q':'ව්‍යාපෘතියකට කොපමණ කාලයක් ගතවේද?','q3.a':'සරල වෙබ් අඩවියකට දින කිහිපයක් ගත විය හැක. පද්ධති සහ POS සඳහා වැඩි කාලයක් අවශ්‍ය වේ. මිල ගණන සමඟ කාල සටහනක් ලබා දෙන්නෙමු.',
    'q4.q':'මගේ විශ්වවිද්‍යාල ව්‍යාපෘතියට උදව් කළ හැකිද?','q4.a':'ඔව්. අපි සිසු ව්‍යාපෘති සාදා මඟ පෙන්වන අතර, ඔබට විශ්වාසයෙන් ඉදිරිපත් කළ හැකි වන පරිදි සෑම කොටසක්ම පැහැදිලි කරමු.',
    'q5.q':'ව්‍යාපෘතිය අවසන් වූ පසු ඔබ උදව් කරනවාද?','q5.a':'ඔව්. යමක් කැඩුණහොත් හෝ වෙනසක් අවශ්‍ය නම් අපට පණිවිඩයක් එවන්න, අපි විසඳා දෙන්නෙමු.',

    'cta.h2':'ඔබේ ව්‍යාපෘතිය ගැන අපට කියන්න.','cta.p':'අපි පැහැදිලි සැලැස්මක් සහ මිලක් සමඟ පිළිතුරු දෙමු. එය නොමිලේ, කිසිදු බැඳීමක් නැත.','cta.wa':'WhatsApp හරහා කතා කරන්න',

    'ct.eye':'අමතන්න',
    'ct.h2':'ඔබට <em>අවශ්‍ය දේ</em> ගැන කතා කරමු.',
    'ct.p':'පෝරමය පුරවා WhatsApp හෝ ඊමේල් මගින් එවන්න, නැතහොත් අපට කෙලින්ම සම්බන්ධ වන්න. හැකි ඉක්මනින් පිළිතුරු දෙන්නෙමු.',
    'ct.call':'අමතන්න','ct.email':'ඊමේල්',
    'f.title':'ඔබේ ව්‍යාපෘති විස්තර එවන්න','f.name':'ඔබේ නම','f.phone':'දුරකථන අංකය','f.need':'මට අවශ්‍ය වන්නේ','f.details':'ව්‍යාපෘති විස්තර',
    'f.ph':'ඔබේ අදහස, කාලසීමාව සහ ඔබ කැමති උදාහරණ අපට කියන්න.',
    'o1':'ව්‍යාපාරික වෙබ් අඩවියක්','o2':'ව්‍යාපාරික පද්ධතියක්','o3':'POS පද්ධතියක්','o4':'විශ්වවිද්‍යාල IT ව්‍යාපෘතියක්','o5':'වෙනත් දෙයක්',
    'f.wa':'WhatsApp හරහා යවන්න','f.mail':'ඊමේල් මගින් යවන්න','f.priv':'ඔබේ විස්තර භාවිතා කරන්නේ ඔබට පිළිතුරු දීමට පමණි.',
    'form.err':'කරුණාකර ඔබේ නම සහ විස්තර කිහිපයක් එක් කරන්න.','form.wa':'ඔබේ පණිවිඩය සමඟ WhatsApp විවෘත වෙමින් පවතී.','form.mail':'ඔබේ පණිවිඩය සමඟ ඊමේල් යෙදුම විවෘත වෙමින් පවතී.',

    'ft.p':'මෘදුකාංග ඉංජිනේරු සමාගමක්. වෙබ් අඩවි, POS සහ ව්‍යාපාරික පද්ධති, සහ විශ්වවිද්‍යාල සිසුන් සඳහා IT ව්‍යාපෘති.',
    'ft.co':'සමාගම','ft.c':'© 2026 Prime IT Solutions. සියලුම හිමිකම් ඇවිරිණි.','ft.top':'නැවත ඉහළට ↑'
  };
  var EN = {
    'pos.done':'Sale complete. Bill #{n}, {total}.',
    'pos.first':'Add items before completing a sale.',
    'form.err':'Please add your name and a few details first.',
    'form.wa':'Opening WhatsApp with your message.',
    'form.mail':'Opening your email app with your message.'
  };

  /* ---- Language switch ---- */
  var lang = 'en';
  var textNodes = $$('[data-i18n]'), phNodes = $$('[data-i18n-ph]');
  textNodes.forEach(function(n){
    var k = n.getAttribute('data-i18n');
    if(!(k in EN)) EN[k] = n.hasAttribute('data-i18n-html') ? n.innerHTML.trim() : n.textContent;
  });
  phNodes.forEach(function(n){ EN[n.getAttribute('data-i18n-ph')] = n.getAttribute('placeholder'); });
  function t(k){ return (lang === 'si' && SI[k]) ? SI[k] : (EN[k] || k); }
  var langLabel = $('#langLabel');
  function setLang(l){
    lang = l;
    root.lang = (l === 'si') ? 'si' : 'en';
    textNodes.forEach(function(n){
      var v = t(n.getAttribute('data-i18n'));
      if(n.hasAttribute('data-i18n-html')) n.innerHTML = v; else n.textContent = v;
    });
    phNodes.forEach(function(n){ n.setAttribute('placeholder', t(n.getAttribute('data-i18n-ph'))); });
    langLabel.textContent = (l === 'si') ? 'English' : 'සිංහල';
    store.set('pis-lang', l);
  }
  $('#langBtn').addEventListener('click', function(){ setLang(lang === 'si' ? 'en' : 'si'); });

  /* ---- Header: solid after scrolling, mobile menu ---- */
  var hdr = $('#hdr'), menuBtn = $('#menuBtn');
  function headerState(){ hdr.classList.toggle('solid', (window.scrollY || 0) > 24); }
  window.addEventListener('scroll', headerState, {passive: true}); headerState();
  var backdrop = $('#menuBackdrop');
  function setMenu(open){
    hdr.classList.toggle('open', open);
    backdrop.classList.toggle('show', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeMenu(){ setMenu(false); }
  menuBtn.addEventListener('click', function(e){ e.stopPropagation(); setMenu(!hdr.classList.contains('open')); });
  $$('#nav a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  /* tap or click anywhere outside the menu closes it */
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('click', function(e){
    if(hdr.classList.contains('open') && !e.target.closest('#nav') && !e.target.closest('#menuBtn')) closeMenu();
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function(){ if(window.innerWidth > 1100) closeMenu(); });

  /* ---- Active nav link ---- */
  var navLinks = $$('#nav a');
  if('IntersectionObserver' in window){
    var navIO = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, {rootMargin: '-45% 0px -50% 0px'});
    navLinks.forEach(function(a){ var s = $(a.getAttribute('href')); if(s) navIO.observe(s); });
  }

  /* ---- FAQ: one open at a time ---- */
  $$('.acc').forEach(function(acc){
    var all = $$('details', acc);
    all.forEach(function(d){ d.addEventListener('toggle', function(){ if(d.open) all.forEach(function(o){ if(o !== d) o.open = false; }); }); });
  });

  /* ---- "Ask about this" links pre-select the service ---- */
  $$('[data-need]').forEach(function(a){ a.addEventListener('click', function(){ $('#need').value = a.getAttribute('data-need'); }); });

  /* ---- POS demo ---- */
  var ITEMS = [
    {id:'tea', n:'Milk tea', p:120}, {id:'roll', n:'Egg roll', p:150},
    {id:'rice', n:'Rice & curry', p:450}, {id:'kottu', n:'Chicken kottu', p:1100},
    {id:'bun', n:'Fish bun', p:110}, {id:'water', n:'Water 500ml', p:100}
  ];
  function fmt(n){ return 'Rs. ' + n.toLocaleString('en-US'); }
  var bill = {}, sale = 1025;
  var itemsEl = $('#items'), linesEl = $('#lines'), totalEl = $('#total'), emptyEl = $('#empty'), posMsg = $('#posMsg');
  itemsEl.innerHTML = ITEMS.map(function(i){
    return '<button type="button" class="item" data-id="' + i.id + '"><strong>' + i.n + '</strong><span>' + fmt(i.p) + '</span></button>';
  }).join('');
  function renderBill(bump){
    var active = document.activeElement;
    var keep = (active && active.getAttribute && active.getAttribute('data-act')) ? [active.getAttribute('data-act'), active.getAttribute('data-id')] : null;
    var rows = ITEMS.filter(function(i){ return bill[i.id]; });
    linesEl.innerHTML = rows.map(function(i){
      return '<li><span>' + i.n + '</span><span class="qty">' +
        '<button type="button" data-act="dec" data-id="' + i.id + '" aria-label="Remove one ' + i.n + '">−</button>' +
        '<b>' + bill[i.id] + '</b>' +
        '<button type="button" data-act="inc" data-id="' + i.id + '" aria-label="Add one ' + i.n + '">+</button></span>' +
        '<span class="lt">' + fmt(i.p * bill[i.id]) + '</span></li>';
    }).join('');
    var total = rows.reduce(function(s, i){ return s + i.p * bill[i.id]; }, 0);
    totalEl.textContent = fmt(total);
    emptyEl.hidden = rows.length > 0;
    if(bump){ totalEl.classList.remove('bump'); void totalEl.offsetWidth; totalEl.classList.add('bump'); }
    if(keep){ var b = $('button[data-act="' + keep[0] + '"][data-id="' + keep[1] + '"]', linesEl); if(b) b.focus(); }
    return total;
  }
  itemsEl.addEventListener('click', function(e){
    var b = e.target.closest('.item'); if(!b) return;
    var id = b.getAttribute('data-id');
    bill[id] = (bill[id] || 0) + 1; posMsg.textContent = ''; renderBill(true);
  });
  linesEl.addEventListener('click', function(e){
    var b = e.target.closest('button[data-act]'); if(!b) return;
    var id = b.getAttribute('data-id');
    bill[id] = (bill[id] || 0) + (b.getAttribute('data-act') === 'inc' ? 1 : -1);
    if(bill[id] <= 0) delete bill[id];
    renderBill(true);
  });
  $('#clear').addEventListener('click', function(){ bill = {}; posMsg.textContent = ''; renderBill(false); });
  $('#pay').addEventListener('click', function(){
    var total = renderBill(false);
    if(!total){ posMsg.textContent = t('pos.first'); return; }
    posMsg.textContent = t('pos.done').replace('{n}', sale).replace('{total}', fmt(total));
    sale++; bill = {}; renderBill(false);
  });
  renderBill(false);

  /* ---- Contact form -> WhatsApp / email ---- */
  var fmsg = $('#fmsg');
  function send(kind){
    var name = $('#f-name').value.trim(), phone = $('#f-phone').value.trim();
    var need = $('#need').value, details = $('#f-details').value.trim();
    if(!name || !details){
      fmsg.textContent = t('form.err'); fmsg.classList.add('err');
      (name ? $('#f-details') : $('#f-name')).focus();
      return;
    }
    fmsg.classList.remove('err');
    var text = 'Hello Prime IT Solutions,\nMy name is ' + name + '.\nI need: ' + need + '.\n' + details + (phone ? '\nMy number: ' + phone : '');
    var url = (kind === 'wa')
      ? 'https://wa.me/94765316063?text=' + encodeURIComponent(text)
      : 'mailto:primeitsolutionsplc@gmail.com?subject=' + encodeURIComponent('New enquiry: ' + need) + '&body=' + encodeURIComponent(text);
    var a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    fmsg.textContent = t(kind === 'wa' ? 'form.wa' : 'form.mail');
  }
  $('#sendWa').addEventListener('click', function(){ send('wa'); });
  $('#sendMail').addEventListener('click', function(){ send('mail'); });

  /* ---- Sample-work tabs ---- */
  var tabs = $$('.tab'), panels = $$('.panel');
  function countUp(panel){
    $$('[data-count]', panel).forEach(function(b){
      var end = +b.getAttribute('data-count'), pre = b.getAttribute('data-pre') || '', t0 = null;
      if(reduce.matches){ b.textContent = pre + end.toLocaleString('en-US'); return; }
      function step(ts){
        if(!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 1000), e = 1 - Math.pow(1 - k, 3);
        b.textContent = pre + Math.round(end * e).toLocaleString('en-US');
        if(k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  function selectTab(tab, focus){
    tabs.forEach(function(tb){ var on = tb === tab; tb.setAttribute('aria-selected', on ? 'true' : 'false'); tb.tabIndex = on ? 0 : -1; });
    panels.forEach(function(p){ p.hidden = p.id !== tab.getAttribute('aria-controls'); });
    countUp($('#' + tab.getAttribute('aria-controls')));
    if(focus) tab.focus();
  }
  tabs.forEach(function(tb, i){
    tb.addEventListener('click', function(){ selectTab(tb); });
    tb.addEventListener('keydown', function(e){
      var n = null;
      if(e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      else if(e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if(e.key === 'Home') n = tabs[0];
      else if(e.key === 'End') n = tabs[tabs.length - 1];
      if(n){ e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ---- Reveal on scroll (staggered within a group) ---- */
  var revealEls = $$('.reveal');
  revealEls.forEach(function(el){
    var sibs = $$(':scope > .reveal', el.parentNode);
    el.style.setProperty('--d', Math.max(0, sibs.indexOf(el)));
  });
  if('IntersectionObserver' in window && !reduce.matches){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold: 0.15, rootMargin: '0px 0px -5% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add('in'); }); }

  /* ---- Process line fills as you scroll ---- */
  var stepsEl = $('#steps'), stepLis = $$('#steps li');
  function stepsProgress(){
    var vh = window.innerHeight, mark = vh * 0.7;
    var r = stepsEl.getBoundingClientRect();
    var on = 0;
    stepLis.forEach(function(li, i){ var hit = r.top < mark - i * 60; li.classList.toggle('on', hit); if(hit) on = i; });
    stepsEl.style.setProperty('--p', r.top < mark ? (on / (stepLis.length - 1)).toFixed(3) : 0);
  }
  window.addEventListener('scroll', stepsProgress, {passive: true}); window.addEventListener('resize', stepsProgress); stepsProgress();

  /* ---- Hero composition follows the mouse a little ---- */
  var art = $('#heroArt');
  if(art && !reduce.matches && window.matchMedia('(pointer:fine)').matches){
    $('.hero').addEventListener('pointermove', function(e){
      var x = e.clientX / window.innerWidth - .5, y = e.clientY / window.innerHeight - .5;
      art.style.transform = 'perspective(1400px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 4) + 'deg)';
    });
    $('.hero').addEventListener('pointerleave', function(){ art.style.transform = ''; });
  }

  /* ---- Hide the floating WhatsApp button over the contact section ---- */
  var waF = $('.wa-float'), contact = $('#contact');
  if(waF && contact && 'IntersectionObserver' in window){
    new IntersectionObserver(function(en){ waF.classList.toggle('hide', en[0].isIntersecting); }, {threshold: 0.3}).observe(contact);
  }

  /* ---- Restore saved language ---- */
  if(store.get('pis-lang') === 'si') setLang('si');
})();

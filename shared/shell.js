/* BuySmart shell — top header, notifications panel, sidebar, mobile drawer, nav toast.
   Call BuySmartShell.init({ page, title }) once per page after the shell's script
   tags have loaded. Page keys: home, runlist, purchase, alert settings,
   purchase location, sheet queue, data queue, bid queue, add new bucket, settings. */
(function(){
  var NAV_ROUTES = {
    'Dashboard': 'index.html',
    'Runlist': 'runlist.html',
    'Purchase': 'purchase.html',
    'Alert Settings': 'alertsettings.html',
    'Purchase Location': 'purchaselocation.html',
    'Settings': 'settings.html'
    // Sheet Queue / Data Queue / Bid Queue / Add New Bucket — no page yet; toast fallback.
  };

  var SHELL_HTML = [
    '<div class="top-header">',
    '  <div class="th-left" style="display:flex;align-items:center;gap:10px;">',
    '    <button class="hamburger-btn" id="hamburger-btn" onclick="toggleMobileDrawer()" aria-label="Open menu">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    '    </button>',
    '    <div class="logo" onclick="toggleProductSwitcher(event)">',
    '      <div class="logo-mark" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg class="logo-mark-svg" viewBox="0 0 324 221" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="BuySmart logo" style="width:100%;height:100%;"><path d="M72.30,32.52 L72.30,32.52 Q85.97,12.00 110.63,12.00 L246.25,12.00 Q270.90,12.00 257.23,32.52 L210.61,102.44 Q196.93,122.96 172.27,122.96 L36.66,122.96 Q12.00,122.96 25.68,102.44 Z" fill="#1E6BFF"/><path d="M113.39,118.82 L113.39,118.82 Q127.07,98.30 151.73,98.30 L287.34,98.30 Q312.00,98.30 298.32,118.82 L251.70,188.74 Q238.03,209.26 213.37,209.26 L77.75,209.26 Q53.10,209.26 66.77,188.74 Z" fill="#3D3DCC"/></svg></div>',
    '      <span class="logo-text">BuySmart</span>',
    '      <svg class="logo-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    '    </div>',
    '  </div>',
    '  <div class="top-header-right">',
    '    <button class="header-bell" id="header-bell" data-label="Notifications" onclick="toggleNotifications(event)" aria-label="Notifications">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    '      <span class="header-bell-dot" id="header-bell-dot"></span>',
    '    </button>',
    '  </div>',
    '</div>',

    '<div class="notif-panel" id="notif-panel">',
    '  <div class="notif-header">',
    '    <span class="notif-title">Notifications</span>',
    '    <div class="notif-header-actions">',
    '      <button class="notif-markall" id="notif-markall" onclick="markAllNotificationsRead()">Mark all as read</button>',
    '      <button class="notif-close" onclick="closeNotifications()" aria-label="Close">',
    '        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    '      </button>',
    '    </div>',
    '  </div>',
    '  <div class="notif-tabs">',
    '    <button class="notif-tab active" data-tab="all" onclick="setNotifTab(\'all\')">All <span class="notif-tab-count" id="notif-count-all">0</span></button>',
    '    <button class="notif-tab" data-tab="unread" onclick="setNotifTab(\'unread\')">Unread <span class="notif-tab-count" id="notif-count-unread">0</span></button>',
    '  </div>',
    '  <div class="notif-body" id="notif-body"></div>',
    '  <div class="notif-footer"></div>',
    '</div>',

    '<div class="sidebar">',
    '  <div class="sidebar-nav">',
    '    <div class="sb-item" data-nav="home" data-label="Dashboard" onclick="navClick(\'Dashboard\')">',
    '      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 13.5H15"/><path d="M9.5 13.5V9.5H6.5V13.5"/><path d="M2.5 7.29309V13.5"/><path d="M13.5 13.5V7.29309"/><path d="M1.5 8.29315L7.64625 2.14628C7.69269 2.09979 7.74783 2.06291 7.80853 2.03775C7.86923 2.01259 7.93429 1.99963 8 1.99963C8.06571 1.99963 8.13077 2.01259 8.19147 2.03775C8.25217 2.06291 8.30731 2.09979 8.35375 2.14628L14.5 8.29315"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="runlist" data-label="Runlist" onclick="navClick(\'Runlist\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="purchase" data-label="Purchase" onclick="navClick(\'Purchase\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="alert settings" data-label="Alert Settings" onclick="navClick(\'Alert Settings\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="purchase location" data-label="Purchase Location" onclick="navClick(\'Purchase Location\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="sheet queue" data-label="Sheet Queue" onclick="navClick(\'Sheet Queue\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="data queue" data-label="Data Queue" onclick="navClick(\'Data Queue\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="bid queue" data-label="Bid Queue" onclick="navClick(\'Bid Queue\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    '    </div>',
    '    <div class="sb-item" data-nav="add new bucket" data-label="Add New Bucket" onclick="navClick(\'Add New Bucket\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    '    </div>',
    '    <div class="sidebar-nav-spacer"></div>',
    '    <div class="sb-divider"></div>',
    '    <div class="sb-item" data-nav="settings" data-label="Settings" onclick="navClick(\'Settings\')">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    '    </div>',
    '  </div>',
    '  <div class="sb-account" title="Account">BS</div>',
    '</div>',

    '<div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop" onclick="closeMobileDrawer()"></div>',
    '<div class="mobile-drawer" id="mobile-drawer">',
    '  <div class="md-nav">',
    '    <div class="md-item" data-nav="home" onclick="navClick(\'Dashboard\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 13.5H15"/><path d="M9.5 13.5V9.5H6.5V13.5"/><path d="M2.5 7.29309V13.5"/><path d="M13.5 13.5V7.29309"/><path d="M1.5 8.29315L7.64625 2.14628C7.69269 2.09979 7.74783 2.06291 7.80853 2.03775C7.86923 2.01259 7.93429 1.99963 8 1.99963C8.06571 1.99963 8.13077 2.01259 8.19147 2.03775C8.25217 2.06291 8.30731 2.09979 8.35375 2.14628L14.5 8.29315"/></svg>',
    '      <span>Dashboard</span>',
    '    </div>',
    '    <div class="md-item" data-nav="runlist" onclick="navClick(\'Runlist\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    '      <span>Runlist</span>',
    '    </div>',
    '    <div class="md-item" data-nav="purchase" onclick="navClick(\'Purchase\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    '      <span>Purchase</span>',
    '    </div>',
    '    <div class="md-item" data-nav="alert settings" onclick="navClick(\'Alert Settings\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    '      <span>Alert Settings</span>',
    '    </div>',
    '    <div class="md-item" data-nav="purchase location" onclick="navClick(\'Purchase Location\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    '      <span>Purchase Location</span>',
    '    </div>',
    '    <div class="md-item" data-nav="sheet queue" onclick="navClick(\'Sheet Queue\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    '      <span>Sheet Queue</span>',
    '    </div>',
    '    <div class="md-item" data-nav="data queue" onclick="navClick(\'Data Queue\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
    '      <span>Data Queue</span>',
    '    </div>',
    '    <div class="md-item" data-nav="bid queue" onclick="navClick(\'Bid Queue\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    '      <span>Bid Queue</span>',
    '    </div>',
    '    <div class="md-item" data-nav="add new bucket" onclick="navClick(\'Add New Bucket\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    '      <span>Add New Bucket</span>',
    '    </div>',
    '    <div class="md-divider"></div>',
    '    <div class="md-item" data-nav="settings" onclick="navClick(\'Settings\');closeMobileDrawer();">',
    '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>',
    '      <span>Settings</span>',
    '    </div>',
    '  </div>',
    '</div>',

    '<div class="product-switcher" id="product-switcher">',
    '  <a class="ps-item ps-active" data-pid="buysmart" href="index.html">',
    '    <svg class="ps-ic" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    '    <span>BuySmart</span>',
    '  </a>',
    '  <a class="ps-item" data-pid="reputation" href="#" onclick="event.preventDefault();closeProductSwitcher();showNavToast(\'Reputation is coming soon\',\'This product is not yet available.\');">',
    '    <svg class="ps-ic" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    '    <span>Reputation</span>',
    '  </a>',
    '</div>',

    '<div class="nav-toast" id="nav-toast">',
    '  <div class="nav-toast-icon">',
    '    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    '  </div>',
    '  <div class="nav-toast-text">',
    '    <strong id="nav-toast-title">Coming soon</strong>',
    '    <span id="nav-toast-body">This section is under construction.</span>',
    '  </div>',
    '  <button class="nav-toast-close" onclick="hideNavToast()" title="Dismiss">&#x2715;</button>',
    '</div>'
  ].join('\n');

  // ─── Handlers (exposed as globals so inline onclick attrs resolve) ──────────
  var navToastTimer = null;

  window.navClick = function(label){
    document.querySelectorAll('.sb-item, .md-item').forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-nav') === label.toLowerCase() || (el.querySelector('span') && el.querySelector('span').textContent === label));
    });
    if(NAV_ROUTES[label]){
      window.location.href = NAV_ROUTES[label];
      return;
    }
    window.showNavToast(label + ' is coming soon', 'This section is under construction.');
  };

  window.toggleMobileDrawer = function(){
    var d = document.getElementById('mobile-drawer'), b = document.getElementById('mobile-drawer-backdrop');
    if(!d || !b) return;
    if(d.classList.contains('open')) window.closeMobileDrawer();
    else { d.classList.add('open'); b.classList.add('open'); }
  };
  window.closeMobileDrawer = function(){
    var d = document.getElementById('mobile-drawer'), b = document.getElementById('mobile-drawer-backdrop');
    if(d) d.classList.remove('open'); if(b) b.classList.remove('open');
  };

  window.showNavToast = function(title, body){
    var t = document.getElementById('nav-toast'); if(!t) return;
    if(title) document.getElementById('nav-toast-title').textContent = title;
    if(body)  document.getElementById('nav-toast-body').textContent  = body;
    t.classList.add('show');
    if(navToastTimer) clearTimeout(navToastTimer);
    navToastTimer = setTimeout(window.hideNavToast, 4000);
  };
  window.hideNavToast = function(){
    var t = document.getElementById('nav-toast'); if(t) t.classList.remove('show');
    if(navToastTimer){ clearTimeout(navToastTimer); navToastTimer = null; }
  };

  window.toggleNotifications = function(e){ if(e) e.stopPropagation(); var p = document.getElementById('notif-panel'); if(!p) return; if(p.classList.contains('open')) window.closeNotifications(); else window.openNotifications(); };
  window.openNotifications = function(){ var p = document.getElementById('notif-panel'), b = document.getElementById('header-bell'); if(!p||!b) return; if(p.parentElement !== document.body) document.body.appendChild(p); window.positionNotifications(); p.classList.add('open'); b.classList.add('active'); };
  window.closeNotifications = function(){ var p = document.getElementById('notif-panel'), b = document.getElementById('header-bell'); if(p) p.classList.remove('open'); if(b) b.classList.remove('active'); };
  window.positionNotifications = function(){ var p = document.getElementById('notif-panel'), b = document.getElementById('header-bell'); if(!p||!b) return; var r = b.getBoundingClientRect(); var w = p.offsetWidth || 420; p.style.top = (r.bottom + 8) + 'px'; p.style.left = Math.max(8, r.right - w) + 'px'; };
  window.setNotifTab = function(t){ document.querySelectorAll('.notif-tab').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-tab') === t); }); };
  window.markAllNotificationsRead = function(){};

  // ── Product switcher (BuySmart / Reputation) ─────────────────────────
  window.toggleProductSwitcher = function(e){
    if(e) e.stopPropagation();
    var logo = document.querySelector('.logo');
    var ps = document.getElementById('product-switcher');
    if(!logo || !ps) return;
    if(ps.parentElement !== document.body) document.body.appendChild(ps);
    var willOpen = !ps.classList.contains('ps-open');
    if(willOpen) window.positionProductSwitcher();
    ps.classList.toggle('ps-open', willOpen);
    logo.classList.toggle('ps-open', willOpen);
  };
  window.positionProductSwitcher = function(){
    var logo = document.querySelector('.logo');
    var ps = document.getElementById('product-switcher');
    if(!logo || !ps) return;
    var r = logo.getBoundingClientRect();
    ps.style.left = r.left + 'px';
    ps.style.top = (r.bottom + 8) + 'px';
  };
  window.closeProductSwitcher = function(){
    var logo = document.querySelector('.logo');
    var ps = document.getElementById('product-switcher');
    if(logo) logo.classList.remove('ps-open');
    if(ps) ps.classList.remove('ps-open');
  };
  document.addEventListener('mousedown', function(e){
    var ps = document.getElementById('product-switcher');
    if(!ps || !ps.classList.contains('ps-open')) return;
    if(e.target.closest && (e.target.closest('.logo') || e.target.closest('#product-switcher'))) return;
    window.closeProductSwitcher();
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') window.closeProductSwitcher(); });
  window.addEventListener('scroll', function(){ var ps = document.getElementById('product-switcher'); if(ps && ps.classList.contains('ps-open')) window.positionProductSwitcher(); }, true);

  document.addEventListener('click', function(e){ var p = document.getElementById('notif-panel'), b = document.getElementById('header-bell'); if(p && p.classList.contains('open') && !(b && b.contains(e.target)) && !p.contains(e.target)) window.closeNotifications(); });
  window.addEventListener('resize', function(){ var p = document.getElementById('notif-panel'); if(p && p.classList.contains('open')) window.positionNotifications(); var ps = document.getElementById('product-switcher'); if(ps && ps.classList.contains('ps-open')) window.positionProductSwitcher(); });

  // ─── Public init ───────────────────────────────────────────────────────────
  window.BuySmartShell = {
    init: function(opts){
      opts = opts || {};
      var page = (opts.page || 'home').toLowerCase();
      var title = opts.title || '';

      // Inject shell before the .root.main-area (or append to body if not found).
      var host = document.createElement('div');
      host.innerHTML = SHELL_HTML;
      var root = document.querySelector('.root.main-area');
      var frag = document.createDocumentFragment();
      while(host.firstChild) frag.appendChild(host.firstChild);
      if(root && root.parentNode){
        root.parentNode.insertBefore(frag, root);
      } else {
        document.body.appendChild(frag);
      }

      // Mark active nav item.
      document.querySelectorAll('.sb-item, .md-item').forEach(function(el){
        el.classList.toggle('active', el.getAttribute('data-nav') === page);
      });

      // Set page title.
      var titleEl = document.querySelector('.set-page-title');
      if(titleEl && title) titleEl.textContent = title;

      // Populate notifications now that markup is in the DOM.
      if(typeof window.renderNotifications === 'function') window.renderNotifications();
    }
  };
})();

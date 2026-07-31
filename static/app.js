/* ============================================================
   AMLI Wayback — Frontend Application
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------------
  // State
  // ----------------------------------------------------------------
  let allSites = [];          // [{url, site}, …]
  let currentSite = null;     // {url, site}
  let currentDates = [];      // ['2025-07-04', …]
  let currentModes = {};      // {date: 'html' | 'screenshot', …}
  let selectedDate = null;
  let acIndex = -1;           // keyboard nav index in autocomplete
  let acOpen = false;

  // ----------------------------------------------------------------
  // DOM refs
  // ----------------------------------------------------------------
  const urlInput        = document.getElementById('url-input');
  const acList          = document.getElementById('autocomplete-list');
  const btnAdd          = document.getElementById('btn-add');
  const toast           = document.getElementById('toast');
  const calSection      = document.getElementById('calendar-section');
  const siteNameEl      = document.getElementById('site-name');
  const siteDotEl       = document.getElementById('site-dot');
  const viewerPlaceholder = document.getElementById('viewer-placeholder');
  const viewerTopbar    = document.getElementById('viewer-topbar');
  const snapshotIframe  = document.getElementById('snapshot-iframe');
  const spinnerOverlay  = document.getElementById('spinner-overlay');
  const bcSite          = document.getElementById('bc-site');
  const bcDate          = document.getElementById('bc-date');
  const themeToggle     = document.getElementById('theme-toggle');
  const sidebarToggle   = document.getElementById('sidebar-toggle');
  const screenshotWarning = document.getElementById('screenshot-warning');
  const screenshotContainer = document.getElementById('screenshot-container');
  const snapshotImg     = document.getElementById('snapshot-img');
  const badgeType       = document.getElementById('badge-type');

  // ----------------------------------------------------------------
  // Bootstrap
  // ----------------------------------------------------------------
  fetchSites();
  initThemeToggle();
  initSidebarToggle();

  // ----------------------------------------------------------------
  // API helpers
  // ----------------------------------------------------------------
  async function fetchSites() {
    try {
      const res = await fetch('/api/sites');
      allSites = await res.json();
    } catch (e) {
      console.error('Failed to load sites', e);
    }
  }

  async function fetchSnapshotData(site) {
    const res = await fetch(`/api/snapshots/${encodeURIComponent(site)}`);
    const data = await res.json();
    return { dates: data.dates || [], modes: data.modes || {} };
  }

  async function postSite(url) {
    const res = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unknown error');
    return data;
  }

  // ----------------------------------------------------------------
  // Autocomplete
  // ----------------------------------------------------------------
  function getFilteredSites(q) {
    if (!q) return allSites.slice(0, 20);
    q = q.toLowerCase();
    return allSites.filter(s => s.url.toLowerCase().includes(q) || s.site.toLowerCase().includes(q)).slice(0, 20);
  }

  function renderAC(items) {
    acList.innerHTML = '';
    if (!items.length) { closeAC(); return; }
    items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'ac-item';
      div.dataset.index = i;
      div.innerHTML = `<span class="ac-url">${escapeHtml(item.url)}</span><span class="ac-site">${escapeHtml(item.site)}</span>`;
      div.addEventListener('mousedown', (e) => {
        e.preventDefault(); // prevent blur
        selectSite(item);
      });
      acList.appendChild(div);
    });
    acList.classList.add('open');
    acOpen = true;
    acIndex = -1;
  }

  function closeAC() {
    acList.classList.remove('open');
    acList.innerHTML = '';
    acOpen = false;
    acIndex = -1;
  }

  function highlightAC(idx) {
    const items = acList.querySelectorAll('.ac-item');
    items.forEach((el, i) => el.classList.toggle('active', i === idx));
    if (idx >= 0 && items[idx]) {
      urlInput.value = items[idx].querySelector('.ac-url').textContent;
    }
  }

  urlInput.addEventListener('input', () => {
    const q = urlInput.value.trim();
    const filtered = getFilteredSites(q);
    renderAC(filtered);
  });

  urlInput.addEventListener('focus', () => {
    const q = urlInput.value.trim();
    renderAC(getFilteredSites(q));
  });

  urlInput.addEventListener('blur', () => {
    // small delay so mousedown on ac-item fires first
    setTimeout(closeAC, 150);
  });

  urlInput.addEventListener('keydown', (e) => {
    if (!acOpen) return;
    const items = acList.querySelectorAll('.ac-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      acIndex = Math.min(acIndex + 1, items.length - 1);
      highlightAC(acIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      acIndex = Math.max(acIndex - 1, -1);
      highlightAC(acIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (acIndex >= 0 && items[acIndex]) {
        const url = items[acIndex].querySelector('.ac-url').textContent;
        const site = allSites.find(s => s.url === url);
        if (site) selectSite(site);
      } else {
        // Try to load whatever is typed
        tryLoadUrl(urlInput.value.trim());
      }
      closeAC();
    } else if (e.key === 'Escape') {
      closeAC();
    }
  });

  // ----------------------------------------------------------------
  // Select site → load calendar
  // ----------------------------------------------------------------
  async function selectSite(siteObj) {
    setSidebarCollapsed(false);

    currentSite = siteObj;
    urlInput.value = siteObj.url;
    closeAC();

    siteNameEl.textContent = siteObj.site;
    siteDotEl.style.display = 'block';

    showCalendarLoading();
    const data = await fetchSnapshotData(siteObj.site);
    currentDates = data.dates;
    currentModes = data.modes;
    renderCalendar(currentDates);
  }

  function tryLoadUrl(url) {
    if (!url) return;
    // Check if we have it
    const existing = allSites.find(s => s.url === url || s.url.replace(/\/$/, '') === url.replace(/\/$/, ''));
    if (existing) {
      selectSite(existing);
    } else {
      showToast('URL not tracked yet — add it with the + button', 'info');
    }
  }

  // ----------------------------------------------------------------
  // Add site button
  // ----------------------------------------------------------------
  btnAdd.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) { showToast('Please enter a URL first', 'error'); return; }
    if (!/^https?:\/\//i.test(url)) {
      showToast('URL must start with http:// or https://', 'error');
      return;
    }

    btnAdd.classList.add('loading');
    btnAdd.textContent = 'Adding…';

    try {
      const data = await postSite(url);
      showToast(`✓ Added: ${data.url}`, 'success');
      // Merge into allSites if not already present
      if (!allSites.find(s => s.url === data.url)) {
        allSites.push({ url: data.url, site: data.site });
        allSites.sort((a, b) => a.url.localeCompare(b.url));
      }
      // Auto-select so user sees the (likely empty) calendar
      await selectSite({ url: data.url, site: data.site });
    } catch (e) {
      showToast(`Error: ${e.message}`, 'error');
    } finally {
      btnAdd.classList.remove('loading');
      btnAdd.innerHTML = '<span>＋</span> Add URL';
    }
  });

  // ----------------------------------------------------------------
  // Calendar rendering
  // ----------------------------------------------------------------
  function showCalendarLoading() {
    calSection.innerHTML = '<div class="calendar-empty"><div class="calendar-empty-icon">⏳</div><div class="calendar-empty-text">Loading snapshots…</div></div>';
  }

  function renderCalendar(dates) {
    if (!dates.length) {
      calSection.innerHTML = `
        <div class="calendar-empty">
          <div class="calendar-empty-icon">📭</div>
          <div class="calendar-empty-text">No snapshots yet.<br>Run <code>full_capture.py</code> to capture this site.</div>
        </div>`;
      return;
    }

    const dateSet = new Set(dates);

    // Group dates by YYYY-MM
    const byMonth = {};
    dates.forEach(d => {
      const ym = d.slice(0, 7); // "2025-07"
      (byMonth[ym] = byMonth[ym] || []).push(d);
    });

    // Build sidebar header count
    const countBadge = document.querySelector('.snap-count-badge');
    if (countBadge) countBadge.textContent = `${dates.length} snapshot${dates.length !== 1 ? 's' : ''}`;

    const months = Object.keys(byMonth).sort().reverse(); // newest first
    let html = '';

    months.forEach(ym => {
      const [year, month] = ym.split('-').map(Number);
      const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
      const daysInMonth = new Date(year, month, 0).getDate();
      const firstDow = new Date(year, month - 1, 1).getDay(); // 0=Sun

      html += `<div class="month-block">
        <div class="month-label">${monthName}</div>
        <div class="cal-grid">
          <div class="cal-day-header">Su</div>
          <div class="cal-day-header">Mo</div>
          <div class="cal-day-header">Tu</div>
          <div class="cal-day-header">We</div>
          <div class="cal-day-header">Th</div>
          <div class="cal-day-header">Fr</div>
          <div class="cal-day-header">Sa</div>`;

      // Empty cells before first day
      for (let i = 0; i < firstDow; i++) {
        html += `<div class="cal-day empty"></div>`;
      }

      // Day cells
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${ym}-${String(day).padStart(2, '0')}`;
        const hasSnap = dateSet.has(dateStr);
        const isSelected = dateStr === selectedDate;
        const cls = ['cal-day', hasSnap ? 'has-snapshot' : '', isSelected ? 'selected' : ''].filter(Boolean).join(' ');
        const dataAttr = hasSnap ? `data-date="${dateStr}" data-site="${escapeHtml(currentSite.site)}"` : '';
        html += `<div class="${cls}" ${dataAttr} title="${hasSnap ? 'Snapshot: ' + dateStr : ''}">${day}</div>`;
      }

      html += `</div></div>`;
    });

    calSection.innerHTML = html;

    // Attach click listeners
    calSection.querySelectorAll('.cal-day.has-snapshot').forEach(el => {
      el.addEventListener('click', () => {
        const date = el.dataset.date;
        const site = el.dataset.site;
        openSnapshot(site, date);
      });
    });
  }

  // ----------------------------------------------------------------
  // Snapshot viewer
  // ----------------------------------------------------------------
  function openSnapshot(site, date) {
    selectedDate = date;
    calSection.querySelectorAll('.cal-day').forEach(el => {
      el.classList.toggle('selected', el.dataset.date === date);
    });

    // Collapse the calendar sidebar by default so the viewer gets full width
    setSidebarCollapsed(true);

    // Show topbar, hide placeholder
    viewerPlaceholder.style.display = 'none';
    viewerTopbar.style.display = 'flex';

    // Update breadcrumb
    bcSite.textContent = site;
    bcDate.textContent = date;

    if (currentModes[date] === 'screenshot') {
      showScreenshotView(site, date);
    } else {
      showHtmlView(site, date);
    }
  }

  // Re-render the archived website in an iframe
  function showHtmlView(site, date) {
    if (screenshotWarning) screenshotWarning.style.display = 'none';
    screenshotContainer.style.display = 'none';
    snapshotIframe.style.display = 'block';
    if (badgeType) badgeType.textContent = '⚡ Served from Local Archive';

    spinnerOverlay.classList.add('active');
    snapshotIframe.onload = () => spinnerOverlay.classList.remove('active');
    snapshotIframe.src = `/view/${encodeURIComponent(site)}/${encodeURIComponent(date)}/`;
  }

  // Show the full-page screenshot instead, with a warning note
  function showScreenshotView(site, date) {
    snapshotIframe.style.display = 'none';
    if (screenshotWarning) screenshotWarning.style.display = 'flex';
    screenshotContainer.style.display = 'flex';
    if (badgeType) badgeType.textContent = '📷 Screenshot — resources incomplete';

    spinnerOverlay.classList.add('active');
    snapshotImg.onload = () => spinnerOverlay.classList.remove('active');
    snapshotImg.onerror = () => {
      spinnerOverlay.classList.remove('active');
      screenshotContainer.style.display = 'none';
      if (screenshotWarning) screenshotWarning.style.display = 'none';
      showToast('No screenshot available for this date', 'error');
    };
    snapshotImg.src = `/view/${encodeURIComponent(site)}/${encodeURIComponent(date)}/screenshot`;
  }

  // ----------------------------------------------------------------
  // Toast
  // ----------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg, type = 'info') {
    toast.textContent = msg;
    toast.className = `show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ----------------------------------------------------------------
  // Theme & Sidebar toggles
  // ----------------------------------------------------------------
  function initThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  function initSidebarToggle() {
    if (!sidebarToggle) return;
    sidebarToggle.addEventListener('click', () => {
      const mainEl = document.getElementById('main');
      const isCurrentlyCollapsed = mainEl && mainEl.classList.contains('sidebar-collapsed');
      setSidebarCollapsed(!isCurrentlyCollapsed);
    });
  }

  function setSidebarCollapsed(collapsed) {
    const mainEl = document.getElementById('main');
    if (!mainEl) return;

    if (collapsed) {
      mainEl.classList.add('sidebar-collapsed');
      if (sidebarToggle) {
        const collapseIcon = sidebarToggle.querySelector('.toggle-icon-collapse');
        const expandIcon = sidebarToggle.querySelector('.toggle-icon-expand');
        if (collapseIcon) collapseIcon.style.display = 'none';
        if (expandIcon) expandIcon.style.display = 'inline';
        sidebarToggle.title = 'Expand calendar sidebar';
        sidebarToggle.setAttribute('aria-label', 'Expand sidebar');
      }
    } else {
      mainEl.classList.remove('sidebar-collapsed');
      if (sidebarToggle) {
        const collapseIcon = sidebarToggle.querySelector('.toggle-icon-collapse');
        const expandIcon = sidebarToggle.querySelector('.toggle-icon-expand');
        if (collapseIcon) collapseIcon.style.display = 'inline';
        if (expandIcon) expandIcon.style.display = 'none';
        sidebarToggle.title = 'Collapse calendar sidebar';
        sidebarToggle.setAttribute('aria-label', 'Collapse sidebar');
      }
    }
  }

  // ----------------------------------------------------------------
  // Utils
  // ----------------------------------------------------------------
  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

})();

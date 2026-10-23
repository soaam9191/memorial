/* ============================================================
   추모기부 페이지 공통 설정
   공개용 Apps Script 웹앱을 배포한 뒤, 받은 주소(…/exec)를 아래에 붙여넣으세요.
   ============================================================ */
window.MEMORIAL_API = 'https://script.google.com/macros/s/AKfycbz2Doc3PtZifnt8v7GPCbXYsIpP3BaJ4Vvyt7JI4otNu-L5BaaYHAGaB8qt42C1AnlN/exec';

/* 공개용 웹앱 호출 도우미 — 각 페이지에서 사용합니다 */
window.memorialApi = {
  ready: function () { return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(window.MEMORIAL_API); },
  get: function (params) {
    var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&');
    return fetch(window.MEMORIAL_API + '?' + q).then(function (r) { return r.json(); });
  },
  /* ---------- 빠르게 보여주기 ----------
     cached(): 이 브라우저에 저장해 둔 지난 데이터를 즉시 그리고(cb(data, true)),
               동시에 최신 데이터를 받아 달라졌을 때만 다시 그립니다(cb(data, false)).
     prefetch(): 다음에 열 페이지의 데이터를 미리 받아 둡니다. */
  _key: function (params) { return 'mem1:' + JSON.stringify(params); },
  _read: function (params) {
    try { var raw = localStorage.getItem(this._key(params)); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  },
  _inflight: {},
  load: function (params) {
    var self = this, k = this._key(params);
    if (this._inflight[k]) return this._inflight[k];
    var p = this.get(params).then(function (d) {
      delete self._inflight[k];
      if (d && d.ok) { try { localStorage.setItem(k, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} }
      else { try { localStorage.removeItem(k); } catch (e) {} }
      return d;
    }, function (e) { delete self._inflight[k]; throw e; });
    this._inflight[k] = p;
    return p;
  },
  cached: function (params, cb) {
    var hit = this._read(params);
    var showed = hit && (Date.now() - hit.t < 14 * 864e5) ? JSON.stringify(hit.d) : null;
    /* 페이지 스크립트가 준비를 다 마친 직후에 그립니다 (같은 순간에 그리면 준비 전 변수에 닿을 수 있음) */
    var first = showed ? Promise.resolve().then(function () { cb(hit.d, true); }) : Promise.resolve();
    var fresh = this.load(params);
    return first.then(function () { return fresh; }).then(function (d) {
      if (!showed || JSON.stringify(d) !== showed) cb(d, false);
      return d;
    }, function (e) { if (!showed) throw e; });
  },
  prefetch: function (params) {
    var hit = this._read(params);
    if (hit && Date.now() - hit.t < 60 * 1000) return;   // 1분 안에 받은 건 다시 받지 않음
    this.load(params).catch(function () {});
  },

  post: function (body) {
    /* text/plain 으로 보내야 브라우저 사전 확인(CORS preflight) 없이 Apps Script에 바로 전달됩니다 */
    return fetch(window.MEMORIAL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.ok) throw new Error((j && j.error) || '전송에 실패했어요.');
      return j;
    });
  }
};

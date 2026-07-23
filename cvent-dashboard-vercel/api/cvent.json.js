const XLSX = require('xlsx');
const { downloadSharedFile } = require('../lib/graph-client');

// 엑셀 헤더 텍스트 그대로 사용 (요청하신 9개 컬럼)
const COL = {
  eventName: '행사명',
  eventDate: '행사일',
  owner: '담당',
  preDeadline: '사전Cvent마감',
  preStatus: '사전상태',
  postDeadline: '사후Cvent마감',
  postStatus: '사후상태',
  invoice: '세금계산서',
  note: '비고',
};

function toDateString(value) {
  if (value === undefined || value === null || value === '') return '';

  // xlsx가 cellDates:true 옵션으로 이미 Date 객체를 만들어준 경우
  if (value instanceof Date && !isNaN(value)) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // 혹시 순수 숫자(엑셀 시리얼 값)로 들어온 경우 대비
  if (typeof value === 'number') {
    const ms = Math.round((value - 25569) * 86400 * 1000);
    const d = new Date(ms);
    if (!isNaN(d)) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${dd}`;
    }
  }

  // 이미 "2026-04-28" 같은 문자열이면 그대로 사용
  return String(value).trim();
}

function normalizeStatus(value) {
  const s = String(value || '').trim();
  return s === '완료' ? '완료' : '미완료';
}

function parseWorkbookToEvents(buffer, sheetName) {
  const wb = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  const targetSheet = wb.SheetNames.find((n) => n === sheetName) || wb.SheetNames[0];
  const ws = wb.Sheets[targetSheet];

  // 첫 행을 헤더로 사용해 객체 배열로 변환 (헤더 이름 기준이라 열 순서가 바뀌어도 안전)
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  const events = [];
  rows.forEach((row, idx) => {
    const eventName = String(row[COL.eventName] || '').trim();
    if (!eventName) return; // 행사명이 없는 빈 행은 건너뜀

    events.push({
      no: idx + 1,
      eventName,
      eventDate: toDateString(row[COL.eventDate]),
      owner: String(row[COL.owner] || '').trim(),
      pre: {
        deadline: toDateString(row[COL.preDeadline]),
        status: normalizeStatus(row[COL.preStatus]),
      },
      post: {
        deadline: toDateString(row[COL.postDeadline]),
        status: normalizeStatus(row[COL.postStatus]),
        invoice: String(row[COL.invoice] || '').trim(),
      },
      note: String(row[COL.note] || '').trim(),
    });
  });

  return events;
}

module.exports = async function handler(req, res) {
  try {
    const shareUrl = process.env.ONEDRIVE_SHARE_URL;
    const sheetName = process.env.CVENT_SHEET_NAME || '일정';

    if (!shareUrl) {
      res.status(500).json({ error: 'ONEDRIVE_SHARE_URL 환경변수가 설정되지 않았습니다.' });
      return;
    }

    const buffer = await downloadSharedFile(shareUrl);
    const events = parseWorkbookToEvents(buffer, sheetName);

    res.setHeader(
      'Cache-Control',
      'public, max-age=0, s-maxage=60, stale-while-revalidate=30'
    );
    res.status(200).json({
      updatedAt: new Date().toISOString(),
      events,
    });
  } catch (err) {
    console.error('[cvent.json] 데이터 조회 실패:', err);
    res.status(500).json({ error: '엑셀 데이터를 불러오는 중 오류가 발생했습니다.', detail: err.message });
  }
};

import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { phases, weeks, resources, dailyTasks } from "@/lib/curriculum";
import { blankEntry, dateAt, dayOffset, isDate, today, type Entry, type Profile } from "@/lib/study";
import "./style.css";

type Tab = "today" | "roadmap" | "plan" | "records" | "settings";
type Store = { version: 1; profile: Profile; entries: Entry[] };
const STORE_KEY = "hardware-study-github-v1";
const nav: { id: Tab; label: string }[] = [
  { id: "today", label: "每日打卡" }, { id: "roadmap", label: "学习路线" },
  { id: "plan", label: "24 周计划" }, { id: "records", label: "学习记录" },
  { id: "settings", label: "设置与备份" },
];

function readStore(): Store {
  try {
    const value = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (value?.version === 1 && isDate(value.profile?.startDate) && Array.isArray(value.entries)) return value;
  } catch {}
  return { version: 1, profile: { startDate: today(), dailyMinutes: 180 }, entries: [] };
}
function persist(profile: Profile, entries: Entry[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, profile, entries } satisfies Store));
}
const fmt = (date: string) => `${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;

function App() {
  const initial = useMemo(readStore, []);
  const [tab, setTab] = useState<Tab>("today");
  const [profile, setProfile] = useState(initial.profile);
  const [entries, setEntries] = useState<Entry[]>(initial.entries);
  const current = Math.max(0, Math.min(167, dayOffset(profile.startDate, today())));
  const [selected, setSelected] = useState(current);
  const saved = entries.find(e => e.dayIndex === selected) || blankEntry(selected);
  const [draft, setDraft] = useState<Entry>(saved);
  const [weekIndex, setWeekIndex] = useState(Math.floor(current / 7));
  const [notice, setNotice] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const selectedDate = dateAt(profile.startDate, selected);
  const future = selectedDate > today();
  const tasks = dailyTasks(selected, profile.dailyMinutes);
  const complete = entries.filter(e => e.completed).length;
  const totalMinutes = entries.reduce((sum, e) => sum + e.minutes, 0);
  let streak = 0;
  for (let i = current; i >= 0 && entries.some(e => e.dayIndex === i && e.completed); i--) streak++;

  function chooseDay(index: number) {
    const next = Math.max(0, Math.min(167, index));
    setSelected(next); setDraft(entries.find(e => e.dayIndex === next) || blankEntry(next)); setTab("today"); setNotice("");
  }
  function saveEntry() {
    if (future) return;
    if (!Number.isInteger(draft.minutes) || draft.minutes < 0 || draft.minutes > 1440) { setNotice("学习时长应为 0～1440 的整数分钟。"); return; }
    const entry = { ...draft, completed: draft.checks.every(Boolean) && draft.minutes > 0, updatedAt: new Date().toISOString(), revision: draft.revision + 1 };
    const next = [...entries.filter(e => e.dayIndex !== selected), entry].sort((a, b) => a.dayIndex - b.dayIndex);
    setEntries(next); setDraft(entry); persist(profile, next); setNotice(entry.completed ? "打卡成功，已保存在当前浏览器。" : "学习进度已保存在当前浏览器。");
  }
  function saveProfile() {
    if (!isDate(profile.startDate) || profile.dailyMinutes < 30 || profile.dailyMinutes > 480) { setNotice("请填写有效日期和 30～480 分钟的学习时长。"); return; }
    persist(profile, entries); setNotice("设置已保存。");
  }
  function exportData() {
    const blob = new Blob([JSON.stringify({ version: 1, profile, entries }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `硬件进阶-学习记录-${today()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importData(file?: File) {
    if (!file) return;
    try {
      const value = JSON.parse(await file.text()) as Store;
      if (value.version !== 1 || !isDate(value.profile?.startDate) || !Number.isInteger(value.profile.dailyMinutes) || value.profile.dailyMinutes < 30 || value.profile.dailyMinutes > 480 || !Array.isArray(value.entries)) throw new Error();
      setProfile(value.profile); setEntries(value.entries); setSelected(0); setDraft(value.entries.find(e => e.dayIndex === 0) || blankEntry(0)); persist(value.profile, value.entries); setNotice("备份已导入。");
    } catch { setNotice("导入失败：请选择由本软件导出的 JSON 文件。"); }
    if (importRef.current) importRef.current.value = "";
  }

  return <div className="app">
    <header><div className="brand"><span>▦</span><div>硬件进阶<small>HARDWARE STUDY LAB</small></div></div><div className="header-meta">大四 · 电子信息工程</div></header>
    <nav>{nav.map(item => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}>{item.label}</button>)}</nav>
    <main>
      {notice && <div className="notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}
      {tab === "today" && <>
        <div className="heading"><div><p className="eyebrow">每天推进一点，把知识变成工程。</p><h1>{selectedDate === today() ? "今天，从这一步开始。" : `${fmt(selectedDate)}的学习任务`}</h1></div><div className="date-nav"><button disabled={selected === 0} onClick={() => chooseDay(selected - 1)}>‹</button><span>{selectedDate}</span><button disabled={selected === 167} onClick={() => chooseDay(selected + 1)}>›</button><button onClick={() => chooseDay(current)}>今天</button></div></div>
        <section className="stats"><div><span>累计打卡</span><strong>{complete}<small>天</small></strong></div><div><span>连续打卡</span><strong>{streak}<small>天</small></strong></div><div><span>累计学习</span><strong>{(totalMinutes / 60).toFixed(1)}<small>小时</small></strong></div><div><span>计划完成度</span><strong>{Math.round(complete / 168 * 100)}<small>%</small></strong></div></section>
        <div className="today-grid"><section className="card task-card"><div className="week-hero"><div><span>第 {Math.floor(selected / 7) + 1} 周 · 第 {selected % 7 + 1} 天</span><h2>{weeks[Math.floor(selected / 7)].title}</h2><p>{selected % 7 === 6 ? "轻量复盘日 · 30 分钟" : `今日计划 ${profile.dailyMinutes} 分钟`}</p></div><strong>{draft.checks.filter(Boolean).length}<small>/3</small></strong></div>
          {future && <p className="future">未来日期只能预览，届时再打卡。</p>}
          <div className="tasks">{tasks.map((task, i) => <label key={i} className={draft.checks[i] ? "checked" : ""}><input type="checkbox" disabled={future} checked={draft.checks[i]} onChange={e => setDraft({ ...draft, checks: draft.checks.map((v, n) => n === i ? e.target.checked : v) })}/><div><span>{task.type} · {task.minutes} 分钟</span><h3>{task.title}</h3><p>{task.detail}</p></div></label>)}</div>
          <div className="reflection"><h3>留下一点学习证据</h3><textarea disabled={future} maxLength={5000} value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} placeholder="今天完成了什么？遇到了什么问题？明天先做哪一步？"/><div className="save-row"><label>实际学习 <input type="number" min="0" max="1440" value={draft.minutes || ""} onChange={e => setDraft({ ...draft, minutes: Number(e.target.value) })}/> 分钟</label><button className="primary" disabled={future} onClick={saveEntry}>保存学习进度</button></div></div>
        </section><aside className="card aside"><p className="eyebrow">本周成果</p><h2>{weeks[Math.floor(selected / 7)].output}</h2><div className="criteria"><b>验收标准</b><p>{weeks[Math.floor(selected / 7)].criteria}</p></div><button onClick={() => { setWeekIndex(Math.floor(selected / 7)); setTab("plan"); }}>查看本周计划 →</button></aside></div>
      </>}
      {tab === "roadmap" && <><div className="heading"><div><p className="eyebrow">你的起点：模电 / 数电 + 单片机基础</p><h1>通往高速硬件的 5 个阶段</h1></div></div><div className="intro"><h2>先独立做完一块板，再提高信号速度。</h2><p>围绕 PCB、STM32 四层板、SI/PI、100BASE-TX 和作品集逐步建立工程证据。</p></div><div className="roadmap">{phases.map((p, i) => <article key={p.name}><span className="phase-num">0{i + 1}</span><div><p className="eyebrow">{p.range}</p><h2>{p.name}</h2><h3>{p.goal}</h3><p>{p.detail}</p><b>{p.project}</b></div></article>)}</div><h2 className="section-title">官方学习资源</h2><div className="resources">{resources.map(r => <a href={r.url} target="_blank" rel="noreferrer" key={r.url}><p className="eyebrow">{r.org}</p><h3>{r.title}</h3><p>{r.desc}</p></a>)}</div></>}
      {tab === "plan" && <><div className="heading"><div><p className="eyebrow">每周一个成果，每天一个具体行动</p><h1>24 周学习计划</h1></div><button onClick={() => window.print()}>打印 / 保存 PDF</button></div><div className="week-tabs">{weeks.map((_, i) => <button className={weekIndex === i ? "active" : ""} onClick={() => setWeekIndex(i)} key={i}>W{i + 1}</button>)}</div><section className="card week-detail"><p className="eyebrow">W{weekIndex + 1} · {fmt(dateAt(profile.startDate, weekIndex * 7))}—{fmt(dateAt(profile.startDate, weekIndex * 7 + 6))}</p><h2>{weeks[weekIndex].title}</h2><h3>{weeks[weekIndex].output}</h3>{Array.from({ length: 7 }, (_, i) => <button className="day-row" key={i} onClick={() => chooseDay(weekIndex * 7 + i)}><b>D{i + 1}</b><span>{i === 6 ? "整理成果、验收与轻量复盘" : weeks[weekIndex].days[i]}</span><i>{i === 6 ? 30 : profile.dailyMinutes} 分钟 →</i></button>)}<div className="criteria"><b>本周验收</b><p>{weeks[weekIndex].criteria}</p></div></section></>}
      {tab === "records" && <><div className="heading"><div><p className="eyebrow">每一次实践，都有迹可循</p><h1>学习记录</h1></div><button onClick={exportData}>导出备份</button></div><section className="card history"><h2>{complete} / 168 天已完成</h2><div className="progress"><i style={{ width: `${complete / 168 * 100}%` }}/></div><div className="heatmap">{Array.from({ length: 168 }, (_, i) => { const e = entries.find(x => x.dayIndex === i); return <button title={dateAt(profile.startDate, i)} className={e?.completed ? "done" : e ? "partial" : ""} onClick={() => chooseDay(i)} key={i}>{i + 1}</button>; })}</div></section><div className="logs">{entries.slice().sort((a, b) => b.dayIndex - a.dayIndex).map(e => <article className="card" key={e.dayIndex}><div><p className="eyebrow">{dateAt(profile.startDate, e.dayIndex)} · W{Math.floor(e.dayIndex / 7) + 1}</p><h3>{weeks[Math.floor(e.dayIndex / 7)].title}</h3><p>{e.note || "没有填写复盘笔记。"}</p></div><button onClick={() => chooseDay(e.dayIndex)}>查看</button></article>)}</div></>}
      {tab === "settings" && <><div className="heading"><div><p className="eyebrow">设置与数据迁移</p><h1>让计划适应你的节奏</h1></div></div><div className="settings"><section className="card"><label>学习开始日期<input type="date" disabled={entries.length > 0} value={profile.startDate} onChange={e => setProfile({ ...profile, startDate: e.target.value })}/></label><label>常规日学习时长（分钟）<input type="number" min="30" max="480" step="30" value={profile.dailyMinutes} onChange={e => setProfile({ ...profile, dailyMinutes: Number(e.target.value) })}/></label><button className="primary" onClick={saveProfile}>保存设置</button></section><aside className="card backup"><h2>备份与换设备</h2><p>GitHub Pages 版本把记录保存在当前浏览器。换手机或电脑前先导出 JSON，再在新设备导入。</p><button onClick={exportData}>导出 JSON 备份</button><button onClick={() => importRef.current?.click()}>导入 JSON 备份</button><input ref={importRef} hidden type="file" accept="application/json,.json" onChange={e => void importData(e.target.files?.[0])}/></aside></div></>}
    </main><footer>硬件进阶 · 24 周高速硬件学习路线 · 数据保存在当前浏览器</footer>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);


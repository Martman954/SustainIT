import { useState } from "react";

const theme = {
  bg: "#1a1a1a",
  surface: "#252525",
  surface2: "#2e2e2e",
  green: "#4a9d6f",
  greenLight: "#d4ede0",
  greenDim: "#2d5c42",
  text: "#ffffff",
  textMuted: "#999999",
  textDim: "#666666",
  border: "#333333",
  accent: "#f0ece0",
};

const styles = {
  app: {
    background: theme.bg,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'DM Sans', sans-serif",
    padding: "0",
  },
  phone: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100vh",
    background: theme.bg,
    position: "relative",
    overflow: "hidden",
  },
  screen: {
    width: "100%",
    minHeight: "100vh",
    background: theme.bg,
    color: theme.text,
    padding: "20px 20px 100px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: theme.text,
  },
  navBar: {
    position: "fixed",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "390px",
    background: theme.surface,
    borderTop: `1px solid ${theme.border}`,
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0 20px",
    zIndex: 100,
  },
  navItem: (active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    cursor: "pointer",
    color: active ? theme.green : theme.textDim,
    fontSize: "10px",
    fontWeight: active ? "600" : "400",
    transition: "color 0.2s",
  }),
  btn: {
    width: "100%",
    padding: "16px",
    borderRadius: "50px",
    border: "none",
    background: theme.green,
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "16px",
  },
  card: {
    background: theme.surface,
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "12px",
  },
  chip: (active) => ({
    padding: "10px 18px",
    borderRadius: "12px",
    border: active ? `2px solid ${theme.green}` : "2px solid transparent",
    background: active ? theme.greenDim : theme.surface2,
    color: theme.text,
    fontSize: "14px",
    fontWeight: active ? "600" : "400",
    cursor: "pointer",
    transition: "all 0.15s",
    flex: 1,
    textAlign: "center",
  }),
  listChip: (active) => ({
    padding: "14px 16px",
    borderRadius: "12px",
    border: active ? `2px solid ${theme.green}` : "2px solid transparent",
    background: active ? theme.greenDim : theme.surface2,
    color: theme.text,
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.15s",
    marginBottom: "8px",
    width: "100%",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  tag: (active) => ({
    padding: "6px 16px",
    borderRadius: "20px",
    background: active ? theme.green : theme.surface2,
    color: active ? "#fff" : theme.textMuted,
    fontSize: "13px",
    fontWeight: active ? "600" : "400",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
  }),
};

// ─── Screens ────────────────────────────────────────────────────────────────

function TopBar({ title, onBack, actionLabel, onAction }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 48px", alignItems: "center", marginBottom: "16px" }}>
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 38,
          height: 38,
          borderRadius: "12px",
          border: "none",
          background: "none",
          color: theme.text,
          fontSize: "22px",
          cursor: "pointer",
          justifySelf: "start",
        }}
      >
        ←
      </button>
      <h1 style={{ margin: 0, textAlign: "center", fontSize: "30px", fontWeight: "700", letterSpacing: "-0.5px" }}>{title}</h1>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          style={{
            border: "none",
            background: "none",
            color: theme.text,
            fontSize: "16px",
            cursor: "pointer",
            justifySelf: "end",
            padding: "6px 8px",
          }}
        >
          {actionLabel}
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

function PressRow({ icon, title, subtitle, right, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles.card,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        textAlign: "left",
        cursor: "pointer",
        border: "none",
      }}
    >
      {icon ? (
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
          {icon}
        </div>
      ) : null}
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: "600", fontSize: "16px" }}>{title}</p>
        {subtitle ? <p style={{ margin: "4px 0 0", color: theme.textMuted, fontSize: "13px" }}>{subtitle}</p> : null}
      </div>
      <div style={{ color: theme.textDim, fontSize: "16px" }}>{right ?? "›"}</div>
    </button>
  );
}

function ProgressBar({ value, max = 1, color = theme.green }) {
  const pct = Math.max(0, Math.min(1, max === 0 ? 0 : value / max)) * 100;
  return (
    <div style={{ height: "6px", background: theme.border, borderRadius: "3px" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "3px" }} />
    </div>
  );
}

function Splash({ onStart }) {
  return (
    <div style={{ ...styles.screen, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0" }}>
      <div style={{ width: 120, height: 120, borderRadius: "50%", background: theme.greenLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
        <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
          <path d="M24 4 C24 4 8 20 8 36 C8 50 16 60 24 60 C32 60 40 50 40 36 C40 20 24 4 24 4Z" fill="#4a9d6f" />
          <path d="M24 60 L24 30" stroke="#2d5c42" strokeWidth="2" />
        </svg>
      </div>
      <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 6px", letterSpacing: "-0.5px" }}>SustainIT</h1>
      <p style={{ color: theme.textMuted, margin: "0 0 40px", fontSize: "15px" }}>Track your impact as a student</p>
      <div style={{ alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
        {[["🚲", "Track daily habits"], ["📊", "See your environmental impact"], ["💡", "Get personalized suggestions"]].map(([icon, text]) => (
          <div key={text} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "15px", color: theme.textMuted }}>
            <span>{icon}</span><span>{text}</span>
          </div>
        ))}
      </div>
      <button style={styles.btn} onClick={onStart}>Start</button>
      <button style={{ background: "none", border: "none", color: theme.text, fontSize: "15px", cursor: "pointer", marginTop: "16px", fontWeight: "500" }}>Learn more</button>
      <p style={{ color: theme.textDim, fontSize: "12px", marginTop: "16px" }}>Join students making a difference</p>
    </div>
  );
}

function Setup({ onDone }) {
  const [commute, setCommute] = useState("Bike");
  const [priority, setPriority] = useState("Save the planet");
  return (
    <div style={styles.screen}>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? theme.green : theme.border }} />)}
      </div>
      <h2 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px" }}>Quick setup</h2>
      <p style={{ color: theme.textMuted, marginBottom: "32px", fontSize: "15px" }}>Help us personalize your experience</p>
      <p style={{ fontWeight: "600", marginBottom: "12px" }}>How do you usually commute?</p>
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
        {[["🚲", "Bike"], ["🚌", "Bus"], ["🚗", "Car"]].map(([icon, label]) => (
          <div key={label} style={styles.chip(commute === label)} onClick={() => setCommute(label)}>
            <div>{icon}</div><div>{label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontWeight: "600", marginBottom: "12px" }}>What matters most to you?</p>
      {[["💰", "Save money"], ["🌍", "Save the planet"], ["✨", "Both"]].map(([icon, label]) => (
        <button key={label} style={styles.listChip(priority === label)} onClick={() => setPriority(label)}>
          <span>{icon}</span><span>{label}</span>
        </button>
      ))}
      <button style={styles.btn} onClick={onDone}>Continue</button>
      <p style={{ textAlign: "center", color: theme.textMuted, marginTop: "14px", cursor: "pointer", fontSize: "14px" }} onClick={onDone}>Skip for now</p>
    </div>
  );
}

function Home({ onLog, onImpactDetails }) {
  return (
    <div style={styles.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: 0 }}>Home</h1>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: theme.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>⚙️</div>
      </div>

      <div style={{ ...styles.card, textAlign: "center", marginBottom: "12px" }}>
        <p style={{ color: theme.textMuted, fontSize: "13px", margin: "0 0 4px" }}>This week</p>
        <p style={{ fontSize: "44px", fontWeight: "700", margin: "0", letterSpacing: "-1px" }}>2.3 kg</p>
        <p style={{ color: theme.textMuted, margin: "4px 0 6px", fontSize: "14px" }}>CO₂ saved 🌱</p>
        <button
          type="button"
          onClick={onImpactDetails}
          style={{
            border: "none",
            background: "none",
            color: theme.green,
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          View impact details
        </button>
      </div>

      <div style={{ ...styles.card, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontWeight: "600", margin: "0 0 4px" }}>Current streak</p>
          <p style={{ color: theme.textMuted, fontSize: "13px", margin: 0 }}>Keep it up! Log today to continue</p>
        </div>
        <p style={{ margin: 0, fontWeight: "600" }}>🔥 2 days</p>
      </div>
      <h3 style={{ margin: "20px 0 12px" }}>Today's habits</h3>
      <div style={styles.card}>
        {[["🚲", "Transport"], ["🥗", "Food"], ["♻️", "Waste"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
            <span>{icon} {label}</span>
            <span style={{ color: theme.textDim, fontSize: "13px" }}>Not logged</span>
          </div>
        ))}
      </div>
      <button style={styles.btn} onClick={onLog}>Log today</button>
    </div>
  );
}

function LogToday({ onSave }) {
  const [transport, setTransport] = useState("Bike");
  const [food, setFood] = useState("Mixed");
  const [waste, setWaste] = useState("Yes, recycled");
  return (
    <div style={styles.screen}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", textAlign: "center", marginBottom: "4px" }}>Log today</h2>
      <p style={{ textAlign: "center", color: theme.textMuted, marginBottom: "24px", fontSize: "13px" }}>Friday, April 10, 2026</p>
      <div style={styles.card}>
        <p style={{ fontWeight: "600", margin: "0 0 4px" }}>🚲 Transport</p>
        <p style={{ color: theme.textMuted, fontSize: "13px", margin: "0 0 12px" }}>How did you get around today?</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Bike", "Bus", "Car"].map(o => <div key={o} style={styles.chip(transport === o)} onClick={() => setTransport(o)}>{o}</div>)}
        </div>
      </div>
      <div style={styles.card}>
        <p style={{ fontWeight: "600", margin: "0 0 4px" }}>🥗 Food</p>
        <p style={{ color: theme.textMuted, fontSize: "13px", margin: "0 0 12px" }}>What did you eat today?</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Vegetarian", "Mixed", "Meat"].map(o => <div key={o} style={styles.chip(food === o)} onClick={() => setFood(o)}>{o}</div>)}
        </div>
      </div>
      <div style={styles.card}>
        <p style={{ fontWeight: "600", margin: "0 0 4px" }}>♻️ Waste</p>
        <p style={{ color: theme.textMuted, fontSize: "13px", margin: "0 0 12px" }}>Did you recycle today?</p>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Yes, recycled", "No"].map(o => <div key={o} style={styles.chip(waste === o)} onClick={() => setWaste(o)}>{o}</div>)}
        </div>
      </div>
      <button style={styles.btn} onClick={onSave}>Save</button>
    </div>
  );
}

function Saved({ onBack }) {
  return (
    <div style={{ ...styles.screen, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 120, height: 120, borderRadius: "50%", background: theme.greenLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", fontSize: "48px" }}>🎉</div>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>Great job!</h2>
      <div style={{ ...styles.card, width: "100%", textAlign: "center", marginBottom: "24px" }}>
        <p style={{ color: theme.textMuted, margin: "0 0 4px", fontSize: "13px" }}>You saved today</p>
        <p style={{ fontSize: "36px", fontWeight: "700", margin: 0 }}>0.5 kg CO₂</p>
      </div>
      <div style={{ width: "100%", marginBottom: "16px" }}>
        {[["🚲 Biking", "+0.3 kg"], ["♻️ Recycling", "+0.2 kg"]].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
            <span>{label}</span><span style={{ color: theme.green, fontWeight: "600" }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ width: "100%", background: theme.accent, borderRadius: "16px", padding: "16px", marginBottom: "24px", color: "#555" }}>
        <p style={{ margin: 0, fontSize: "13px" }}>💡 Tomorrow's suggestion: Try going fully vegetarian for an extra 0.4 kg saved!</p>
      </div>
      <button style={styles.btn} onClick={onBack}>Back to home</button>
    </div>
  );
}

function Insights() {
  const [period, setPeriod] = useState("Week");
  const days = [{ d: "Mon", v: 0.4 }, { d: "Tue", v: 0.7 }, { d: "Wed", v: 0.5 }, { d: "Thu", v: 0.8 }, { d: "Fri", v: 1.0 }, { d: "Sat", v: 0.3, est: true }, { d: "Sun", v: 0.3, est: true }];
  const max = Math.max(...days.map(d => d.v));
  return (
    <div style={styles.screen}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>Insights</h1>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["Week", "Month", "Year"].map(p => <button key={p} style={styles.tag(period === p)} onClick={() => setPeriod(p)}>{p}</button>)}
      </div>
      <div style={{ ...styles.card, marginBottom: "12px" }}>
        <p style={{ fontWeight: "700", fontSize: "17px", margin: "0 0 4px" }}>You improved 20% this week</p>
        <p style={{ color: theme.textMuted, fontSize: "13px", margin: 0 }}>That's 1.8 kg more CO₂ saved than last week!</p>
      </div>
      <div style={styles.card}>
        <p style={{ fontWeight: "600", margin: "0 0 16px" }}>CO₂ saved per day</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px", marginBottom: "8px" }}>
          {days.map(({ d, v, est }) => (
            <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "100%", height: `${(v / max) * 70}px`, background: d === "Fri" ? "#5b9bd5" : est ? "#888" : "#8ab4d4", borderRadius: "4px 4px 0 0", opacity: est ? 0.5 : 1 }} />
              <span style={{ fontSize: "10px", color: theme.textMuted }}>{d}</span>
            </div>
          ))}
        </div>
        <p style={{ color: theme.textDim, fontSize: "11px", textAlign: "center", margin: 0 }}>Future days are estimates</p>
      </div>
      <h3 style={{ margin: "20px 0 12px" }}>This week breakdown</h3>
      <div style={styles.card}>
        {[["🚲 Transport", 1.2, theme.green], ["🥗 Food", 0.8, "#f0a040"], ["♻️ Waste", 0.3, "#60b080"]].map(([label, val, color]) => (
          <div key={label} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "14px" }}>{label}</span>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>{val} kg</span>
            </div>
            <div style={{ height: "6px", background: theme.border, borderRadius: "3px" }}>
              <div style={{ height: "100%", width: `${(val / 1.2) * 100}%`, background: color, borderRadius: "3px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tips() {
  const [filter, setFilter] = useState("All");
  const tips = [
    { icon: "🚲", title: "Bike to campus twice this week", co2: "2.5 kg CO₂", hint: "🔥 Your usual commute is perfect for biking", action: "Try this week", cat: "Transport" },
    { icon: "🥗", title: "Go vegetarian on Mondays", co2: "1.8 kg CO₂ per week", hint: "💡 Start small with Meatless Monday", action: "Set reminder", cat: "Food" },
    { icon: "♻️", title: "Bring a reusable water bottle", co2: "0.8 kg CO₂ per week", hint: "💧 Reduce plastic waste on campus", action: "Active", cat: "All", active: true },
    { icon: "🎒", title: "Use campus carpool board", co2: "3.2 kg CO₂ per week", hint: "🚗 Share rides with other students", action: "Learn more", cat: "Transport" },
  ];
  const filtered = filter === "All" ? tips : tips.filter(t => t.cat === filter);
  return (
    <div style={styles.screen}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>Tips for you</h1>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {["All", "Transport", "Food"].map(f => <button key={f} style={styles.tag(filter === f)} onClick={() => setFilter(f)}>{f}</button>)}
      </div>
      {filtered.map(tip => (
        <div key={tip.title} style={styles.card}>
          <div style={{ display: "flex", gap: "14px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: theme.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{tip.icon}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600", margin: "0 0 2px", fontSize: "15px" }}>{tip.title}</p>
              <p style={{ color: theme.textMuted, fontSize: "12px", margin: "0 0 4px" }}>Save up to {tip.co2}</p>
              <p style={{ color: theme.textMuted, fontSize: "12px", margin: 0 }}>{tip.hint}</p>
            </div>
          </div>
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${theme.border}` }}>
            <button style={{ background: tip.active ? theme.green : "none", border: "none", color: tip.active ? "#fff" : theme.textMuted, fontSize: "13px", cursor: "pointer", padding: tip.active ? "6px 16px" : "0", borderRadius: "20px" }}>
              {tip.action}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Achievements({ onBack }) {
  const unlocked = [
    { icon: "🔥", title: "Week Warrior", sub: "7-day logging streak", pts: "+50 pts" },
    { icon: "🚲", title: "Bike Champion", sub: "Biked 10 times", pts: "+30 pts" },
    { icon: "🌱", title: "First Steps", sub: "Completed first log", pts: "+10 pts" },
  ];
  const comingSoon = [
    { icon: "🏆", title: "Month Master", sub: "30-day streak" },
    { icon: "🥗", title: "Veggie Hero", sub: "20 veggie days" },
  ];

  return (
    <div style={{ ...styles.screen, paddingBottom: "24px" }}>
      <TopBar title="Achievements" onBack={onBack} />

      <div style={{ ...styles.card, textAlign: "center", padding: "18px 16px" }}>
        <p style={{ color: theme.textMuted, margin: "0 0 6px", fontSize: "14px" }}>Your eco points</p>
        <p style={{ fontSize: "52px", fontWeight: "800", margin: "0 0 4px", letterSpacing: "-1px" }}>247</p>
        <p style={{ color: theme.textMuted, margin: 0, fontSize: "14px" }}>Level 3 Eco Warrior</p>
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Unlocked</h2>
      {unlocked.map((a) => (
        <div key={a.title} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#f5f2ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>
            <span style={{ transform: "translateY(1px)" }}>{a.icon}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "18px" }}>{a.title}</p>
            <p style={{ margin: "2px 0 0", color: theme.textMuted, fontSize: "13px" }}>{a.sub}</p>
          </div>
          <div style={{ color: theme.textMuted, fontWeight: "600", fontSize: "14px" }}>{a.pts}</div>
        </div>
      ))}

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Coming soon</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {comingSoon.map((c) => (
          <div key={c.title} style={{ ...styles.card, marginBottom: 0, opacity: 0.9 }}>
            <div style={{ width: 52, height: 52, borderRadius: "16px", background: theme.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "10px" }}>
              {c.icon}
            </div>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "16px" }}>{c.title}</p>
            <p style={{ margin: "4px 0 0", color: theme.textMuted, fontSize: "13px" }}>{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Community({ onBack }) {
  const leaders = [
    { rank: 1, name: "Emma Martinez", dept: "Environmental Science", kg: "4.8 kg" },
    { rank: 2, name: "Lucas Kim", dept: "Engineering", kg: "3.6 kg" },
    { rank: 3, name: "Sofia Andersen", dept: "Biology", kg: "2.9 kg" },
  ];
  const rankColors = ["#f2c35d", "#bfc2c7", "#e09b82"];

  return (
    <div style={{ ...styles.screen, paddingBottom: "24px" }}>
      <TopBar title="Community" onBack={onBack} actionLabel="Invite" onAction={() => {}} />

      <div style={{ ...styles.card, background: theme.greenLight, border: `1px solid ${theme.green}`, color: "#183125", padding: "18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: theme.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "18px" }}>
            #4
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.85 }}>Your ranking this week</p>
            <p style={{ margin: "6px 0 2px", fontSize: "34px", fontWeight: "800", letterSpacing: "-0.5px" }}>4th place</p>
            <p style={{ margin: 0, fontSize: "16px", opacity: 0.85 }}>2.3 kg CO₂ saved</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "14px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "700", margin: 0 }}>Campus leaderboard</h2>
        <p style={{ margin: 0, color: theme.textMuted, fontSize: "14px" }}>This week</p>
      </div>

      {leaders.map((l) => {
        const initials = l.name.split(" ").slice(0, 2).map((s) => s[0]).join("");
        return (
          <div key={l.rank} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: rankColors[l.rank - 1] ?? theme.surface2, display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: "800" }}>
              {l.rank}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dfe7f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#587", flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "700", fontSize: "18px" }}>{l.name}</p>
              <p style={{ margin: "2px 0 0", color: theme.textMuted, fontSize: "13px" }}>{l.dept}</p>
            </div>
            <div style={{ fontWeight: "700", fontSize: "18px" }}>{l.kg}</div>
          </div>
        );
      })}

      <div style={{ ...styles.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, fontWeight: "700", fontSize: "18px" }}>Campus average</p>
          <p style={{ margin: "4px 0 0", color: theme.textMuted, fontSize: "13px" }}>Based on 247 active students</p>
        </div>
        <div style={{ fontWeight: "800", fontSize: "20px" }}>1.4 kg</div>
      </div>

      <div style={{ ...styles.card, background: theme.accent, color: "#3a3a3a", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: 44, height: 44, borderRadius: "14px", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
          🏆
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: "800", fontSize: "16px" }}>Weekly challenge</p>
          <p style={{ margin: "4px 0 0", fontSize: "14px" }}>Bike 5 days to win 100 points</p>
        </div>
      </div>
    </div>
  );
}

function MonthReview({ onBack }) {
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const statuses = [
    "partial", "full", "full", "full", "full", "partial", "missed",
    "full", "full", "partial", "full", "full", "missed", "partial",
    "full", "full", "full", "full", "partial", "full", "full",
    "full", "partial", "full", "missed", "full", "full", "full",
    "full", "partial", "full",
  ];
  const statusColor = (s) => {
    if (s === "full") return theme.green;
    if (s === "partial") return "#a8c9ff";
    return "#d7d1c6";
  };

  return (
    <div style={{ ...styles.screen, paddingBottom: "24px" }}>
      <TopBar title="March Review" onBack={onBack} actionLabel="Share" onAction={() => {}} />

      <div style={{ ...styles.card, background: theme.greenLight, color: "#183125", padding: "18px 16px" }}>
        <p style={{ margin: 0, fontWeight: "700", opacity: 0.8 }}>Incredible month!</p>
        <p style={{ margin: "10px 0 6px", fontSize: "56px", fontWeight: "900", letterSpacing: "-1px", color: theme.green }}>12.8 kg</p>
        <p style={{ margin: 0, opacity: 0.8, fontSize: "16px" }}>CO₂ saved in March</p>
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Your activity</h2>
      <div style={{ ...styles.card, padding: "16px" }}>
        <p style={{ margin: 0, color: theme.textMuted, fontSize: "14px" }}>March 2026</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginTop: "12px" }}>
          {weekDays.map((d) => (
            <div key={d} style={{ textAlign: "center", color: theme.textMuted, fontSize: "11px" }}>{d}</div>
          ))}
          {statuses.map((s, i) => (
            <div key={i} style={{ width: "100%", paddingTop: "100%", borderRadius: "6px", background: statusColor(s) }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", justifyContent: "center", marginTop: "12px", color: theme.textMuted, fontSize: "12px" }}>
          {[["Full day", theme.green], ["Partial", "#a8c9ff"], ["Missed", "#d7d1c6"]].map(([label, c]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "3px", background: c, display: "inline-block" }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Top habits</h2>
      <div style={styles.card}>
        {[
          { icon: "🚲", title: "Biking", days: 18, color: theme.green },
          { icon: "♻️", title: "Recycling", days: 23, color: theme.green },
        ].map((h) => (
          <div key={h.title} style={{ padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px" }}>{h.icon}</span>
                <span style={{ fontWeight: "700" }}>{h.title}</span>
              </div>
              <span style={{ color: theme.textMuted, fontWeight: "700" }}>{h.days} days</span>
            </div>
            <ProgressBar value={h.days} max={31} color={h.color} />
          </div>
        ))}
        <div style={{ height: 2 }} />
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Milestones unlocked</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {[
          { icon: "🔥", title: "7-day streak", date: "March 15" },
          { icon: "🏆", title: "10 kg saved", date: "March 28" },
        ].map((m) => (
          <div key={m.title} style={{ ...styles.card, marginBottom: 0 }}>
            <p style={{ margin: 0, fontSize: "22px" }}>{m.icon}</p>
            <p style={{ margin: "8px 0 2px", fontWeight: "800" }}>{m.title}</p>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: "13px" }}>{m.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactDetails({ onBack }) {
  const equivalents = [
    { title: "Driving", value: "12 km", sub: "in a car" },
    { title: "Charging", value: "280", sub: "smartphones" },
    { title: "Powering", value: "2.3 hours", sub: "of TV" },
    { title: "Growing", value: "0.1", sub: "tree seedlings" },
  ];

  const breakdown = [
    { icon: "🚲", title: "Transport", sub: "Biked 4 days this week", kg: 1.2, color: theme.green },
    { icon: "🥗", title: "Food", sub: "2 vegetarian days", kg: 0.8, color: "#f0a040" },
  ];
  const maxKg = Math.max(...breakdown.map((b) => b.kg));

  return (
    <div style={{ ...styles.screen, paddingBottom: "24px" }}>
      <TopBar title="Impact details" onBack={onBack} />

      <div style={{ ...styles.card, padding: "18px 16px" }}>
        <p style={{ margin: 0, color: theme.textMuted, fontSize: "14px" }}>Total CO₂ saved</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={{ margin: "8px 0 0", fontSize: "56px", fontWeight: "900", letterSpacing: "-1px" }}>2.3 kg</p>
          <p style={{ margin: 0, color: theme.textMuted, fontSize: "16px" }}>This week</p>
        </div>
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>That's equivalent to...</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {equivalents.map((e) => (
          <div key={e.title} style={{ ...styles.card, marginBottom: 0 }}>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: "14px" }}>{e.title}</p>
            <p style={{ margin: "10px 0 2px", fontSize: "34px", fontWeight: "900", letterSpacing: "-0.5px" }}>{e.value}</p>
            <p style={{ margin: 0, color: theme.textMuted, fontSize: "14px" }}>{e.sub}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "18px 0 12px" }}>Breakdown by habit</h2>
      {breakdown.map((b) => (
        <div key={b.title} style={{ ...styles.card, display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: theme.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>
            {b.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <p style={{ margin: 0, fontWeight: "900", fontSize: "18px" }}>{b.title}</p>
                <p style={{ margin: "2px 0 10px", color: theme.textMuted, fontSize: "13px" }}>{b.sub}</p>
              </div>
              <p style={{ margin: 0, fontWeight: "900", fontSize: "26px", color: b.color }}>{b.kg.toFixed(1)} kg</p>
            </div>
            <ProgressBar value={b.kg} max={maxKg} color={b.color} />
            <p style={{ margin: "8px 0 0", color: theme.textMuted, fontSize: "12px" }}>{Math.round((b.kg / 2.3) * 100)}% of total impact</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile({ onOpenAchievements, onOpenCommunity, onOpenMonthReview }) {
  return (
    <div style={styles.screen}>
      <h2 style={{ textAlign: "center", fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>Profile</h2>
      <div style={{ ...styles.card, display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: theme.green, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }}>AS</div>
        <div>
          <p style={{ fontWeight: "700", margin: "0 0 2px", fontSize: "17px" }}>Alex Smith</p>
          <p style={{ color: theme.textMuted, margin: "0 0 2px", fontSize: "13px" }}>Environmental Science</p>
          <p style={{ color: theme.textMuted, margin: 0, fontSize: "13px" }}>🎓 Copenhagen University</p>
        </div>
      </div>

      <h3 style={{ margin: "18px 0 12px" }}>Your impact</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        {[["Total CO₂ saved", "18.4 kg"], ["Days logged", "23"], ["Longest streak", "7 days"], ["Eco points", "247"]].map(([label, val]) => (
          <div key={label} style={{ ...styles.card, margin: 0 }}>
            <p style={{ color: theme.textMuted, fontSize: "12px", margin: "0 0 6px" }}>{label}</p>
            <p style={{ fontWeight: "700", fontSize: "22px", margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>

      <h3 style={{ margin: "0 0 12px" }}>More</h3>
      <PressRow icon="🏅" title="Achievements" subtitle="Unlocked badges and eco points" onClick={onOpenAchievements} />
      <PressRow icon="👥" title="Community" subtitle="Campus leaderboard and challenges" onClick={onOpenCommunity} />
      <PressRow icon="🗓️" title="Monthly review" subtitle="Your March highlights" onClick={onOpenMonthReview} />

      <h3 style={{ margin: "8px 0 12px" }}>Preferences</h3>
      {[["Daily reminders", "Get notified at 6:00 PM"], ["Weekly reports", "Every Monday morning"]].map(([title, sub]) => (
        <div key={title} style={{ ...styles.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: "500" }}>{title}</p>
            <p style={{ color: theme.textMuted, margin: 0, fontSize: "12px" }}>{sub}</p>
          </div>
          <div style={{ width: 48, height: 26, borderRadius: "13px", background: theme.green, position: "relative" }}>
            <div style={{ position: "absolute", right: "3px", top: "3px", width: 20, height: 20, borderRadius: "50%", background: "#fff" }} />
          </div>
        </div>
      ))}
      <p style={{ marginTop: "20px", color: theme.textMuted, cursor: "pointer", fontSize: "15px" }}>Sign out</p>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

const NAV = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "insights", icon: "📊", label: "Insights" },
  { id: "tips", icon: "💡", label: "Tips" },
  { id: "profile", icon: "👤", label: "Profile" },
];

function PhoneShell({ children }) {
  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={styles.phone}>
        {/* Status bar removed */}
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("splash");
  const [nav, setNav] = useState("home");

  if (page === "splash") {
    return (
      <PhoneShell>
        <Splash onStart={() => setPage("setup")} />
      </PhoneShell>
    );
  }

  if (page === "setup") {
    return (
      <PhoneShell>
        <Setup onDone={() => setPage("main")} />
      </PhoneShell>
    );
  }

  if (page === "log") {
    return (
      <PhoneShell>
        <LogToday onSave={() => setPage("saved")} />
      </PhoneShell>
    );
  }

  if (page === "saved") {
    return (
      <PhoneShell>
        <Saved onBack={() => setPage("main")} />
      </PhoneShell>
    );
  }

  if (page === "achievements") {
    return (
      <PhoneShell>
        <Achievements onBack={() => setPage("main")} />
      </PhoneShell>
    );
  }

  if (page === "community") {
    return (
      <PhoneShell>
        <Community onBack={() => setPage("main")} />
      </PhoneShell>
    );
  }

  if (page === "monthReview") {
    return (
      <PhoneShell>
        <MonthReview onBack={() => setPage("main")} />
      </PhoneShell>
    );
  }

  if (page === "impactDetails") {
    return (
      <PhoneShell>
        <ImpactDetails onBack={() => setPage("main")} />
      </PhoneShell>
    );
  }

  // Main with nav
  const screens = {
    home: <Home onLog={() => setPage("log")} onImpactDetails={() => setPage("impactDetails")} />,
    insights: <Insights />,
    tips: <Tips />,
    profile: (
      <Profile
        onOpenAchievements={() => setPage("achievements")}
        onOpenCommunity={() => setPage("community")}
        onOpenMonthReview={() => setPage("monthReview")}
      />
    ),
  };

  return (
    <PhoneShell>
      {screens[nav]}
      <div style={styles.navBar}>
        {NAV.map(({ id, icon, label }) => (
          <div key={id} style={styles.navItem(nav === id)} onClick={() => setNav(id)}>
            <span style={{ fontSize: "20px" }}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

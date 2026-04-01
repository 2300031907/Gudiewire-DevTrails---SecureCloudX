// ProfilePage.jsx — My ZeroShield Profile page
<<<<<<< HEAD

=======
import styles from './ProfilePage.module.css'
>>>>>>> 351a5d7 (css changes)
export default function ProfilePage({ userData, onClose, onSignOut, onManagePlan }) {

  const name = userData?.name || 'Rahul Sharma';
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 60% at 15% 50%, #0d1f3c 0%, #07090f 55%)',
      fontFamily: 'Sora, sans-serif', color: '#f0f6ff',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 2.5rem',
        borderBottom: '1px solid rgba(99,160,255,0.1)',
        background: 'rgba(5,10,20,0.6)', backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#3b82f6,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', boxShadow:'0 0 16px rgba(59,130,246,0.4)' }}>🛡️</div>
          <span style={{ fontSize:'1.05rem', fontWeight:800, letterSpacing:'.05em', background:'linear-gradient(90deg,#f0f6ff,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ZEROSHIELD</span>
        </div>
        <button onClick={onClose} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, cursor:'pointer', fontSize:'.78rem', fontWeight:600, color:'rgba(240,246,255,0.6)', fontFamily:'Sora,sans-serif', transition:'all .18s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.1)';e.currentTarget.style.borderColor='rgba(59,130,246,0.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}>
          ← Back to Dashboard
        </button>
      </nav>

      {/* ── BODY ── */}
      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: '420px 1fr',
        gap: '2rem', alignItems: 'start',
        maxWidth: 1200, margin: '0 auto', width: '100%',
        padding: '2rem 2.5rem 3rem',
      }}>

        {/* ══ LEFT PANEL ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeUp .45s ease both' }}>

          {/* Profile card */}
          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(99,160,255,0.14)', borderRadius:20, padding:'1.5rem', backdropFilter:'blur(20px)', boxShadow:'0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

            {/* Title */}
            <div style={{ fontSize:'.72rem', fontWeight:700, color:'rgba(240,246,255,0.45)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'1.1rem' }}>
              My ZeroShield Profile
            </div>

            {/* Avatar + name */}
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ width:62, height:62, borderRadius:'50%', background:'linear-gradient(135deg,#3b82f6,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', fontWeight:800, color:'#fff', boxShadow:'0 0 0 3px rgba(59,130,246,0.3), 0 4px 16px rgba(0,0,0,0.3)' }}>
                  {initials}
                </div>
                <div style={{ position:'absolute', bottom:2, right:2, width:14, height:14, borderRadius:'50%', background:'#10b981', border:'2px solid #07090f' }} />
              </div>
              <div>
                <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#f0f6ff', letterSpacing:'-.01em' }}>{name}</div>
                <div style={{ fontSize:'.72rem', color:'rgba(240,246,255,0.4)', marginTop:2 }}>Verify your details</div>
              </div>
            </div>

            {/* ID + Join + Rank */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'.5rem', marginBottom:'1.25rem' }}>
              {[
                { label:'ZEROSHIELD ID', val:'ZS88776655' },
                { label:'Join Date', val:'12 Jan 2024' },
                { label:'Current Rank', val:'Gold', gold:true },
              ].map((item, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(99,160,255,0.1)', borderRadius:10, padding:'.55rem .65rem' }}>
                  <div style={{ fontSize:'.58rem', color:'rgba(240,246,255,0.35)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'.2rem' }}>{item.label}</div>
                  <div style={{ fontSize:'.8rem', fontWeight:700, color: item.gold ? '#fbbf24' : '#f0f6ff', fontFamily: item.val.startsWith('ZS') ? 'JetBrains Mono, monospace' : 'Sora, sans-serif' }}>{item.val}</div>
                </div>
              ))}
            </div>

            {/* Income Protection Summary */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.1)', borderRadius:14, padding:'1rem', marginBottom:'1.1rem' }}>
              <div style={{ fontSize:'.72rem', fontWeight:700, color:'rgba(240,246,255,0.75)', marginBottom:'.75rem' }}>Income Protection Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem', marginBottom:'.75rem' }}>
                <div>
                  <div style={{ fontSize:'.6rem', color:'rgba(240,246,255,0.35)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.2rem' }}>Total Cover</div>
                  <div style={{ fontSize:'.95rem', fontWeight:800, color:'#f0f6ff', fontFamily:'JetBrains Mono, monospace' }}>₹50,000/mo</div>
                </div>
                <div>
                  <div style={{ fontSize:'.6rem', color:'rgba(240,246,255,0.35)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'.2rem' }}>Status</div>
                  <div style={{ fontSize:'.88rem', fontWeight:700, color:'#10b981', display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', display:'inline-block', boxShadow:'0 0 6px #10b981' }} />
                    Fully Protected
                  </div>
                </div>
              </div>
              <div style={{ height:6, background:'rgba(255,255,255,0.07)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ width:'88%', height:'100%', background:'linear-gradient(90deg,#10b981,#22d3ee)', borderRadius:3 }} />
              </div>
            </div>

            {/* Linked Accounts */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.1)', borderRadius:14, padding:'1rem', marginBottom:'1.1rem' }}>
              <div style={{ fontSize:'.72rem', fontWeight:700, color:'rgba(240,246,255,0.75)', marginBottom:'.75rem' }}>Linked Accounts</div>
              <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', alignItems:'center' }}>
                {[
                  { label:'Uber',   bg:'#1c1c1c', text:'Uber' },
                  { label:'Swiggy', bg:'#fc8019', text:'🍊' },
                  { label:'Zomato', bg:'#e23744', text:'zomato', wide:true },
                  { label:'Ola',    bg:'#f59e0b', text:'⊙' },
                ].map((p, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ height:34, minWidth:p.wide?60:34, padding:'0 .5rem', borderRadius:9, background:p.bg, border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.7rem', fontWeight:700, color:'#fff', fontFamily:'Sora,sans-serif' }}>{p.text}</div>
                    {(i === 0 || i === 2) && (
                      <span style={{ fontSize:'.62rem', fontWeight:600, color:'#10b981', display:'flex', alignItems:'center', gap:3 }}>
                        <span style={{ width:14, height:14, borderRadius:'50%', background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.55rem' }}>✓</span>
                        Verified
                      </span>
                    )}
                    {(i === 1 || i === 3) && (
                      <span style={{ width:16, height:16, borderRadius:'50%', background:'rgba(16,185,129,0.18)', border:'1px solid rgba(16,185,129,0.35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', color:'#10b981' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
              <button onClick={onManagePlan} style={{ width:'100%', padding:'.85rem', background:'linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)', border:'none', borderRadius:12, fontSize:'.9rem', fontWeight:800, color:'#020e1f', cursor:'pointer', fontFamily:'Sora,sans-serif', boxShadow:'0 6px 24px rgba(34,211,238,0.3)', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 10px 32px rgba(34,211,238,0.42)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 24px rgba(34,211,238,0.3)';}}>
                Manage Protection Plan
              </button>
              <button style={{ width:'100%', padding:'.85rem', background:'rgba(255,255,255,0.04)', border:'1.5px solid rgba(99,160,255,0.2)', borderRadius:12, fontSize:'.9rem', fontWeight:700, color:'rgba(240,246,255,0.75)', cursor:'pointer', fontFamily:'Sora,sans-serif', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(59,130,246,0.4)';e.currentTarget.style.color='#f0f6ff';e.currentTarget.style.background='rgba(59,130,246,0.07)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(99,160,255,0.2)';e.currentTarget.style.color='rgba(240,246,255,0.75)';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}>
                Link New Gig Account
              </button>
            </div>

            {/* Footer links */}
            <div style={{ display:'flex', justifyContent:'center', gap:'1rem', marginTop:'1rem', fontSize:'.68rem', color:'rgba(240,246,255,0.3)' }}>
              {['Account Settings', 'Contact Support'].map((l, i) => (
                <span key={l} style={{ cursor:'pointer', transition:'color .18s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='rgba(240,246,255,0.65)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(240,246,255,0.3)'}>
                  {i > 0 && <span style={{ marginRight:'1rem', opacity:.5 }}>|</span>}
                  {l}
                </span>
              ))}
              <span style={{ opacity:.5 }}>|</span>
              <span onClick={onSignOut} style={{ cursor:'pointer', color:'rgba(239,68,68,0.6)', transition:'color .18s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#ef4444'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(239,68,68,0.6)'}>
                Log Out
              </span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem', animation:'fadeIn .55s ease .1s both' }}>

          {/* Illustration */}
          <div style={{ position:'relative', height:320, borderRadius:24, overflow:'hidden', background:'radial-gradient(ellipse 90% 80% at 60% 45%, rgba(255,175,80,0.2) 0%, rgba(255,120,30,0.08) 50%, transparent 75%)' }}>
            {/* Sky */}
            <div style={{ position:'absolute', top:'8%', right:'14%', width:80, height:80, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,210,60,0.7) 0%, rgba(255,160,30,0.3) 50%, transparent 70%)' }} />
            {/* Clouds */}
            {[[20,'7%',52,28],[40,'3%',38,22]].map(([right,top,w,h],i)=>(
              <div key={i} style={{ position:'absolute', right:`${right}%`, top, width:w, height:h, borderRadius:20, background:'rgba(255,255,255,0.65)', filter:'blur(2px)' }} />
            ))}
            {/* City */}
            <svg style={{ position:'absolute', bottom:0, left:0, right:0, width:'100%', height:'50%', opacity:.15 }} viewBox="0 0 500 160" preserveAspectRatio="xMidYMax meet">
              {[[20,30,40,130],[70,50,55,110],[135,20,35,140],[180,60,60,100],[310,25,50,135],[370,50,45,110],[425,35,40,125]].map(([x,y,w,h],i)=>(
                <rect key={i} x={x} y={y} width={w} height={h} fill="#c8d8f0"/>
              ))}
            </svg>
            {/* Scooter */}
            <div style={{ position:'absolute', bottom:'5%', left:'50%', transform:'translateX(-50%)', fontSize:'9rem', lineHeight:1, filter:'drop-shadow(0 12px 40px rgba(34,211,238,0.2))', animation:'float 3.5s ease-in-out infinite', zIndex:2 }}>🛵</div>
            {/* Floating icons */}
            {[
              { icon:'🍊', bg:'#fc8019', top:'20%', left:'8%',  delay:'0s' },
              { icon:'🚗', bg:'#1c1c1c', top:'45%', left:'5%',  delay:'.35s' },
              { icon:'🛵', bg:'#e23744', top:'62%', left:'10%', delay:'.7s' },
              { icon:'🟡', bg:'#1c2b33', top:'30%', right:'38%',delay:'.5s' },
            ].map((p,i)=>(
              <div key={i} style={{ position:'absolute', top:p.top, left:p.left, right:p.right, width:42, height:42, borderRadius:12, background:p.bg, border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.05rem', animation:`float ${3+i*0.4}s ease-in-out infinite ${p.delay}`, boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>{p.icon}</div>
            ))}
            {/* Linked accounts badge */}
            <div style={{ position:'absolute', top:'6%', right:'4%', background:'rgba(255,255,255,0.9)', borderRadius:14, padding:'.65rem .75rem', backdropFilter:'blur(10px)', boxShadow:'0 8px 28px rgba(0,0,0,0.2)', animation:'fadeUp .5s ease .2s both' }}>
              <div style={{ fontSize:'.58rem', fontWeight:700, color:'#374151', marginBottom:'.45rem', display:'flex', alignItems:'center', gap:5 }}>
                Linked Accounts
                <span style={{ width:14, height:14, borderRadius:'50%', background:'#10b981', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.5rem', color:'#fff' }}>✓</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:5 }}>
                {[{bg:'#1c1c1c',t:'Uber'},{bg:'#fc8019',t:'🍊'},{bg:'#e23744',t:'Z'}].map((b,i)=>(
                  <div key={i} style={{ width:28, height:28, borderRadius:8, background:b.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.65rem', fontWeight:700, color:'#fff', fontFamily:'Sora,sans-serif', position:'relative' }}>
                    {b.t}
                    <span style={{ position:'absolute', bottom:-2, right:-2, width:10, height:10, borderRadius:'50%', background:'#10b981', border:'1.5px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.4rem', color:'#fff' }}>✓</span>
                  </div>
                ))}
                {[{bg:'#e23744',t:'zomato',wide:true},{bg:'#f59e0b',t:'⊙'}].map((b,i)=>(
                  <div key={i} style={{ height:28, borderRadius:8, background:b.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.62rem', fontWeight:700, color:'#fff', fontFamily:'Sora,sans-serif', padding:'0 6px', gridColumn:b.wide?'span 2':'span 1', position:'relative' }}>
                    {b.t}
                    <span style={{ position:'absolute', bottom:-2, right:-2, width:10, height:10, borderRadius:'50%', background:'#10b981', border:'1.5px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.4rem', color:'#fff' }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Profile verified badge */}
            <div style={{ position:'absolute', bottom:'28%', right:'4%', background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:8, padding:'4px 10px', fontSize:'.62rem', color:'#10b981', fontWeight:600, backdropFilter:'blur(8px)' }}>
              Profile: Active &amp; Verified
            </div>
          </div>

          {/* Bank Details card */}
          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(99,160,255,0.13)', borderRadius:18, padding:'1.25rem', backdropFilter:'blur(20px)' }}>
            <div style={{ fontSize:'.78rem', fontWeight:700, color:'rgba(240,246,255,0.8)', marginBottom:'1rem' }}>Bank Details</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.65rem' }}>
              {[
                { label:'Bank Name', val: userData?.bank?.bank || 'SBI – State Bank of India' },
                { label:'Account Number', sub:'Last 4 digits: ****6789', val:'****  ****  ****  6789', mono:true },
                { label:'IFSC Code', val: userData?.bank?.ifsc || 'SBIN0001234' },
                { label:'Primary Account', val:'Yes ✓', green:true },
              ].map((row, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'.5rem .65rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.08)', borderRadius:10 }}>
                  <div>
                    <div style={{ fontSize:'.65rem', color:'rgba(240,246,255,0.4)', marginBottom:'.1rem' }}>{row.label}</div>
                    {row.sub && <div style={{ fontSize:'.58rem', color:'rgba(240,246,255,0.3)' }}>{row.sub}</div>}
                  </div>
                  <div style={{ fontFamily: row.mono ? 'JetBrains Mono, monospace' : 'Sora, sans-serif', fontSize:'.78rem', fontWeight:600, color: row.green ? '#10b981' : 'rgba(240,246,255,0.7)' }}>{row.val}</div>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:'.85rem', padding:'.65rem', background:'rgba(59,130,246,0.1)', border:'1.5px solid rgba(59,130,246,0.25)', borderRadius:10, fontSize:'.78rem', fontWeight:700, color:'var(--blue2,#60a5fa)', cursor:'pointer', fontFamily:'Sora,sans-serif', transition:'all .18s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.18)';e.currentTarget.style.borderColor='rgba(59,130,246,0.45)';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(59,130,246,0.1)';e.currentTarget.style.borderColor='rgba(59,130,246,0.25)';}}>
              Link / Update Bank Account
            </button>
          </div>

          {/* Payment History card */}
          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(99,160,255,0.13)', borderRadius:18, padding:'1.25rem', backdropFilter:'blur(20px)' }}>
            <div style={{ fontSize:'.78rem', fontWeight:700, color:'rgba(240,246,255,0.8)', marginBottom:'1rem' }}>Payment History</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.55rem' }}>
              {[
                { bank: userData?.bank?.bank || 'SBI Bank', date:'12 Jan 2024', amt:'₹5,000', status:'Paid' },
                { bank: userData?.bank?.bank || 'SBI Bank', date:'12 Dec 2023', amt:'₹5,000', status:'Paid' },
                { bank: userData?.bank?.bank || 'SBI Bank', date:'12 Nov 2023', amt:'₹4,200', status:'Paid' },
              ].map((p, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.6rem .75rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.08)', borderRadius:10 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'.75rem', fontWeight:600, color:'rgba(240,246,255,0.75)' }}>Payment to {p.bank}</div>
                    <div style={{ fontSize:'.62rem', color:'rgba(240,246,255,0.35)', marginTop:2 }}>Status: <span style={{ color:'rgba(240,246,255,0.5)' }}>Completed</span></div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'.8rem', fontWeight:700, color:'#f0f6ff' }}>{p.amt}</div>
                    <div style={{ fontSize:'.62rem', color:'#10b981', marginTop:2, display:'flex', alignItems:'center', gap:3, justifyContent:'flex-end' }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:'#10b981', display:'inline-block' }} />
                      {p.status}
                    </div>
                  </div>
                  <div style={{ fontSize:'.62rem', color:'rgba(240,246,255,0.3)', fontFamily:'JetBrains Mono, monospace', flexShrink:0 }}>{p.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
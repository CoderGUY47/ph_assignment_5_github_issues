function getPriorityBadgeHTML(priority) {
  const p = priority.toLowerCase();
  if (p === "high") {
    return `<span class="flex justify-center py-1 w-20 text-[10px] rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 uppercase font-black tracking-wider">High</span>`;
  } else if (p === "medium") {
    return `<span class="flex justify-center py-1 w-20 text-[10px] rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase font-black tracking-wider">Medium</span>`;
  } else if (p === "low") {
    return `<span class="flex justify-center py-1 w-20 text-[10px] rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 uppercase font-black tracking-wider">Low</span>`;
  }
}

function getLabelHTML(label) {
  const l = label.toLowerCase();
  if (l === "bug") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 uppercase tracking-wider">
      <i class="fa-solid fa-bug text-[12px]"></i> Bug
    </span>`;
  } else if (l === "help wanted") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
      <i class="fa-solid fa-life-ring text-[12px]"></i> Help Wanted
    </span>`;
  } else if (l === "enhancement") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider">
      <i class="fa-solid fa-wand-magic-sparkles text-[12px]"></i> Enhancement
    </span>`;
  } else if (l === "documentation") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wider">
      <i class="fa-solid fa-file-lines text-[12px]"></i> Documentation
    </span>`;
  } else if (l === "good first issue") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wider">
      <i class="fa-solid fa-star text-[12px]"></i> Good First Issue
    </span>`;
  }
  return `
  <span class="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 uppercase tracking-wider">
    ${label}
  </span>`;
}

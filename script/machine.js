function getPriorityBadgeHTML(priority) {
  const p = priority.toLowerCase();
  if (p === "high") {
    return `<span class="flex justify-center py-1 w-20 text-xs rounded-full bg-red-100 text-red-500 uppercase font-medium">High</span>`;
  } else if (p === "medium") {
    return `<span class="flex justify-center py-1 w-20 text-xs rounded-full bg-orange-100 text-orange-500 uppercase font-medium">Medium</span>`;
  } else if (p === "low") {
    return `<span class="flex justify-center py-1 w-20 text-xs rounded-full bg-gray-100 text-gray-400 uppercase font-medium">Low</span>`;
  }
}

function getLabelHTML(label) {
  const l = label.toLowerCase();
  if (l === "bug") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-red-50 border border-red-200 text-red-500 uppercase">
      <i class="fa-solid fa-bug"></i> Bug
    </span>`;
  } else if (l === "help wanted") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-amber-50 border border-amber-200 text-amber-600 uppercase">
      <i class="fa-solid fa-life-ring"></i> Help Wanted
    </span>`;
  } else if (l === "enhancement") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-green-50 border border-green-200 text-[#00A96E] uppercase">
      <i class="fa-solid fa-wand-magic-sparkles"></i> Enhancement
    </span>`;
  } else if (l === "documentation") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-blue-50 border border-blue-200 text-blue-600 uppercase">
      <i class="fa-solid fa-file-lines"></i> Documentation
    </span>`;
  } else if (l === "good first issue") {
    return `
    <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 uppercase">
      <i class="fa-solid fa-star"></i> Good First Issue
    </span>`;
  }
  return `
  <span class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-gray-50 border border-gray-200 text-gray-500 uppercase">
    ${label}
  </span>`;
}

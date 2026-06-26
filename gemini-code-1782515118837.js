// Complete Data Set Array Definition
const inventoryData = [
    { id: 'item-1', category: 'Medical/Specifics', desc: 'Epipen for Madeline', isMed: true },
    { id: 'item-2', category: 'Medical/Specifics', desc: 'Epipen for Ben', isMed: true },
    { id: 'item-3', category: 'Medical/Specifics', desc: 'Inhaler for Madeline', isMed: true },
    { id: 'item-4', category: 'Medical/Specifics', desc: '5-Day supply of Zoloft for Peter', isMed: true },
    { id: 'item-5', category: 'Medical/Specifics', desc: '5-Day supply of Welbutrin for Peter', isMed: true },
    { id: 'item-6', category: 'Medical/Specifics', desc: '5-Day supply of Vyvanse for Peter', isMed: true },
    { id: 'item-7', category: 'Medical/Specifics', desc: '5-Day supply of Vyvanse for Vicky', isMed: true },
    { id: 'item-8', category: 'Medical/Specifics', desc: 'Ollie Supply: 5-Day dog food allocation & tactical small backpack', isMed: true },
    { id: 'item-9', category: 'Essentials', desc: 'Water (1 gallon per person/pet per day for 3 days minimum)', isMed: false },
    { id: 'item-10', category: 'Essentials', desc: 'Non-perishable protein bars and select vacuum-packed canned options', isMed: false },
    { id: 'item-11', category: 'Essentials', desc: 'Heavy-duty manual can opener tool', isMed: false },
    { id: 'item-12', category: 'Tools/Comfort', desc: 'High-lumen LED flashlight with additional spare battery cells', isMed: false },
    { id: 'item-13', category: 'Tools/Comfort', desc: 'Crank or battery-powered emergency NOAA Weather Radio system', isMed: false },
    { id: 'item-14', category: 'Tools/Comfort', desc: 'Multi-tool / Swiss Army utility knife set', isMed: false },
    { id: 'item-15', category: 'Tools/Comfort', desc: 'Sanitary wet wipes, heavy garbage storage bags, and locking plastic ties', isMed: false },
    { id: 'item-16', category: 'Documents', desc: 'Waterproof protective binder containing verified IDs, financial records, insurance line paperwork', isMed: false }
];

let currentFilter = 'all';

// Initialize and pull state data out of localized device cache storage
document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    renderChecklist();
    calculateProgress();
});

function initLocalStorage() {
    inventoryData.forEach(item => {
        if (localStorage.getItem(item.id) === null) {
            localStorage.setItem(item.id, 'false');
        }
    });
}

function renderChecklist() {
    const tableBody = document.getElementById('checklist-table-body');
    tableBody.innerHTML = '';

    const filteredData = inventoryData.filter(item => {
        if (currentFilter === 'med') return item.isMed === true;
        return true;
    });

    filteredData.forEach(item => {
        const isChecked = localStorage.getItem(item.id) === 'true';
        
        const row = document.createElement('tr');
        row.className = `hover:bg-slate-50/80 transition-colors ${isChecked ? 'bg-emerald-50/10' : ''}`;
        
        row.innerHTML = `
            <td class="p-4 text-center">
                <input type="checkbox" 
                       id="${item.id}" 
                       ${isChecked ? 'checked' : ''} 
                       onchange="toggleItem('${item.id}')"
                       class="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer transition">
            </td>
            <td class="p-4 font-medium text-xs tracking-wider uppercase ${item.isMed ? 'text-amber-600' : 'text-slate-400'}">
                ${item.category}
            </td>
            <td class="p-4 text-slate-700 font-medium text-sm ${isChecked ? 'line-through text-slate-400 font-normal' : ''}">
                ${item.desc}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

window.toggleItem = function(id) {
    const currentValue = localStorage.getItem(id);
    localStorage.setItem(id, currentValue === 'true' ? 'false' : 'true');
    renderChecklist();
    calculateProgress();
};

window.filterChecklist = function(filterType) {
    currentFilter = filterType;
    
    const btnAll = document.getElementById('btn-all');
    const btnMed = document.getElementById('btn-med');
    
    if (filterType === 'all') {
        btnAll.className = "px-3 py-1.5 text-xs font-semibold rounded-md bg-accent-navy text-white transition";
        btnMed.className = "px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition";
    } else {
        btnAll.className = "px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition";
        btnMed.className = "px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-600 text-white transition";
    }
    
    renderChecklist();
};

function calculateProgress() {
    let checkedCount = 0;
    inventoryData.forEach(item => {
        if (localStorage.getItem(item.id) === 'true') {
            checkedCount++;
        }
    });
    
    const percent = inventoryData.length > 0 ? Math.round((checkedCount / inventoryData.length) * 100) : 0;
    document.getElementById('global-progress').innerText = `${percent}%`;
}
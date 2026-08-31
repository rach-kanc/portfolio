import { supabase } from '../../config/supabase.js';
import { api } from '../../services/api.js';
import { storage } from '../../services/storage.js';

let currentType = '';
let currentEditId = null;

const schema = {
    project: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug (URL friendly)', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'type', label: 'Type', type: 'select', options: ['Open Source', 'Personal', 'Teamwork', 'General'] },
        { name: 'status', label: 'Status (e.g. Completed)', type: 'text' },
        { name: 'short_description', label: 'Short Description', type: 'text' },
        { name: 'full_description', label: 'Full Description', type: 'textarea' },
        { name: 'problem_statement', label: 'Problem Statement', type: 'textarea' },
        { name: 'objective', label: 'Objective', type: 'textarea' },
        { name: 'features', label: 'Features (JSON Array format, e.g. ["Feat 1", "Feat 2"])', type: 'text' },
        { name: 'tech_stack', label: 'Tech Stack (JSON Array format)', type: 'text' },
        { name: 'github_url', label: 'GitHub URL', type: 'text' },
        { name: 'live_demo', label: 'Live Demo URL', type: 'text' },
        { name: 'thumbnail', label: 'Thumbnail Image', type: 'file' },
        { name: 'architecture_image', label: 'Architecture Image', type: 'file' },
        { name: 'featured', label: 'Featured? (true/false)', type: 'text' },
        { name: 'display_order', label: 'Display Order', type: 'number' },
        { name: 'start_date', label: 'Start Date', type: 'date' },
        { name: 'end_date', label: 'End Date', type: 'date' },
        { name: 'team_size', label: 'Team Size', type: 'number' },
        { name: 'my_role', label: 'My Role', type: 'text' }
    ],
    skill: [
        { name: 'name', label: 'Skill Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'icon', label: 'Icon (URL or SVG/FontAwesome class)', type: 'text' },
        { name: 'display_order', label: 'Display Order', type: 'number' },
        { name: 'proficiency', label: 'Proficiency (1-100)', type: 'number' }
    ],
    cert: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'datalist', options: ['Hackathons & Tech Events', 'Courses', 'Bootcamps', 'Memberships', 'General'], required: true },
        { name: 'issuer', label: 'Issuer', type: 'text' },
        { name: 'issue_date', label: 'Issue Date', type: 'date' },
        { name: 'credential_id', label: 'Credential ID', type: 'text' },
        { name: 'credential_url', label: 'Credential URL', type: 'text' },
        { name: 'certificate_image', label: 'Certificate Image', type: 'file' },
        { name: 'featured', label: 'Featured? (true/false)', type: 'text' },
        { name: 'tags', label: 'Tags (JSON Array format)', type: 'text' },
        { name: 'display_order', label: 'Display Order', type: 'number' }
    ],
    leadership: [
        { name: 'organization', label: 'Organization', type: 'text', required: true },
        { name: 'position', label: 'Position', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'start_date', label: 'Start Date', type: 'date' },
        { name: 'end_date', label: 'End Date (Leave blank if ongoing)', type: 'date' },
        { name: 'logo', label: 'Logo Image', type: 'file' },
        { name: 'priority', label: 'Priority Order', type: 'number' }
    ],
    event: [
        { name: 'event_name', label: 'Event Name', type: 'text', required: true },
        { name: 'type', label: 'Type (e.g., Hackathon, Conference)', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'organizer', label: 'Organizer', type: 'text' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'certificate', label: 'Certificate Image', type: 'file' }
    ]
};

document.addEventListener('DOMContentLoaded', async () => {
    // Check Auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
        return;
    }

    // Tabs logic
    const navBtns = document.querySelectorAll('.nav-btn[data-target]');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = 'login.html';
    });

    // Form Submit
    document.getElementById('admin-form').addEventListener('submit', handleFormSubmit);

    // Initial Load
    await loadData();
});

async function loadData() {
    const [projects, skills, certs, leadership, events] = await Promise.all([
        api.getProjects(), api.getSkills(), api.getCertificates(), api.getLeadership(), api.getEvents()
    ]);

    renderTable('projects', projects, p => `<td>${p.title}</td><td>${p.category || ''}</td>`);
    renderTable('skills', skills, s => `<td>${s.name}</td><td>${s.category}</td>`);
    renderTable('certs', certs, c => `<td>${c.title}</td><td>${c.issuer || ''}</td><td>${c.category || 'General'}</td>`);
    renderTable('leadership', leadership, l => `<td>${l.position}</td><td>${l.organization}</td>`);
    renderTable('events', events, e => `<td>${e.event_name}</td><td>${e.role || ''}</td>`);
}

function renderTable(type, data, rowHtmlFn) {
    const tbody = document.getElementById(`${type}-tbody`);
    if (!tbody) return;
    tbody.innerHTML = (data || []).map(item => `
        <tr>
            ${rowHtmlFn(item)}
            <td>
                <button class="action-btn edit-btn" onclick="window.editItem('${type}', '${item.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="window.deleteItem('${type}', '${item.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
    
    // Store data globally for editing
    window[`${type}Data`] = data;
}

window.openModal = function(type, item = null) {
    currentType = type;
    currentEditId = item ? item.id : null;
    
    document.getElementById('modal-title').textContent = item ? `Edit ${type}` : `Add ${type}`;
    
    const fields = schema[type];
    const formFields = document.getElementById('form-fields');
    formFields.innerHTML = fields.map(f => {
        let val = item ? (item[f.name] || '') : '';
        if (f.name === 'features' || f.name === 'tech_stack') {
            val = val ? JSON.stringify(val) : '';
        }
        
        let inputHtml = '';
        if (f.type === 'textarea') {
            inputHtml = `<textarea id="${f.name}" name="${f.name}" ${f.required ? 'required' : ''} rows="4">${val}</textarea>`;
        } else if (f.type === 'file') {
            inputHtml = `<input type="file" id="${f.name}" name="${f.name}">
                         ${val ? `<small>Current: <a href="${val}" target="_blank" style="color:var(--text-main)">View</a></small>` : ''}`;
        } else if (f.type === 'select') {
            inputHtml = `<select id="${f.name}" name="${f.name}" ${f.required ? 'required' : ''}>
                ${(f.options || []).map(opt => `<option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>`;
        } else if (f.type === 'datalist') {
            const listId = `${f.name}-list`;
            inputHtml = `<input type="text" id="${f.name}" name="${f.name}" value="${val.toString().replace(/"/g, '&quot;')}" list="${listId}" ${f.required ? 'required' : ''}>
            <datalist id="${listId}">
                ${(f.options || []).map(opt => `<option value="${opt}"></option>`).join('')}
            </datalist>`;
        } else {
            inputHtml = `<input type="${f.type}" id="${f.name}" name="${f.name}" value="${val.toString().replace(/"/g, '&quot;')}" ${f.required ? 'required' : ''}>`;
        }
        
        return `<div class="form-group">
            <label for="${f.name}">${f.label}</label>
            ${inputHtml}
        </div>`;
    }).join('');

    document.getElementById('admin-modal').classList.remove('hidden');
};

window.closeModal = function() {
    document.getElementById('admin-modal').classList.add('hidden');
};

window.editItem = function(tab, id) {
    const typeMap = { projects: 'project', skills: 'skill', certs: 'cert', leadership: 'leadership', events: 'event' };
    const type = typeMap[tab];
    const dataList = window[`${tab}Data`];
    const item = dataList.find(i => i.id === id);
    if (item) window.openModal(type, item);
};

window.deleteItem = async function(tab, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const tableMap = { projects: 'projects', skills: 'skills', certs: 'certificates', leadership: 'leadership', events: 'events' };
    const tableName = tableMap[tab];

    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) {
        alert('Error deleting item: ' + error.message);
    } else {
        await loadData();
    }
};

async function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    try {
        const formData = new FormData(e.target);
        const data = {};
        const fields = schema[currentType];

        for (const f of fields) {
            let val = formData.get(f.name);
            
            if (f.type === 'file') {
                if (val && val.size > 0) {
                    const url = await storage.uploadFile(`${currentType}s`, val);
                    if (url) data[f.name] = url;
                }
            } else if (f.name === 'features' || f.name === 'tech_stack' || f.name === 'tags') {
                if (val) {
                    try { data[f.name] = JSON.parse(val); } 
                    catch (e) { alert(`Invalid JSON format for ${f.label}`); throw e; }
                }
            } else if (f.name === 'featured') {
                data[f.name] = val.toLowerCase() === 'true';
            } else {
                if (val) data[f.name] = val;
                else if (!f.required) data[f.name] = null;
            }
        }

        const tableMap = { project: 'projects', skill: 'skills', cert: 'certificates', leadership: 'leadership', event: 'events' };
        const tableName = tableMap[currentType];

        if (currentEditId) {
            const { error } = await supabase.from(tableName).update(data).eq('id', currentEditId);
            if (error) throw error;
        } else {
            const { error } = await supabase.from(tableName).insert([data]);
            if (error) throw error;
        }

        window.closeModal();
        await loadData();
    } catch (error) {
        console.error(error);
        if (error.message) alert('Error saving: ' + error.message);
    } finally {
        btn.textContent = 'Save';
    }
}

// Reorder Logic
let sortableInstance = null;

window.openReorderModal = function() {
    const list = document.getElementById('reorder-list');
    list.innerHTML = (window.certsData || [])
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map(c => `<li data-id="${c.id}" style="padding: 1rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: grab; display:flex; justify-content:space-between;">
            <span><strong>${c.title}</strong></span>
            <span style="color:var(--text-secondary); font-size: 0.85rem;">[${c.category || 'General'}]</span>
        </li>`).join('');

    if (sortableInstance) {
        sortableInstance.destroy();
    }
    
    sortableInstance = new Sortable(list, {
        animation: 150,
        ghostClass: 'sortable-ghost'
    });

    document.getElementById('reorder-modal').classList.remove('hidden');
};

window.closeReorderModal = function() {
    document.getElementById('reorder-modal').classList.add('hidden');
};

window.saveReorder = async function() {
    const btn = document.getElementById('save-reorder-btn');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    try {
        const listItems = document.querySelectorAll('#reorder-list li');
        const updates = Array.from(listItems).map((li, index) => {
            const certId = li.getAttribute('data-id');
            // Fetch the existing certificate data so upsert doesn't overwrite other fields with nulls if we only send id and display_order. 
            // Wait, supabase .update() doesn't support batch out of the box in JS client without upsert. 
            // Doing individual updates is safer to avoid overwriting missing fields in an upsert if we don't have the full object.
            return supabase.from('certificates').update({ display_order: index }).eq('id', certId);
        });

        await Promise.all(updates);
        
        window.closeReorderModal();
        await loadData();
    } catch (error) {
        console.error(error);
        alert('Error saving order: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Save Order';
    }
};

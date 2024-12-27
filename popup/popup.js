// DOM Elements
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');
const saveStatus = document.getElementById('saveStatus');
const notesList = document.getElementById('notesList');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const toast = document.getElementById('toast');

// Variables
let saveTimeout;
let deleteTimeout;
let notes = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });

    // Note input
    noteInput.addEventListener('input', () => {
        saveStatus.textContent = '';
    });

    // Save button
    saveButton.addEventListener('click', saveNote);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Tab Switching
function switchTab(tabId) {
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    tabContents.forEach(content => {
        content.classList.toggle('hidden', content.id !== tabId);
    });

    if (tabId === 'history') {
        renderNotes();
    }
}

// Note Management
async function saveNote() {
    const content = noteInput.value.trim();
    if (!content) return;

    const note = {
        id: Date.now(),
        content,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        completed: false // Add completion status
    };

    notes.unshift(note);
    await chrome.storage.local.set({ notes });
    
    showSaveStatus();
    noteInput.value = '';
    renderNotes();
}

async function loadNotes() {
    const data = await chrome.storage.local.get('notes');
    notes = data.notes || [];
    renderNotes();
}

function renderNotes() {
    if (notes.length === 0) {
        notesList.innerHTML = `
            <div class="empty-state">
                No notes yet. Click 'Add Note' to create your first note
            </div>
        `;
        return;
    }

    notesList.innerHTML = notes.map(note => `
        <div class="note-item ${note.completed ? 'completed' : ''}" data-id="${note.id}">
            <div class="note-content">
                <span class="text ${note.completed ? 'strikethrough' : ''}">${getPreviewText(note.content)}</span>
            </div>
            <div class="note-timestamp">${formatDate(note.createdAt)}</div>
            <div class="note-actions">
                <button class="action-btn complete-btn" data-id="${note.id}">
                    ${note.completed ? 'S' : 'S̶'}
                </button>
                <button class="action-btn copy-btn" data-id="${note.id}">
                    📋
                </button>
                <button class="action-btn edit-btn" data-id="${note.id}">
                    ✏️
                </button>
                <button class="action-btn delete-btn" data-id="${note.id}">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');

    setupNoteEventListeners();
}

function setupNoteEventListeners() {
    // Complete buttons
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const noteId = parseInt(e.target.dataset.id);
            toggleNoteCompletion(noteId);
        });
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const noteId = parseInt(e.target.dataset.id);
            copyNote(noteId);
        });
    });

    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const noteId = parseInt(e.target.dataset.id);
            editNote(noteId);
        });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const noteId = parseInt(e.target.dataset.id);
            deleteNote(noteId);
        });
    });

    // Make note items focusable for keyboard shortcuts
    document.querySelectorAll('.note-item').forEach(item => {
        item.setAttribute('tabindex', '0');
    });
}

// New Note Operations
async function toggleNoteCompletion(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    note.completed = !note.completed;
    note.modifiedAt = new Date().toISOString();
    
    await chrome.storage.local.set({ notes });
    renderNotes();
}

async function copyNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    try {
        await navigator.clipboard.writeText(note.content);
        showToast('Note copied to clipboard!', 2000);
    } catch (err) {
        showToast('Failed to copy note', 2000);
    }
}

// Note Operations
function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    switchTab('add-note');
    noteInput.value = note.content;
    noteInput.focus();
    
    // Remove the old note
    deleteNote(id, false);
}

async function deleteNote(id, showUndo = true) {
    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex === -1) return;

    const deletedNote = notes.splice(noteIndex, 1)[0];
    await chrome.storage.local.set({ notes });
    renderNotes();

    if (showUndo) {
        showToast('Note deleted. <button onclick="undoDelete()">Undo</button>', 5000);
        window.deletedNote = deletedNote;
        
        if (deleteTimeout) clearTimeout(deleteTimeout);
        deleteTimeout = setTimeout(() => {
            window.deletedNote = null;
        }, 5000);
    }
}

async function undoDelete() {
    if (!window.deletedNote) return;
    
    notes.unshift(window.deletedNote);
    await chrome.storage.local.set({ notes });
    renderNotes();
    hideToast();
    window.deletedNote = null;
}

// Utility Functions
function getPreviewText(content) {
    return content.length > 50 
        ? content.substring(0, 50) + '...'
        : content;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function showSaveStatus() {
    saveStatus.textContent = 'Saved';
    setTimeout(() => {
        saveStatus.textContent = '';
    }, 2000);
}

function showToast(message, duration = 3000) {
    toast.innerHTML = message;
    toast.classList.add('show');
    setTimeout(hideToast, duration);
}

function hideToast() {
    toast.classList.remove('show');
}

function handleKeyboardShortcuts(e) {
    // Save: Ctrl/Cmd + S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveNote();
    }
    
    // Copy: Ctrl/Cmd + C (when note is focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const focusedNote = document.activeElement.closest('.note-item');
        if (focusedNote) {
            e.preventDefault();
            copyNote(parseInt(focusedNote.dataset.id));
        }
    }
    
    // Delete: Delete key (when note is focused)
    if (e.key === 'Delete') {
        const focusedNote = document.activeElement.closest('.note-item');
        if (focusedNote) {
            deleteNote(parseInt(focusedNote.dataset.id));
        }
    }
} 
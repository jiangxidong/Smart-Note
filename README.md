# Smart Note - Chrome Extension

A minimalist Chrome Extension for smart note-taking while browsing. Save, manage, and organize your thoughts with ease.

## Overview
Smart Note is a lightweight Chrome Extension that allows users to quickly jot down notes while browsing the web. With features like auto-save, historical note viewing, and easy editing, it's designed to be both powerful and user-friendly.

## Features
- 📝 Auto-saving notes with visual confirmation
- 📚 Chronological history view of all notes
- ✏️ Inline editing capabilities
- 🗑️ Secure deletion with undo option
- ⌨️ Keyboard shortcuts for power users
- 📋 One-click copy functionality
- ✓ Note completion tracking

## Getting Started
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the project directory

## Project Structure
```
quick-note/
├── manifest.json        # Extension configuration
├── popup/              # Main extension popup
│   ├── popup.html      # Main UI
│   ├── popup.css       # Styles
│   └── popup.js        # Core functionality
├── assets/            # Icons and images
└── README.md          # Documentation
```

## Development
- HTML/CSS/JavaScript-based implementation
- No external dependencies required
- Built with modern JavaScript features

## Requirements

### App Features
1. Save Note
- Notes should auto-save as user types (after 1-second delay of inactivity) to prevent data loss
- Show a subtle "Saved" indicator to confirm changes are preserved
- Allow manual save via keyboard shortcut (Ctrl/Cmd + S) and save button

2. View Historical Notes
- Display notes in reverse chronological order (newest first)
- Show preview of note content (first 50 characters) in the list
- Include timestamp for each note

3. Edit Note
- Enable inline editing directly in the History view
- Auto-focus text input when editing begins
- Maintain original creation timestamp while adding "last modified" timestamp

4. Delete Note
- Require confirmation before deletion to prevent accidents
- Provide brief "Undo Delete" option (5 seconds)
- Support keyboard shortcut (Delete key) for faster workflow

5. Copy Note
- One-click copy functionality with clipboard icon
- Show brief "Copied!" confirmation tooltip
- Copy preserves original text formatting
- Support keyboard shortcut (Ctrl/Cmd + C) when note is focused

6. Complete Note
- Toggle completion status with dedicated button
- Strikethrough styling for completed notes
- Maintain completion status in storage

### App UI
1. Add Note View
- Clean, minimalist interface with focus on the writing area
- Placeholder text in empty input: "Start typing your note..."
- Clear visual hierarchy with adequate spacing
- Save button position: bottom-right of input area
- Keyboard shortcuts listed subtly at bottom

2. History View
- Compact list layout with clear separation between notes
- Each note row shows:
  - First 50 characters of note content
  - Creation date/time
  - Action buttons (complete, copy, edit, delete)
- Empty state message: "No notes yet. Click 'Add Note' to create your first note"
- Smooth transitions between states

3. Common UI Elements
- Consistent tab design with clear active state
- Standardized icon set for actions
- Toast notifications for important actions (save, delete, copy)
- Responsive layout that works well at different sizes
- Optimized spacing for maximum content visibility


I want to develop a Chrome Extension ‘Quick Note’ using JavaScript + HTML + CSS Approach. Below are the requirements:

### App Feature
1. Save Note
- Notes should auto-save as user types (after 1-second delay of inactivity) to prevent data loss
- Show a subtle "Saved" indicator to confirm changes are preserved
- Allow manual save via keyboard shortcut (Ctrl/Cmd + S) and save button

2. View Historical Notes
- Display notes in reverse chronological order (newest first)
- Show preview of note content (first 50 characters) in the list
- Include timestamp for each note
- Implement search/filter functionality for existing notes

3. Edit Note
- Enable inline editing directly in the History view
- Auto-focus text input when editing begins
- Maintain original creation timestamp while adding "last modified" timestamp

4. Delete Note
- Require confirmation before deletion to prevent accidents
- Provide brief "Undo Delete" option (5 seconds)
- Support keyboard shortcut (Delete key) for faster workflow

### App UI
1. Add Note View
- Clean, minimalist interface with focus on the writing area
- Placeholder text in empty input: "Start typing your note..."
- Character count indicator (optional)
- Clear visual hierarchy with adequate spacing
- Save button position: bottom-right of input area
- Keyboard shortcuts listed subtly at bottom

2. History View
- Compact list layout with clear separation between notes
- Each note row shows:
  - First 50 characters of note content
  - Creation date/time (right-aligned)
  - Edit and delete icons (appear on hover)
- Empty state message: "No notes yet. Click 'Add Note' to create your first note"
- Smooth transitions between states

3. Common UI Elements
- Consistent tab design with clear active state
- Standardized icon set for actions (edit, delete)
- Toast notifications for important actions (save, delete)
- Responsive layout that works well at different sizes


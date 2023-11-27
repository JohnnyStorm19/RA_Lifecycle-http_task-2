import { INoteItem } from "../models";
import { NoteItem } from "./NoteItem";

export function NotesContainer({children=[], onDeleteCallback, onRefreshCallback}: {children?: INoteItem[], onDeleteCallback?: (element: React.RefObject<HTMLElement>) => void, onRefreshCallback?: () => void}) {
  return (
    <div className="notes-app">
      <header className="notes-app-header">
        <h1>Notes</h1>
        <button type="button" onClick={onRefreshCallback} className="refresh-btn"></button>
      </header>
      <div className="notes-container">
        {children.map(note => {
            if (onDeleteCallback) {
                return <NoteItem key={note.key} data={note} onDeleteCallback={onDeleteCallback}/>
            }
        })}
      </div>
    </div>
  );
}

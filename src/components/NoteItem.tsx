import { useRef } from "react"
import { INoteItemProps } from "../models";

export function NoteItem({data, onDeleteCallback}: INoteItemProps) {
    const noteRef = useRef(null);

    return (
        <div className="note-container" ref={noteRef} id={data.key}>
            <p className="note-content">{data.content}</p>
            <span className="note-remover" onClick={() => onDeleteCallback(noteRef)}>X</span>
        </div>
    )
}
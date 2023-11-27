import { useState } from "react";
import { ISubmitCallback } from "../models";
import { v4 as uuidv4 } from "uuid";

export function Form({onSubmitCallback}: ISubmitCallback) {
    const uniqueKey = uuidv4();
    const [formData, setFormData] = useState({content:'', key: uniqueKey});

    const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setFormData({
          ...formData,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      };
    

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitCallback(formData);

        setFormData({
            content: "",
            key: uuidv4(),
        });
    
        console.log('after submit: ', formData);
    }

    return (
        <form action="" onSubmit={submitHandler}>
            <textarea 
                name="content" 
                id="textarea" 
                rows={4}
                value={formData.content}
                onChange={handleTextChange}
                required={true}
                placeholder="Type new note here..."
            >

            </textarea>
            <button type="submit" className="submit-btn">
                Send note
            </button>
        </form>
    )
}
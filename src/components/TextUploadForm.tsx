import {Button, TextField} from "@material-ui/core";
import React, {useRef, useState} from "react";
import {useText} from "../use-text";
import {Redirect} from "react-router-dom";


function TextUploadForm(): React.ReactElement {
    const inputRef = useRef(null);
    const {uploadText} = useText();
    const [submitted, setSubmitted] = useState(false)

    function submitForm(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const textarea = form.getElementsByTagName('textarea')[0]
        const text = textarea.value
        if (uploadText) {
            uploadText(text)
            setSubmitted(true)
        }
    }
    return (
        submitted
            ? ( <Redirect to='/' /> )
            : (
            <form className="upload-form" onSubmit={submitForm}>
                <TextField
                    id="user-text"
                    label="Your text"
                    multiline
                    rows={10}
                    ref={inputRef}
                    placeholder="Paste your text here"
                    variant="outlined"
                />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className="upload-button"
                >Load Text</Button>
            </form>
    ))
}
export default TextUploadForm

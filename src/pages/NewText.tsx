import React from 'react';
import TextUploadForm from "../components/TextUploadForm";

function NewText(): React.ReactElement {
  return (
    <div className="App">
      <main className="content">
        <section className="reader">
          <div className="text-container">
            <TextUploadForm />
          </div>
        </section>
      </main>
    </div>
  );
}

export default NewText;

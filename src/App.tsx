import "./App.css";
import { Form } from "./components/Form";
import { NotesContainer } from "./components/NotesContainer";
import { useApp } from "./hooks/useApp";

function App() {
  const {shouldRender, submittedValues, handleDeleteNote, handleRefreshNotes, handleFormSubmit} = useApp();

  return (
    <>
      {shouldRender ? (
        <NotesContainer
          children={submittedValues}
          onDeleteCallback={handleDeleteNote}
          onRefreshCallback={handleRefreshNotes}
        />
      ) : (
        <NotesContainer onRefreshCallback={handleRefreshNotes} />
      )}
      <Form onSubmitCallback={handleFormSubmit} />
    </>
  );
}

export default App;

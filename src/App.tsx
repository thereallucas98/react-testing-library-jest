import Technologies from "./components/Tecnologies";

function App() {
  return (
    <div>
      <h1>Olá mundo!</h1>
      <Technologies initialItems={["React", "Angular", "Vue"]} />
    </div>
  );
}

export default App;

import { FormEvent, useState } from "react";
import approvedLength from "../utils/hasApprovedLength";

type TechnologiesProps = {
  initialItems: string[];
}

function Technologies({ initialItems }: TechnologiesProps) {
  const [step, setStep] = useState(0);

  const [technologies, setTechnologies] = useState<string[]>(initialItems);
  const [newTech, setNewTech] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");


  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setTimeout(() => {

      if (!newTech || technologies.includes(newTech)) return;

      setTechnologies([...technologies, newTech]);
      setNewTech("");
    }, 750)
  }

  function handleDelete(tech: string) {
    setTechnologies(technologies.filter((techItem) => techItem !== tech));
  }

  function resetForm() {
    setTechnologies([]);
    setStep(0)
  }

  function canGoForward(): boolean {
    return technologies.length === 5 ? true : false;
  }

  function canFinish(): boolean {
    return technologies.length === 5 && (userName !== "" && (userEmail.length > 15)) ? true : false;
  }

  return (
    <>
      {step === 0 ? (
        <>
          <h1>Cadastro de Tecnologias</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nova tech"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
            />
            <button
              type="submit"
              disabled={!approvedLength(newTech, 10)}
              title={!approvedLength(newTech, 10)
                ?
                "A tecnologia tem mais de 10 letras"
                :
                ""}
            >
              Salvar
            </button>
          </form>
          <ul>
            {technologies ? technologies.map((tech, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 20
                }}>
                <p>{tech}</p>
                <button type="button" onClick={() => handleDelete(tech)}>Excluir</button>
              </li>
            )) : (
              <p>Não há tecnologias cadastradas</p>
            )}
          </ul>
        </>
      ) : (
        <>
          <h1>Para concluir</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button
              type="submit"
            >
              Salvar
            </button>
          </form>
          {userName !== "" && userEmail !== "" && (
            <>
              <h1>{userName}</h1>
              <span>{userEmail}</span>
            </>
          )}
        </>
      )}
      <div>
        <button type="button" onClick={() => setStep(0)} disabled={step === 0}>
          Voltar
        </button>
        <button type="button" onClick={() => setStep(1)} disabled={!canGoForward() || step === 1}>
          Avançar
        </button>
        <button disabled={!canFinish()} onClick={resetForm}>Finalizar</button>
      </div>
    </>
  );
}

export default Technologies;
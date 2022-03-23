/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Technologies from "../../components/Tecnologies";
import approvedLength from "../../utils/hasApprovedLength";

describe('Tecnologies Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<Technologies initialItems={["React", "Vue", "Angular"]} />)

    expect(getByText('React')).toBeTruthy()
    expect(getByText('Vue')).toBeTruthy()
    expect(getByText('Angular')).toBeTruthy()
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText } = render(<Technologies initialItems={["React", "Vue", "Angular"]} />)

    const inputElement = getByPlaceholderText('Nova tech');
    const addTechButton = getByText('Salvar');

    userEvent.type(inputElement, 'NextJS');
    userEvent.click(addTechButton);

    await waitFor(() => {
      expect(getByText('NextJS')).toBeTruthy()
    })
  });

  it("should not able the user to move to next step if tecnologies length is less then 5", async () => {
    const { getAllByText, getByText, getByPlaceholderText } = render(<Technologies initialItems={["React", "Vue", "Angular"]} />)

    const inputElement = getByPlaceholderText('Nova tech');
    const addTechButton = getByText('Salvar');


    userEvent.type(inputElement, 'NextJS');
    userEvent.click(addTechButton);


    await waitFor(() => {
      expect(getByText('NextJS')).toBeTruthy()
    })

    const buttonsArray = getAllByText('Excluir');
    expect(buttonsArray.length).toBeLessThan(5);

    const buttonForward = getByText('Avançar');
    expect(buttonForward).toBeDisabled();
  })

  it("should able the user to move to next step if tecnologies length is equal to 5", async () => {
    const { getAllByText, getByText, getByPlaceholderText } = render(<Technologies initialItems={["React", "Vue", "Angular", "Django"]} />)

    const inputElement = getByPlaceholderText('Nova tech');
    const addTechButton = getByText('Salvar');


    userEvent.type(inputElement, 'NextJS');
    userEvent.click(addTechButton);


    await waitFor(() => {
      expect(getByText('NextJS')).toBeTruthy()
    })

    const buttonsArray = getAllByText('Excluir');
    expect(buttonsArray.length).toBeGreaterThanOrEqual(5);

    const buttonForward = getByText('Avançar');
    expect(buttonForward).not.toBeDisabled();
  });

  it("should not be able to see user form before submitted 5 or more tecnologies", async () => {
    const { getAllByText, queryByText } = render(<Technologies initialItems={["React", "Vue", "Angular", "Django"]} />)

    const buttonsArray = getAllByText('Excluir');
    const h1Title = queryByText('Para concluir');


    expect(buttonsArray.length).toBeLessThan(5);
    expect(h1Title).not.toBeTruthy();
  })

  it("should be able to see user form with step is equal to one and has 5 or more tecnologies", async () => {
    const { getByText } = render(<Technologies initialItems={["React", "Vue", "Angular", "Django", "Node"]} />)

    const buttonStepForward = getByText('Avançar');
    expect(buttonStepForward).not.toBeDisabled();
    userEvent.click(buttonStepForward);

    const h1Title = getByText('Para concluir');
    expect(h1Title).toBeTruthy();
  })

  it("should be able to inputed username and useremail and useremail has to have length more than 15 letters", async () => {
    const { getByText, getByPlaceholderText } = render(<Technologies initialItems={["React", "Vue", "Angular", "Django", "Node"]} />)

    const buttonStepForward = getByText('Avançar');
    expect(buttonStepForward).not.toBeDisabled();
    userEvent.click(buttonStepForward);

    const h1Title = getByText('Para concluir');
    expect(h1Title).toBeTruthy();

    const inputNameElement = getByPlaceholderText('Your name');
    const inputEmailEmenet = getByPlaceholderText('Your email');

    fireEvent.change(inputNameElement, 'João Pedro');
    fireEvent.change(inputEmailEmenet, 'joao.pedro@sogo.com.br');


    expect(approvedLength('joao.pedro@sogo.com.br', 15, true)).toBe(true)
  })

  it("should be able to finish survey", () => {
    const { getByText, getByPlaceholderText } = render(<Technologies initialItems={["React", "Vue", "Angular", "Django", "Node"]} />)

    const buttonStepForward = getByText('Avançar');
    expect(buttonStepForward).not.toBeDisabled();
    userEvent.click(buttonStepForward);

    const h1Title = getByText('Para concluir');
    expect(h1Title).toBeTruthy();

    const inputNameElement = getByPlaceholderText('Your name');
    const inputEmailEmenet = getByPlaceholderText('Your email');

    userEvent.type(inputNameElement, 'João Pedro');
    userEvent.type(inputEmailEmenet, 'joao.pedro@sogo.com.br');

    expect(approvedLength('joao.pedro@sogo.com.br', 15, true)).toBe(true);
    const buttonFinished = getByText('Finalizar');
    expect(buttonFinished).not.toBeDisabled();
  })

  it('should be able to remove item from the list of techs', async () => {
    const { getAllByText, queryByText } = render(<Technologies initialItems={["React", "Vue", "Angular"]} />)

    const removeButtons = getAllByText('Excluir');

    userEvent.click(removeButtons[0])

    await waitFor(() => {
      expect(queryByText('React')).not.toBeTruthy()
    })
  })
})
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import { Formulario } from "./Formulario";

describe("o comportamento do Formulario.tsx", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Lucas Piva",
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // garantir que o input nao tenha um valor
    expect(input).toHaveValue("");
  });

  test("nomes duplicados nao podem ser adicionados na lista", () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Lucas Piva",
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // inserir o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: "Lucas Piva",
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // garantir mensagem de erro ao adioconar o mesmo valor duas vezes
    const mensagemDeErro = screen.getByRole("alert");
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos"
    );
  });

  test("a mensagem de erro deve sumir após os timers", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Lucas Piva",
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // inserir o mesmo valor no input
    fireEvent.change(input, {
      target: {
        value: "Lucas Piva",
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // garantir mensagem de erro ao adioconar o mesmo valor duas vezes
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    // espera N segundos
    act(() => {
      jest.runAllTimers();
    });
    // garantir que a mensgem de erro suma após N segundos
    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});

import { render } from "@testing-library/react";
import { Formulario } from "./Formulario";
import userEvent from "@testing-library/user-event";

describe('no formulario', () => {
    const mockAoSubmeter = jest.fn();

    test('se os campos estiverem vazios o botão deve estar desabilitado', () => {
        const { getByPlaceholderText, getByRole } = render(<Formulario aoSubmeter={mockAoSubmeter} />);

        const inputName = getByPlaceholderText('Nome do Filme');
        const inputAnoDeLancamento = getByPlaceholderText('Lançamento do Filme (ano)');

        const botaoAdicionar = getByRole('button');

        expect(inputName).toBeInTheDocument();
        expect(inputAnoDeLancamento).toBeInTheDocument();

        expect(botaoAdicionar).toBeDisabled();
    });

    test('se os inputs estiverem prenchidos o botão deve estar habilitado', async () => {
        const { getByPlaceholderText, getByRole } = render(<Formulario aoSubmeter={mockAoSubmeter} />);

        const inputNome = getByPlaceholderText('Nome do Filme');
        const inputAnoDeLancamento = getByPlaceholderText('Lançamento do Filme (ano)');
        const botaoAdicionar = getByRole('button');

        await userEvent.type(inputNome, 'Interestelar');
        await userEvent.type(inputAnoDeLancamento, '2014');

        expect(botaoAdicionar).toBeEnabled();

        await userEvent.click(botaoAdicionar);

        expect(mockAoSubmeter).toHaveBeenCalledWith({ nome: 'Interestelar', anoDeLancamento: '2014' });
    });
});



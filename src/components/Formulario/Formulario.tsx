import { useState } from "react";
import { Filme } from '../../App';

interface FormularioProps {
    aoSubmeter: (filme: Filme) => void;
}

export const Formulario = ({ aoSubmeter }: FormularioProps) => {
    const [filme, setFilme] = useState<Filme>({ nome: '', anoDeLancamento: '' });

    const podeAdicionar = filme.nome && filme.anoDeLancamento;

    function adicionarFilme(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        aoSubmeter(filme);
    }

    return (
        <form onSubmit={adicionarFilme}>
            <input
                type="text"
                placeholder="Nome do Filme"
                onChange={evento => setFilme({ ...filme, nome: evento.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Lançamento do Filme (ano)"
                onChange={evento => setFilme({ ...filme, anoDeLancamento: evento.target.value })}
                required
            />
            <button type="submit" disabled={!podeAdicionar}>
                Adicionar Filme
            </button>
        </form>
    );
};

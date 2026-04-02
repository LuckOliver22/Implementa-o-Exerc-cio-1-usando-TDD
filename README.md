# Exercício 1: Implementação com TDD (Livraria)
Este repositório contém a resolução do primeiro exercício prático da Aula 05, ministrada pelo Prof. Dr. Rodrigo Juliani. O foco da atividade é a aplicação da metodologia TDD (Test-Driven Development) no contexto de um sistema de livraria.

# Objetivo do Exercício:
Implementar um método capaz de devolver uma lista de livros, filtrada por critérios específicos fornecidos à função.Aplicar o ciclo do TDD: escrever os testes de unidade antes da implementação do código funcional.

# Estrutura de Arquivos:
livros.ts: Contém a lógica de negócio e a função de filtragem de livros.
livros.test.ts: Contém os casos de teste unitário que validam o comportamento da função.

# Proposta de Valor do MVP

O MVP da Livraria foca no ciclo mínimo de descoberta e compra: o usuário consegue buscar livros por título, autor ou categoria e adicionar ao carrinho para futura compra. Essa combinação entrega o core value do produto com o menor esforço possível, permitindo validar a hipótese de mercado antes de investir em funcionalidades complexas como recomendações ou fidelidade.

# Tabela em Markdown

| História                  | Esforço | Impacto | Quadrante            | MVP |
|---------------------------|---------|---------|----------------------|-----|
| Login                     | Médio   | Médio   | Tarefas Menores      | Não |
| Busca de Livros           | Baixo   | Alto    | **Quick Win**        | Sim |
| Filtros Avançados         | Médio   | Médio   | Tarefas Menores      | Não |
| Carrinho de Compras       | Baixo   | Alto    | **Quick Win**        | Sim |
| Sistema de Recomendações  | Alto    | Alto    | Projeto Estratégico  | Não |
| Programa de Fidelidade    | Alto    | Baixo   | Evitar/Adiar         | Não |

### Quick Wins (Prioridade Máxima)
- **Busca de Livros**: Core do produto, já implementado via `filtrarLivros()`
- **Carrinho de Compras**: Caminho crítico para conversão

### Definição do MVP
> O MVP entrega o ciclo mínimo **Descoberta → Compra** com Busca + Carrinho,
> validando a proposta de valor antes de investir em features complexas.

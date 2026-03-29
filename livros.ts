/**
 * livros.ts
 * Exercício 1 - TDD: Implementação criada APÓS os testes (fase GREEN)
 *
 * Processo TDD seguido:
 *   1. RED     → livros.test.ts escrito com 10 casos de teste
 *   2. GREEN   → Este arquivo implementa filtrarLivros para todos os testes passarem
 *   3. REFACTOR → Código limpo, tipado e comentado
 */

// ---------------------------------------------------------------------------
// Tipos / Interfaces
// ---------------------------------------------------------------------------

/** Representa um livro no catálogo da livraria. */
export interface Livro {
  id: number
  titulo: string
  autor: string
  categoria: string
  ano: number
  descricao: string
}

/**
 * Critérios de busca aceitos por `filtrarLivros`.
 * Todos os campos são opcionais; campos ausentes ou com string vazia são ignorados.
 * Quando múltiplos campos são fornecidos, a lógica é AND (todos devem corresponder).
 */
export interface CriteriosBusca {
  titulo?: string
  autor?: string
  categoria?: string
}

// ---------------------------------------------------------------------------
// Função principal
// ---------------------------------------------------------------------------

/**
 * Filtra uma lista de livros com base nos critérios fornecidos.
 *
 * Regras de filtragem:
 * - A busca é **case-insensitive** (maiúsculas e minúsculas são equivalentes).
 * - A busca é por **substring** (parcial), não exige correspondência completa.
 * - Campos não informados (undefined) ou com string vazia são **ignorados**.
 * - Múltiplos critérios são combinados com lógica **AND**.
 *
 * @param livros   - Lista completa de livros a filtrar.
 * @param criterios - Objeto com os campos de busca (título, autor, categoria).
 * @returns         Subconjunto de `livros` que satisfaz todos os critérios.
 *
 * @example
 * // Retorna todos os livros de Machado de Assis na categoria Ficção Brasileira
 * filtrarLivros(catalogo, { autor: 'Machado', categoria: 'Ficção Brasileira' })
 */
export function filtrarLivros(livros: Livro[], criterios: CriteriosBusca): Livro[] {
  return livros.filter((livro) => {
    // Normaliza os valores para comparação insensível a maiúsculas
    const normalizar = (valor: string) => valor.toLowerCase().trim()

    // Um critério é ativo apenas se for uma string não vazia após trim
    const criterioAtivo = (valor: string | undefined): valor is string =>
      typeof valor === 'string' && valor.trim().length > 0

    const correspondeAoCriterio = (
      campoDoBanco: string,
      criterioBusca: string | undefined
    ): boolean => {
      if (!criterioAtivo(criterioBusca)) return true // critério ignorado
      return normalizar(campoDoBanco).includes(normalizar(criterioBusca))
    }

    return (
      correspondeAoCriterio(livro.titulo, criterios.titulo) &&
      correspondeAoCriterio(livro.autor, criterios.autor) &&
      correspondeAoCriterio(livro.categoria, criterios.categoria)
    )
  })
}

// ---------------------------------------------------------------------------
// Dados de exemplo (usados na interface React de demonstração)
// ---------------------------------------------------------------------------

export const livrosExemplo: Livro[] = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Ficção Brasileira',
    ano: 1899,
    descricao:
      'Um dos maiores romances da literatura brasileira, narrado por Bentinho, que relata sua história de amor com Capitu e a suspeita de traição.',
  },
  {
    id: 2,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    categoria: 'Ficção Internacional',
    ano: 1988,
    descricao:
      'A jornada de Santiago, um jovem pastor andaluz, em busca de um tesouro e de seu destino pessoal.',
  },
  {
    id: 3,
    titulo: 'Sapiens: Uma Breve História da Humanidade',
    autor: 'Yuval Noah Harari',
    categoria: 'Não-ficção',
    ano: 2011,
    descricao:
      'Uma visão abrangente da história da humanidade, do surgimento dos primeiros humanos ao mundo moderno.',
  },
  {
    id: 4,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    categoria: 'Tecnologia',
    ano: 2008,
    descricao:
      'Um guia definitivo para escrever código limpo, legível e de fácil manutenção, com princípios para desenvolvedores.',
  },
  {
    id: 5,
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    categoria: 'Ficção Brasileira',
    ano: 1937,
    descricao:
      'A história de um grupo de meninos abandonados que vivem nas ruas de Salvador, Bahia, no início do século XX.',
  },
  {
    id: 6,
    titulo: '1984',
    autor: 'George Orwell',
    categoria: 'Ficção Científica',
    ano: 1949,
    descricao:
      'Uma distopia sobre um regime totalitário que controla pensamento e história, seguindo Winston Smith em sua resistência.',
  },
  {
    id: 7,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    categoria: 'Fantasia',
    ano: 1954,
    descricao:
      'A épica jornada de Frodo Bolseiro para destruir o Um Anel e salvar a Terra-Média do domínio de Sauron.',
  },
  {
    id: 8,
    titulo: 'Homo Deus',
    autor: 'Yuval Noah Harari',
    categoria: 'Não-ficção',
    ano: 2015,
    descricao:
      'Uma exploração do futuro da humanidade, examinando como a tecnologia e a ciência podem transformar a espécie humana.',
  },
  {
    id: 9,
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    categoria: 'Ficção Brasileira',
    ano: 1881,
    descricao:
      'Um defunto autor que narra sua própria história post-mortem, inaugurando o realismo brasileiro com ironia e pessimismo.',
  },
  {
    id: 10,
    titulo: 'O Código Da Vinci',
    autor: 'Dan Brown',
    categoria: 'Thriller',
    ano: 2003,
    descricao:
      'Robert Langdon é envolvido em enigmas que conectam Arte Renascentista, organizações secretas e segredos do Vaticano.',
  },
]

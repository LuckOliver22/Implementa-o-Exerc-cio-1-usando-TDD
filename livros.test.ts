/**
 * livros.test.ts
 * Exercício 1 - TDD: Testes criados ANTES da implementação (Red → Green → Refactor)
 *
 * Fluxo TDD:
 *   1. RED   → Escrever testes que falham (este arquivo)
 *   2. GREEN → Implementar o mínimo em livros.ts para os testes passarem
 *   3. REFACTOR → Melhorar o código mantendo os testes verdes
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { filtrarLivros, type Livro, type CriteriosBusca } from './livros'

// ---------------------------------------------------------------------------
// Fixture de dados compartilhada por todos os testes
// ---------------------------------------------------------------------------
const livrosFixture: Livro[] = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Ficção Brasileira',
    ano: 1899,
    descricao: 'Um dos maiores romances da literatura brasileira.',
  },
  {
    id: 2,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    categoria: 'Ficção Internacional',
    ano: 1988,
    descricao: 'A jornada de Santiago em busca de seu destino pessoal.',
  },
  {
    id: 3,
    titulo: 'Sapiens: Uma Breve História da Humanidade',
    autor: 'Yuval Noah Harari',
    categoria: 'Não-ficção',
    ano: 2011,
    descricao: 'Uma visão abrangente da história da humanidade.',
  },
  {
    id: 4,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    categoria: 'Tecnologia',
    ano: 2008,
    descricao: 'Guia para escrever código limpo e legível.',
  },
  {
    id: 5,
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    categoria: 'Ficção Brasileira',
    ano: 1937,
    descricao: 'Meninos abandonados nas ruas de Salvador.',
  },
  {
    id: 6,
    titulo: '1984',
    autor: 'George Orwell',
    categoria: 'Ficção Científica',
    ano: 1949,
    descricao: 'Distopia sobre um regime totalitário.',
  },
  {
    id: 7,
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    categoria: 'Ficção Brasileira',
    ano: 1881,
    descricao: 'Um defunto autor narra sua própria história.',
  },
  {
    id: 8,
    titulo: 'Homo Deus',
    autor: 'Yuval Noah Harari',
    categoria: 'Não-ficção',
    ano: 2015,
    descricao: 'Uma exploração do futuro da humanidade.',
  },
]

// ---------------------------------------------------------------------------
// Suite principal
// ---------------------------------------------------------------------------
describe('filtrarLivros', () => {
  let livros: Livro[]

  beforeEach(() => {
    // Garante que o fixture não é mutado entre os testes
    livros = [...livrosFixture]
  })

  // -------------------------------------------------------------------------
  // CASO 1: Nenhum critério → retorna todos os livros
  // -------------------------------------------------------------------------
  it('deve retornar todos os livros quando nenhum critério for fornecido', () => {
    const criterios: CriteriosBusca = {}
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(livros.length)
    expect(resultado).toEqual(livros)
  })

  // -------------------------------------------------------------------------
  // CASO 2: Filtrar por título exato
  // -------------------------------------------------------------------------
  it('deve filtrar por título exato', () => {
    const criterios: CriteriosBusca = { titulo: '1984' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(1)
    expect(resultado[0].titulo).toBe('1984')
  })

  // -------------------------------------------------------------------------
  // CASO 3: Filtrar por título parcial (substring)
  // -------------------------------------------------------------------------
  it('deve filtrar por título parcial', () => {
    const criterios: CriteriosBusca = { titulo: 'Dom' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(1)
  })

  // -------------------------------------------------------------------------
  // CASO 4: Filtrar por autor
  // -------------------------------------------------------------------------
  it('deve filtrar todos os livros de um mesmo autor', () => {
    const criterios: CriteriosBusca = { autor: 'Machado de Assis' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(2)
    expect(resultado.map((l) => l.id)).toEqual(expect.arrayContaining([1, 7]))
  })

  // -------------------------------------------------------------------------
  // CASO 5: Filtrar por categoria
  // -------------------------------------------------------------------------
  it('deve filtrar por categoria', () => {
    const criterios: CriteriosBusca = { categoria: 'Ficção Brasileira' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(3)
    expect(resultado.every((l) => l.categoria === 'Ficção Brasileira')).toBe(true)
  })

  // -------------------------------------------------------------------------
  // CASO 6: Busca deve ser case-insensitive
  // -------------------------------------------------------------------------
  it('deve realizar busca sem distinção de maiúsculas e minúsculas', () => {
    const tituloBusca = filtrarLivros(livros, { titulo: 'clean code' })
    const autorBusca = filtrarLivros(livros, { autor: 'MACHADO DE ASSIS' })
    const categoriaBusca = filtrarLivros(livros, { categoria: 'tecnologia' })

    expect(tituloBusca).toHaveLength(1)
    expect(tituloBusca[0].titulo).toBe('Clean Code')

    expect(autorBusca).toHaveLength(2)
    expect(categoriaBusca).toHaveLength(1)
  })

  // -------------------------------------------------------------------------
  // CASO 7: Múltiplos critérios combinados (lógica AND)
  // -------------------------------------------------------------------------
  it('deve combinar múltiplos critérios com lógica AND', () => {
    const criterios: CriteriosBusca = {
      autor: 'Harari',
      categoria: 'Não-ficção',
    }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(2)
    expect(resultado.map((l) => l.titulo)).toEqual(
      expect.arrayContaining(['Sapiens: Uma Breve História da Humanidade', 'Homo Deus'])
    )
  })

  // -------------------------------------------------------------------------
  // CASO 8: Nenhum resultado encontrado
  // -------------------------------------------------------------------------
  it('deve retornar lista vazia quando nenhum livro corresponder aos critérios', () => {
    const criterios: CriteriosBusca = { titulo: 'Livro Inexistente XYZ' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(0)
    expect(resultado).toEqual([])
  })

  // -------------------------------------------------------------------------
  // CASO 9: Critério com string vazia é ignorado (equivale a ausência do critério)
  // -------------------------------------------------------------------------
  it('deve ignorar critérios com string vazia', () => {
    const criterios: CriteriosBusca = { titulo: '', autor: '', categoria: '' }
    const resultado = filtrarLivros(livros, criterios)
    expect(resultado).toHaveLength(livros.length)
  })

  // -------------------------------------------------------------------------
  // CASO 10: Lista de entrada vazia retorna lista vazia
  // -------------------------------------------------------------------------
  it('deve retornar lista vazia quando a lista de entrada estiver vazia', () => {
    const criterios: CriteriosBusca = { titulo: 'Dom Casmurro' }
    const resultado = filtrarLivros([], criterios)
    expect(resultado).toHaveLength(0)
  })
})
